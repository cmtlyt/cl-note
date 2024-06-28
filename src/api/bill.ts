import { http } from './request';

import { CreateBill, GetBillList } from '@/types/api';

export const getBillList: GetBillList = (query) => {
  return http.get('/bill/list', { params: query });
};

export const createBill: CreateBill = (data) => {
  return http.post('/createBill', data);
};
