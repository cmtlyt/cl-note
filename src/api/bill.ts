import { http } from './request';

import { GetBillList } from '@/types/api';

export const getBillList: GetBillList = (query) => {
  return http.get('/bill/list', { params: query });
};
