import { User } from './User';

/**
 * @description 信息
 */
export interface Msg {
  _id: string,
  project_id: string, // 项目id
  project_comment_id?: string, // 当前评论在原项目中的id
  from_user: Partial<User>,
  content: string,
  checked: boolean,
  create_time: string,
  isAction: boolean, // 是否是可操作信息
  action: Action,
}

/**
 * @description 操作
 */
export enum Action {
  '管理员审核消息' = 0, // 比如项目审核不通过
  '开发者申请接单' = 1, // 开发者申请接单
  '开发者申请验收' = 2, // 开发者申请验收
  '开发者申请结款' = 3, // 开发者申请结款
}