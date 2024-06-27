import { storage } from './storage';

import { randomId } from '.';

export const consumeList = [
  { name: '餐饮', icon: 'canyin' },
  { name: '宠物', icon: 'chongwu' },
  { name: '服装', icon: 'fuzhuang' },
  { name: '购物', icon: 'gouwu' },
  { name: '还款', icon: 'huankuan' },
  { name: '居家', icon: 'jujia' },
  { name: '娱乐', icon: 'yule' },
  { name: '零食', icon: 'lingshi' },
  { name: '差旅', icon: 'chailv' },
  { name: '美容', icon: 'meirong' },
  { name: '社交', icon: 'shejiao' },
  { name: '饮料', icon: 'yinliao' },
].map((item) => ({
  ...item,
  id: randomId(16),
  icon: `consume-type/${item.icon}`,
}));

async function initConsumeType() {
  const consumeTypes = await storage.find('consumeType', { all: true });
  if (consumeTypes.length) return;
  await storage.insert('consumeType', consumeList);
}

export const accountTypeOptions = [
  { name: '支付宝', value: 'zhifubao', icon: 'zhifubao' },
  { name: '微信', value: 'weixin', icon: 'weixin' },
].map((item) => {
  return {
    ...item,
    id: randomId(16),
    icon: `account-type/${item.icon}`,
  };
});

async function initAccountType() {
  const accountTypes = await storage.find('accountType', { all: true });
  if (accountTypes.length) return;
  await storage.insert('accountType', accountTypeOptions);
}

export async function initSchemaData() {
  await initConsumeType();
  await initAccountType();
}
