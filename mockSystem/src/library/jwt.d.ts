/* eslint-disable @typescript-eslint/no-explicit-any */
export function verify(token: string, secret: string): Promise<any>;

export function sign(payload: any, secret: string, options?: any): Promise<string>;
