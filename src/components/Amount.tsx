import { formatAmount } from '@/utils';

interface AmountProps extends BaseCompProps<HTMLDivElement> {
  amount: number;
  showSign?: boolean;
  decimal?: number;
}

export function Amount(props: AmountProps) {
  const { amount, showSign = true, decimal = 2, ...otherProps } = props;

  const sign = amount < 0 ? '-' : '+';

  return (
    <div un-flex="~ items-center" un-flex-shrink="0" {...otherProps}>
      {showSign && <span un-m="r-[0.25rem]">{sign}</span>}
      <span>{formatAmount(Math.abs(amount), decimal)}</span>
    </div>
  );
}
