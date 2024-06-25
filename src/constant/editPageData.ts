import { RadioInfo } from '@/components/GridCircleRadioBox';
import type { OptionInfo } from '@/components/Select';

export const consumeList: RadioInfo[] = [
  { label: '餐饮', icon: 'canyin' },
  { label: '宠物', icon: 'chongwu' },
  { label: '服装', icon: 'fuzhuang' },
  { label: '购物', icon: 'gouwu' },
  { label: '还款', icon: 'huankuan' },
  { label: '居家', icon: 'jujia' },
  { label: '娱乐', icon: 'yule' },
  { label: '零食', icon: 'lingshi' },
  { label: '差旅', icon: 'chailv' },
  { label: '美容', icon: 'meirong' },
  { label: '社交', icon: 'shejiao' },
  { label: '饮料', icon: 'yinliao' },
].map((item, idx) => ({
  ...item,
  value: `${idx}`,
  icon: `consume-type/${item.icon}`,
}));

export interface OptionItem extends OptionInfo {
  icon: string;
  size?: string;
  type?: string;
}

export const payTypeOptions: OptionItem[] = [
  { label: '支付宝', value: 'zhifubao', icon: 'pay-type/zhifubao', size: '1.8rem' },
  { label: '微信', value: 'weixin', icon: 'pay-type/weixin' },
];

export const typeOptions = [
  { label: '支出', value: '支出' },
  { label: '收入', value: '收入' },
];
