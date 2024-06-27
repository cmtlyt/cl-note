/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatVo, formatVos, SchemaData } from './schema';
import { BillDto, RegisterVo, LoginVo, UserInfoVo } from './types/handler';
import { getTokens, randomString, verifyToken } from './utils';
import { checkAuthentication } from './utils/middleware';
import { storage } from './utils/storage';

export interface Context<D = any, Q = any> {
  uri: URL;
  request: Request;
  data: D;
  query: Q;
  headers: Record<string, any>;
  $__call: (controller: string, ctx: Context) => Promise<any>;
}

export type HandlerFunc<R = any> = (ctx: Context) => Promise<R>;

async function getUserToken(user: SchemaData<'user'>) {
  return await getTokens({ id: user.id, groupIds: user.groupIds, permission: user.permission });
}

export const mockHandler = {
  post: {
    async register({ data }: Context<RegisterVo>) {
      const [user] = await storage.find('user', {
        matcher: (item) => item.name === data.name,
      });
      if (user) {
        return { __format: true, status: 400, data: { message: '用户名已存在' } };
      }
      if (data.password !== data.rePassword) return { __format: true, status: 400, data: { message: '密码不一致' } };
      try {
        const [user] = await storage.insert('user', data);
        return { success: true, ...(await getUserToken(user)) };
      } catch (e: any) {
        return { __format: true, status: 500, data: { message: e.message } };
      }
    },
    async login({ data }: Context<LoginVo>) {
      const [user] = await storage.find('user', {
        matcher: (item) => item.name === data.name && item.password === data.password,
      });
      if (!user) return { __format: true, status: 400, data: { message: '用户名或密码错误' } };
      return { success: true, ...(await getUserToken(user)) };
    },
    async checkCaptcha({ data }: Context) {
      const { captcha, captchaId } = data;
      if (!captcha) return { __format: true, status: 400, data: { message: '验证码不能为空' } };
      if (!captchaId) return { __format: true, status: 400, data: { message: '验证码ID不能为空' } };
      const sessionInfo = await storage.findById('session', captchaId);
      if (!sessionInfo) return { __format: true, status: 400, data: { message: '验证码不存在' } };
      if (sessionInfo.expireTime < new Date()) {
        await storage.remove('session', sessionInfo);
        return { __format: true, status: 400, data: { message: '验证码已过期' } };
      }
      const sessionData = JSON.parse(sessionInfo.info);
      if (sessionData.captcha !== captcha) return { __format: true, status: 400, data: { message: '验证码错误' } };
      await storage.remove('session', sessionInfo);
      return { success: true };
    },
    createBill: checkAuthentication<any, BillDto>(async ({ data, tokenData }) => {
      const [bill] = await storage.insert('bill', { ...data, date: new Date(data.date), userId: tokenData.id });
      return { success: true, bill: await formatVo('bill', bill, tokenData.permission) };
    }, true),
  },
  get: {
    async captcha({ query }: Context<any, { phone: string; captchaId: string }>) {
      const { phone, captchaId } = query;
      if (!phone) return { __format: true, status: 400, data: { message: '手机号不能为空' } };
      const captcha = randomString(6);
      const [sectionInfo] = await storage.update('session', {
        id: captchaId || randomString(16),
        info: JSON.stringify({ phone: phone, captcha }),
      });
      return { success: true, captchaId: sectionInfo.id, captcha };
    },
    async refresh({ query }: Context<any, { refreshToken: string }>) {
      if (!query.refreshToken) return { __format: true, status: 400, data: { message: 'refreshToken不能为空' } };
      const [verify, errorMessage, payload] = await verifyToken(query.refreshToken, 'refresh');
      if (!verify) return { __format: true, status: 401, data: { message: errorMessage } };
      const { isRefresh, data } = payload;
      if (!isRefresh) return { __format: true, status: 401, data: { message: 'refreshToken无效' } };
      return { success: true, ...(await getTokens(data)) };
    },
    getUserInfo: checkAuthentication<{ userInfo: UserInfoVo }>(async ({ tokenData }) => {
      const { id } = tokenData;
      const user = await storage.findById('user', id);
      if (!user) return { __format: true, status: 400, data: { message: '用户不存在' } };
      if (user.isDeleted) return { __format: true, status: 400, data: { message: '用户已删除' } };
      return { success: true, userInfo: await formatVo('user', user, user.permission) };
    }),
    consumeTypeList: checkAuthentication<any, any, { groupId: string }>(async ({ query, tokenData }) => {
      const { id, permission } = tokenData;
      const { groupId } = query;
      const consumeTypes = await storage.find('consumeType', {
        matcher: (item) => {
          const { ownerId, ownerGroupId } = item;
          return ownerId === id || ownerGroupId === groupId || (!ownerId && !ownerGroupId);
        },
      });
      return { success: true, consumeTypes: await formatVos('consumeType', consumeTypes, permission) };
    }, true),
    accountTypeList: checkAuthentication<any, any, { groupId: string }>(async ({ query, tokenData }) => {
      const { id, permission } = tokenData;
      const { groupId } = query;
      const accountTypes = await storage.find('accountType', {
        matcher: (item) => {
          const { ownerId, ownerGroupId } = item;
          return ownerId === id || ownerGroupId === groupId || (!ownerId && !ownerGroupId);
        },
      });
      return { success: true, accountTypes: await formatVos('accountType', accountTypes, permission) };
    }, true),
    bill: {
      list: checkAuthentication<any, any, { current: number; pageSize: number; groupId: string }>(
        async ({ query, tokenData }) => {
          const { id, permission } = tokenData;
          const { current, pageSize, groupId } = query;
          const bills = await storage.find('bill', {
            matcher: (item) => {
              const inGroup = item.groupIds.length > 0 && groupId ? item.groupIds.includes(groupId) : true;
              return item.userId === id && inGroup;
            },
            limit: pageSize,
            skip: (current - 1) * pageSize,
          });
          return { success: true, bills: await formatVos('bill', bills, permission) };
        },
        true,
      ),
    },
    billStatistics: checkAuthentication<{ billStatistics: { pay: number; income: number } }, any, { groupId: string }>(
      async ({ query, tokenData }) => {
        const { id } = tokenData;
        const bills = await storage.find('bill', {
          matcher: (item) => {
            const inGroup = item.groupIds.length > 0 && query.groupId ? item.groupIds.includes(query.groupId) : true;
            return item.userId === id && inGroup;
          },
        });
        const billStatistics = bills.reduce(
          (pre, cur) => {
            const { type, amount } = cur;
            if (type === 'pay') pre.pay -= amount;
            if (type === 'income') pre.income += amount;
            return pre;
          },
          { pay: 0, income: 0 },
        );
        return { success: true, billStatistics };
      },
      true,
    ),
  },
};
