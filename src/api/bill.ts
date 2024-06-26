import { http } from './request';

interface GetBillListQuery {
  current: number;
  pageSize: number;
}

export function getBillList(query: GetBillListQuery) {
  return http.get('/bill/list', { params: query });
}
