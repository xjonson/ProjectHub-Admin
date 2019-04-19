import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent, NzDropdownService, NzModalService } from 'ng-zorro-antd';
import { ProjectStepService } from 'src/app/service/project-step.service';
import { ResTpl } from 'src/app/models/ResTpl';
import { NzMessageService } from 'ng-zorro-antd';

interface firstNodeData {
  _id: string,
  type: 'web' | 'mp' | 'android',
  data: [NzTreeNode]
}
@Component({
  selector: 'app-project-step',
  templateUrl: './project-step.component.html',
  styleUrls: ['./project-step.component.scss']
})
export class ProjectStepComponent implements OnInit {
  // 节点列表
  nodes = {
    web: {} as firstNodeData,
    mp: {} as firstNodeData,
    android: {} as firstNodeData,
  };
  // 节点数据
  nodesData = {
    web: {
      expand: false,
    },
    mp: {
      expand: false,
    },
    android: {
      expand: false,
    }
  }
  // 当前选择的类型
  selectPS: firstNodeData;
  // 当前选择的节点
  selectNode: NzTreeNode;
  selectNodePath = [];
  // 右键选项
  dropdown: NzDropdownContextComponent;
  // 弹框
  modalVisible1 = false;
  modalVisible2 = false;
  modalVisible3 = false;
  // 兄弟节点
  siblingNode: Partial<NzTreeNode> = {
    title: '',
    isLeaf: true
  };
  // 子节点
  childNode: Partial<NzTreeNode> = {
    title: '',
    isLeaf: true
  };


  constructor(
    private projStepSrv: ProjectStepService,
    private nzDropdownService: NzDropdownService,
    private nzMessage: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.handleGetPS()
  }

