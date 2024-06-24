import dayjs from 'dayjs';
import { Fragment } from 'react/jsx-runtime';

import { Amount } from './Amount';
import { Card } from './Card';
import { SvgIcon } from './SvgIcon';

const AmountItemWrapper = Card;

interface AmountInfo {
  id: string;
  title: string;
  amount: number;
  icon: string;
  date: string;
}

interface AmountItemProps extends BaseCompProps<HTMLDivElement> {
  amountInfo: AmountInfo;
}

interface AmountItemHandlerProps {
  onClick?: (id: string) => void;
}

export function AmountItem(props: AmountItemProps & AmountItemHandlerProps) {
  const {
    amountInfo: { id, title, amount, icon },
    onClick,
    ...otherProps
  } = props;

  return (
    <AmountItemWrapper onClick={() => onClick?.(id)} un-flex="~ items-center" un-w="full" un-p="[1rem]" {...otherProps}>
      <SvgIcon name={icon} un-size="$big-icon-size" un-flex-shrink="0" un-m="r-[0.5rem]" />
      <span un-flex="1" un-line-clamp="1">
        {title}
      </span>
      <Amount amount={amount} un-m="l-[0.5rem]" />
    </AmountItemWrapper>
  );
}

interface DateTitleProps {
  date: string;
  amountList: AmountInfo[];
}

function DateTitle(props: DateTitleProps) {
  const { date, amountList } = props;

  const shouru = amountList.reduce((acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc), 0);
  const zhichu = amountList.reduce((acc, cur) => (cur.amount < 0 ? acc - cur.amount : acc), 0);

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

interface AmountListProps extends BaseCompProps<HTMLDivElement> {
  amounts: AmountInfo[];
}

interface AmountListHandlerProps extends AmountItemHandlerProps {}

export function AmountList(props: AmountListProps & AmountListHandlerProps) {
  const { amounts, onClick, ...otherProps } = props;

  const amountMapByDate = amounts.reduce(
    (acc, cur) => {
      const date = dayjs(cur.date);
      const dateStr = date.format('MM月DD日 dddd').toString();
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(cur);
      return acc;
    },
    {} as Record<string, AmountInfo[]>,
  );

  return (
    <div un-flex="~ col" un-w="full" un-p="x-[1rem]" {...otherProps}>
      {Object.entries(amountMapByDate).map(([date, amountList]) => {
        return (
          <Fragment key={date}>
            <DateTitle date={date} amountList={amountList} />
            {amountList.map((item) => (
              <AmountItem key={item.id} amountInfo={item} onClick={onClick} un-m="b-[1rem]" />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
