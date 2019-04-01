import { Skill } from './Skill';
import { User } from './User';

// 项目
export interface Project {
  _id: string,
  demand_user: Partial<User>,
  dev_user: Partial<User>,
  avatar?: string,
  title: string,
  desc: string,
  skills: Skill[],
  create_time: string,
  cycle: number,
  price: number,
  status: Status,
  comments: Comment[]
  audit: Audit,
  applyList?: [],
}

/**
 * @description 项目评论
 */
export interface Comment {
  _id: string, 
  user: Partial<User>,
  create_time: string,
  content: string
}

/**
 * @description 审核状态
 */
export enum Audit {
  '未审核' = 0,
  '审核通过' = 1,
  '审核不通过' = 2,
}

/**
 * @description 项目状态
 * 0：已发布，未接受
 * 1：已发布，已接受，开发中未交付
 * 3：已发布，已接受，已开发已交付，验收中未结款
 * 4：已发布，已接受，已开发已交付，已验收已结款
 *  */
export enum Status {
  '新发布项目' = 0,
  '项目开发中' = 1,
  '项目验收中' = 2,
  '项目已结款' = 3
}
export enum StatusText {
  '项目已发布，还没有开发人员接单' = 0,
  '已有开发人员对接，项目开发中' = 1,
  '开发人员开发已完成，项目验收中' = 2,
  '项目已完成' = 3
}

/**
 * @description 项目状态的颜色
 */
export enum Color {
  'warn' = 0,
  'accent' = 1,
  'primary' = 2,
  'theme' = 3
}