  // 获取全部Project-Step
  handleGetPS(): void {
    this.projStepSrv.getProjectStep().subscribe(
      (resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          const data = resTpl.data
          console.log('data: ', data);
          this.nodes.web = data[0]
          this.nodes.mp = data[1]
          this.nodes.android = data[2]
        }
      }
    )
  }
  // 全部展开
  toggleExpand(str): void {
    this.nodesData[str].expand = !this.nodesData[str].expand
  }
  // 显示右键菜单
  showContextMenu(event, template: TemplateRef<void>, projectType): void {
    this.selectPS = this.nodes[projectType]
    this.selectNode = event.node
    this.dropdown = this.nzDropdownService.create(event.event, template);
    // 递归生成路径
    this.selectNodePath = []
    const recursion = (node) => {
      if (node.parentNode) {
        recursion(node.parentNode)
      }
      this.selectNodePath.push(node.title)
    }
    recursion(this.selectNode)
  }
  // 关闭右键菜单
  closeDropDown($event) {
    this.dropdown.close()
  }
  // -----------修改名称-----------
  handleChangeNodeName(): void {
    this.modalVisible1 = false;
    const selectNodeKey = this.selectNode.key
    // 递归
    const recursion = (list) => {
      list.forEach(item => {
        if (selectNodeKey === item.key) {
          console.log(item)
          item.title = this.selectNode.title
          return
        } else {
          if (item.children) {
            recursion(item.children)
          }
        }
      })
    }
    recursion(this.selectPS.data)
    this.handleUpdatePS()
  }
  cancelChangeNodeName(): void {
    this.modalVisible1 = false;
    this.selectNode = {} as NzTreeNode
  }

  // -----------添加兄弟节点-----------
  handleAddSiblingNode(): void {
    // console.log('this.selectPS: ', this.selectPS);
    // console.log('this.selectNode: ', this.selectNode);
    let siblings: NzTreeNode[];

    // 1. 生成:
    if (this.selectNode.parentNode) {
      // 如果有父节点
      siblings = this.selectNode.parentNode.children;
    } else {
      // 没有父节点，直接在selectPS添加
      siblings = this.selectPS.data
    }
    const siblingCount = siblings.length
    const newNodeKey_array = (siblings[siblingCount - 1].key + '').split('-');
    const newNodeLastKey = +newNodeKey_array[newNodeKey_array.length - 1] + 1;
    newNodeKey_array[newNodeKey_array.length - 1] = newNodeLastKey + '';
    this.siblingNode.key = newNodeKey_array.join('-');
    this.siblingNode.isLeaf = true
    // console.log('this.siblingNode: ', this.siblingNode);

    // 2. 插入 如果有父节点
    if (this.selectNode.parentNode) {
      // 从selectPS中递归查找匹配的selectNode
      const recursion = (nodes: NzTreeNode[], parentNode: NzTreeNode | null) => {
        nodes.forEach(node => {
          if (node.key === this.selectNode.key) {
            parentNode.children.push(<NzTreeNode>this.siblingNode)
          } else if (node.children) {
            recursion(node.children, node)
          }
        })
      }
      recursion(this.selectPS.data, null)
    }
    // 2. 插入 没有父节点
    else {
      // 直接在selectPS添加
      this.selectPS.data.push(this.siblingNode as NzTreeNode)
    }

    // 3. 插入完成 更新、清空
    this.handleUpdatePS()
  }
  cancelAddSiblingNode(): void {
    this.modalVisible2 = false;
    this.selectNode = {} as NzTreeNode
  }

  // -----------添加子节点-----------
  handleAddChildNode(): void {
    // console.log('this.selectPS: ', this.selectPS);
    // console.log('this.selectNode: ', this.selectNode);
    // console.log(this.childNode)
    // 1. 生成key
    if (!this.selectNode.children.length) {
      // 如果是叶子节点，直接生成key
      this.childNode.key = this.selectNode.key + '-0'
    } else {
      // 不是叶子节点，计算key在生成
      const siblings = this.selectNode.children
      const siblingCount = siblings.length
      const newNodeKey_array = (siblings[siblingCount - 1].key + '').split('-');
      const newNodeLastKey = +newNodeKey_array[newNodeKey_array.length - 1] + 1;
      newNodeKey_array[newNodeKey_array.length - 1] = newNodeLastKey + '';
      this.childNode.key = newNodeKey_array.join('-');
    }
    this.childNode.isLeaf = true
    // 2. 插入
    // 从selectPS中递归查找匹配的selectNode
    const recursion = (nodes: NzTreeNode[]) => {
      nodes.forEach(node => {
        if (node.key === this.selectNode.key) {
          node.isLeaf = false
          node.children.push(<NzTreeNode>this.childNode)
        } else if (node.children) {
          recursion(node.children)
        }
      })
    }
    recursion(this.selectPS.data)
    // 3. 保存
    this.handleUpdatePS()
  }
  cancelAddChildNode(): void {
    this.modalVisible3 = false;
    this.selectNode = {} as NzTreeNode
  }

  // -----------删除节点-----------
  alertDelNode(): void {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定要删除这项及其子项吗？',
      nzOnOk: () => {
        // console.log('this.selectPS: ', this.selectPS);
        // console.log('this.selectNode: ', this.selectNode);
        // 从selectPS中递归查找匹配的selectNode
        const recursion = (nodes: NzTreeNode[], parentNode) => {
          nodes.forEach((node, index) => {
            if (node.key === this.selectNode.key) {
              parentNode.children.splice(index, 1)
            } else if (node.children) {
              recursion(node.children, node)
            }
          })
        }
        recursion(this.selectPS.data, null)
        this.handleUpdatePS()
      }
    })
  }

  // -----------更新------------
  handleUpdatePS() {
    console.log(this.selectPS)
    this.projStepSrv.updateProjectStep(this.selectPS._id, this.selectPS.data).subscribe(
      (resTpl: ResTpl) => {
        if (resTpl.code === 0) {
          // 清空
          this.siblingNode = {}
          this.childNode = {}
          this.selectPS = <firstNodeData>{}
          this.selectNode = <NzTreeNode>{}
          this.selectNodePath = []
          // 关闭弹框
          this.modalVisible1 = false;
          this.modalVisible2 = false;
          this.modalVisible3 = false;
          // 
          this.nzMessage.create('success', `更新成功！`);
          this.handleGetPS()
        }
        console.log('resTpl: ', resTpl);
      }
    )
  }
}
