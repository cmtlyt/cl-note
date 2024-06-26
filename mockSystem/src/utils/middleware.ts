/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, HandlerFunc } from '../handler';

import { checkPermission } from './permission';

import { verifyToken } from '.';

export function checkAuthentication<R = any, D = any, Q = any>(
  callback: (
    ctx: Context<D, Q> & { tokenData: any },
  ) => Promise<({ success: boolean } & R) | { __format?: boolean; status?: number; data: any }>,
  readFingerprint = false,
) {
  return async (props: any) => {
    const { headers } = props;
    const authorization = headers.authorization;
    const token = authorization?.split(' ')[1];
    if (!token) {
      if (!readFingerprint) return { __format: true, status: 401, data: { message: '未授权' } };
      const id = headers.fingerprint;
      if (!id) return { __format: true, status: 401, data: { message: '未授权' } };
      return callback(Object.assign(props, { tokenData: { id, permission: 0 } }));
    }
    const [verify, errorMessage, payload] = await verifyToken(token);
    if (!verify) return { __format: true, status: 401, data: { message: errorMessage } };
    if (payload.isRefresh) return { __format: true, status: 401, data: { message: 'refreshToken 无法认证' } };
    return callback(Object.assign(props, { tokenData: payload }));
  };
}

export function verifyUserPermission(callback: HandlerFunc, needPremission: number[] | number) {
  return checkAuthentication(async (props) => {
    const { tokenData } = props;
    const { premission: userPremission } = tokenData;
    if (checkPermission(userPremission, needPremission))
      return { __format: true, status: 403, data: { message: '无权限' } };
    return callback(props);
  });
}
