/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from '../library/jwt';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './constant';

export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

export function randomString(len = 16, pre = ''): string {
  const str = pre + Math.random().toString(36).slice(2);
  if (str.length >= len) return str.slice(0, len);
  return str + randomString(len - str.length, str);
}

type TokenType = 'access' | 'refresh';

export function getSecret(type: TokenType): string {
  if (type === 'access') return ACCESS_TOKEN_SECRET;
  if (type === 'refresh') return REFRESH_TOKEN_SECRET;
  throw new Error('不存在该类型令牌');
}

export async function verifyToken(token: string, type: TokenType = 'access') {
  const secret = getSecret(type);
  const result = await jwt.verify(token, secret);
  return result;
}

export async function signToken(
  payload: any,
  type: TokenType = 'access',
  options: Record<string, any> = {},
): Promise<string> {
  const secret = getSecret(type);
  return await jwt.sign(payload, secret, options);
}

export async function getAccessToken(payload: any): Promise<string> {
  const accessToken = await signToken(payload, 'access', { expiresIn: '1d' });
  return accessToken;
}

export async function getRefreshToken(payload: any): Promise<string> {
  const refreshToken = await signToken(Object.assign({}, { data: payload }, { isRefresh: true }), 'refresh', {
    expiresIn: '30d',
  });
  return refreshToken;
}

export async function getTokens(payload: any): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = await getAccessToken(payload);
  const refreshToken = await getRefreshToken(payload);
  return { accessToken, refreshToken };
}
