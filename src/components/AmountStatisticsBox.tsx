import { $ } from 'jotai-signal';
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import styled from 'styled-components';

import { SvgIcon } from './SvgIcon';

import { outputAmountAtom } from '@/storage/amountStatistics';

const StatWrapper = styled(StatGroup)`
  box-shadow: 0.2rem 0.2rem 1rem -0.8rem var(--shadow-color);
`;

export function AmountStatisticsBox() {
  return (
    <StatWrapper un-bg="white" un-p="x-[2rem] y-[1rem]" un-m="b-[1rem]">
      <Stat>
        <StatLabel>
          <span un-text="[1.8rem]">本月支出</span>
        </StatLabel>
        <StatNumber un-flex="~ items-center" un-color="$danger-color">
          <SvgIcon name="zhichu" un-size="$big-icon-size" un-m="r-[0.5em] t-[0.5em]" />
          <span un-font="bold" un-text="[3.2rem]">
            {$(outputAmountAtom)}
          </span>
        </StatNumber>
      </Stat>

      <Stat>
        <StatLabel>
          <span un-text="[1.8rem]">本月收入</span>
        </StatLabel>
        <StatNumber un-flex="~ items-center" un-color="$success-color">
          <SvgIcon name="shouru" un-size="$big-icon-size" un-m="r-[0.5em] t-[0.5em]" />
          <span un-font="bold" un-text="[3.2rem]">
            {$(outputAmountAtom)}
          </span>
        </StatNumber>
      </Stat>
    </StatWrapper>
  );
}
