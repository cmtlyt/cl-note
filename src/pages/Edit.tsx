import { DatePicker } from 'antd';
import { ActionFunctionArgs, Form } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { PageTitle } from '@/components/PageTitle';
import { GridCircleRadioBox, RadioInfo } from '@/components/GridCircleRadioBox';
import { OptionInfo, Select } from '@/components/Select';
import { SvgIcon } from '@/components/SvgIcon';

const consumeList: RadioInfo[] = [
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

interface OptionItem extends OptionInfo {
  icon: string;
  size?: string;
}

const payType: OptionItem[] = [
  { label: '支付宝', value: 'zhifubao', icon: 'pay-type/zhifubao', size: '1.8rem' },
  { label: '微信', value: 'weixin', icon: 'pay-type/weixin' },
];

const SvgIcon2 = styled(SvgIcon)<{ $size?: string }>`
  ${(props) =>
    props.$size &&
    css`
      width: ${props.$size};
      height: ${props.$size};
    `}
`;

function OptionItem(props: OptionItem) {
  return (
    <div onClick={() => props.onClick?.()} un-flex="~ items-center">
      <SvgIcon2 name={props.icon} un-size="$big-icon-size" $size={props.size} />
      <span>{props.label}</span>
    </div>
  );
}

export default function Edit() {
  return (
    <>
      <PageTitle hasBack hasFixed title="编辑" />
      <Form method="post" un-p="x-[1rem]">
        <DatePicker name="date" className="w-full"></DatePicker>
        <input type="submit" value="提交" />
        <GridCircleRadioBox name="consumeType" radioList={consumeList} colNum={5} />
        <Select name="payType" options={payType} OptionComp={OptionItem}>
          {OptionItem}
        </Select>
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log(Array.from((await request.formData()).entries()));
  return { test: 'actionData' };
}
