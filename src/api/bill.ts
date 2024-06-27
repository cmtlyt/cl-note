import { http } from './request';

import { updateStatistics } from '@/components/AmountStatisticsBox';
import { CreateBill, GetBillList } from '@/types/api';

export const getBillList: GetBillList = (query) => {
  return http.get('/bill/list', { params: query });
};

export const createBill = (async (data) => {
  return http.post('/createBill', data).then((res) => {
    updateStatistics();
    return res;
  });
}) as CreateBill;
