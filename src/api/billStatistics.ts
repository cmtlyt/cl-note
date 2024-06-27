import { http } from './request';

import { GetBillStatistics } from '@/types/api';

export const getBillStatistics: GetBillStatistics = (query) => {
  return http.get('/billStatistics', { params: query });
};
