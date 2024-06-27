import { http } from './request';

import { GetAccountTypeList } from '@/types/api';

export const getAccountTypeList: GetAccountTypeList = () => {
  return http.get('/accountTypeList');
};
