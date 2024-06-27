export interface BillDto {
  type: string;
  date: string;
  amount: number;
  title: string;
  consumeTypeId: string;
  accountTypeId: string;
}
export interface AccountTypeVo {
  id: string;
  name: string;
  icon: string;
  createTime: string;
}
export interface BillVo {
  id: string;
  type: string;
  title: string;
  amount: number;
  date: string;
  createTime: string;
  consumeTypeInfo: ConsumeTypeVo;
  accountInfo: AccountTypeVo;
}
export interface ConsumeTypeVo {
  id: string;
  name: string;
  icon: string;
  createTime: string;
}
export interface RegisterVo {
  name: string;
  password: string;
  rePassword: string;
}
export interface LoginVo {
  name: string;
  password: string;
}
export interface UserInfoVo {
  name: string;
  nickName?: string;
  age?: number;
  sex?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createTime: string;
}
