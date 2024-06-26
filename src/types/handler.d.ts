export interface BillItem {
  type: string;
  date: Date;
  amount: number;
  title: string;
}
export interface BillListResponse {
  bills: BillItem[];
}
