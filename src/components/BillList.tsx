import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { Amount } from './Amount';
import { Card } from './Card';
import { SvgIcon } from './SvgIcon';

const BillItemWrapper = Card;

interface BillInfo {
  id: string;
  title: string;
  amount: number;
  icon: string;
  date: string;
}

interface BillItemProps extends BaseCompProps<HTMLDivElement> {
  amountInfo: BillInfo;
}

interface BillItemHandlerProps {
  onClick?: (id: string) => void;
}

export function BillItem(props: BillItemProps & BillItemHandlerProps) {
  const {
    amountInfo: { id, title, amount, icon },
    onClick,
    ...otherProps
  } = props;

  return (
    <BillItemWrapper onClick={() => onClick?.(id)} un-flex="~ items-center" un-w="full" un-p="[1rem]" {...otherProps}>
      <SvgIcon name={icon} un-size="$big-icon-size" un-flex-shrink="0" un-m="r-[0.5rem]" />
      <span un-flex="1" un-line-clamp="1">
        {title}
      </span>
      <Amount amount={amount} un-m="l-[0.5rem]" />
    </BillItemWrapper>
  );
}

interface DataTitleProps {
  date: string;
  billList: BillInfo[];
}

function DataTitle(props: DataTitleProps) {
  const { date, billList } = props;

  const { shouru, zhichu } = useMemo(() => {
    const shouru = billList.reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc), 0);
    const zhichu = billList.reduce((acc, cur) => (cur.amount < 0 ? acc - cur.amount : acc), 0);
    return { shouru, zhichu };
  }, [billList]);

  return (
    <div un-flex="~ items-center justify-between" un-m="b-[1rem] t-[1rem]" un-text="[1.4rem]">
      <span>{date}</span>
      <div un-flex="~ items-center" un-color="$detail-text-color">
        {!!shouru && (
          <div un-m="x-[0.5rem]" un-flex="~ items-center">
            <span un-m="r-[0.5rem]">收入:</span>
            <Amount amount={shouru} showSign={false} />
          </div>
        )}
        {!!zhichu && (
          <div un-m="x-[0.5rem]" un-flex="~ items-center">
            <span un-m="r-[0.5rem]">支出:</span>
            <Amount amount={zhichu} showSign={false} />
          </div>
        )}
      </div>
    </div>
  );
}

interface BillListProps extends BaseCompProps<HTMLDivElement> {
  bills: BillInfo[];
}

interface BillListHandlerProps extends BillItemHandlerProps {}

export function BillList(props: BillListProps & BillListHandlerProps) {
  const { bills, onClick, ...otherProps } = props;

  const billMapByDate = useMemo(() => {
    return bills.reduce(
      (acc, cur) => {
        const date = dayjs(cur.date);
        const dateStr = date.format('MM月DD日 dddd').toString();
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(cur);
        return acc;
      },
      {} as Record<string, BillInfo[]>,
    );
  }, [bills]);

  return (
    <div un-flex="~ col" un-w="full" un-p="x-[1rem]" {...otherProps}>
      {Object.entries(billMapByDate).map(([date, amountList]) => {
        return (
          <Fragment key={date}>
            <DataTitle date={date} billList={amountList} />
            {amountList.map((item) => (
              <BillItem key={item.id} amountInfo={item} onClick={onClick} un-m="b-[1rem]" />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
