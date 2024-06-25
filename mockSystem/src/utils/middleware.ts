/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, HandlerFunc } from '../handler';

import { checkPermission } from './permission';

import { verifyToken } from '.';

export function checkAuthentication<D = any>(
  callback: (ctx: Context<D> & { tokenData: any }) => Promise<any>,
  readFingerprint = false,
) {
  return async (props: any) => {
    const { headers } = props;
    const authorization = headers.authorization;
    if (!authorization?.startsWith('Bearer')) {
      if (!readFingerprint) return { __format: true, status: 401, data: { message: '未授权' } };
      const id = headers.fingerprint;
      if (!id) return { __format: true, status: 401, data: { message: '未授权' } };
      return callback(Object.assign(props, { id, permission: 0 }));
    }
    const token = authorization.split(' ')[1];
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
