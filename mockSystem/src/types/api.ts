import { AccountTypeVo, BillDto, BillVo, ConsumeTypeVo, LoginVo, RegisterVo, UserInfoVo } from './handler';

type Response<D> = Promise<{
  data: {
    success: boolean;
  } & D;
  time: number;
}>;

interface SplitPageParams {
  current: number;
  pageSize: number;
}

interface GroupParmas {
  groupId?: string;
}

export type GetBillList = (params: SplitPageParams) => Response<{ bills: BillVo[] }>;

export type CreateBill = (params: BillDto) => Response<{ bill: BillVo }>;

export type GetConsumeTypeList = (params?: GroupParmas) => Response<{ consumeTypes: ConsumeTypeVo[] }>;

export type GetAccountTypeList = (params?: GroupParmas) => Response<{ accountTypes: AccountTypeVo[] }>;

export type Register = (params: RegisterVo) => Response<{ accessToken: string; refreshToken: string }>;

export type Login = (params: LoginVo) => Response<{ accessToken: string; refreshToken: string }>;

export type CheckCaptcha = (params: { captcha: string; captchaId: string }) => Response<{ success: boolean }>;

export type GetCaptcha = (params: {
  phone: string;
  captchaId?: string;
}) => Response<{ captchaId: string; captcha: string }>;

export type Refresh = () => Response<{ accessToken: string; refreshToken: string }>;

export type GetUserInfo = () => Response<{ userInfo: UserInfoVo }>;

export type GetBillStatistics = (params?: GroupParmas) => Response<{ billStatistics: { pay: number; income: number } }>;
