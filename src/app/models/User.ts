import { Skill } from './Skill';

export interface User {
  id: string,
  email: string,
  password: string,
  avatar?: string,
  role: Role,
  profile: profile,
  skill: Skill[],
  msgs?: Msg[],
  create_time: string,
}

/**
 * @description 信息
 */
export interface Msg {
  id: string,
  project_id: string, // 项目id
  project_msg_id?: string, // 当前评论在原项目中的id
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


// 用户身份
export enum Role {
  admin = 1,
  demander = 2,
  developer = 3
}

// 用户个人信息
export interface profile {
  name: string,
  phone: string,
  avatar?: string,
  desc?: string
}