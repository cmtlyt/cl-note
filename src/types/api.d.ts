import { BillItem } from './handler';
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
export type GetBillList = (params: SplitPageParams) => Promise<Response<{
    bills: BillItem[];
}>>;
export {};
