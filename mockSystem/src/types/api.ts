/* eslint-disable @typescript-eslint/no-explicit-any */
import { BillItem, BillListResponse } from './handler';

interface Response<D> {
  data: {
    success: boolean;
  } & D;
  time: number;
}

interface SplitPageParams {
  current: number;
  pageSize: number;
}

export type GetBillList = (params: SplitPageParams) => Promise<Response<BillListResponse>>;

export type CreateBill = (params: BillItem) => Promise<Response<{ bill: BillItem }>>;
