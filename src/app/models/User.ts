import { Skill } from './Skill';

export interface User {
  id: string,
  email: string,
  password: string,
  avatar?: string,
  role: Role,
  profile: profile,
  skill: Skill[],
  msgs?: Msg[]
}

/**
 * @description 信息
 */
export interface Msg {
  id: string,
  project_id: string, // 项目id
  project_msg_id: string, // 当前评论在原项目中的id
  from_user: Partial<User>,
  content: string,
  checked: boolean,
  create_time: string,
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