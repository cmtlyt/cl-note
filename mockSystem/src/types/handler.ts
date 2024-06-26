/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BillItem {
  type: string;
  date: Date;
  amount: number;
  title: string;
}

export interface BillListResponse {
  bills: BillItem[];
}

export interface Context<D = any, Q = any> {
  uri: URL;
  request: Request;
  data: D;
  query: Q;
  headers: Record<string, any>;
  $__call: (controller: string, ctx: Context) => Promise<any>;
}

export type HandlerFunc<R = any> = (ctx: Context) => Promise<R>;
