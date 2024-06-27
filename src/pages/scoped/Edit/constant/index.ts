import type { OptionInfo } from '@/components/Select';

export interface OptionItem extends OptionInfo {
  icon: string;
  size?: string;
  type?: string;
}

export const typeOptions = [
  { label: '支出', value: 'pay' },
  { label: '收入', value: 'income' },
];
