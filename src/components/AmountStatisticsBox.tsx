import { $ } from 'jotai-signal';
import { Select, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSetAtom } from 'jotai';

import { Amount } from './Amount';

import { inputAmountAtom, monthAtom, outputAmountAtom, yearAtom } from '@/storage/amountStatistics';

const StatisticsWrapper = styled.div`
  box-shadow: 0.2rem 0.2rem 1rem -0.8rem var(--shadow-color);
`;

function Label(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, ...otherProps } = props;

  return (
    <StatLabel>
      <span un-text="[1.4rem]" {...otherProps}>
        {children}
      </span>
    </StatLabel>
  );
}

function Filter() {
  const changeYear = useSetAtom(yearAtom);
  const changeMonth = useSetAtom(monthAtom);

  return (
    <Stat un-flex="~ col justify-between items-start">
      <Label>
        <label>
          <span>{$(yearAtom)}年</span>
          <Select
            onChange={(e) => {
              console.log(e.target.value);
              changeYear(Number(e.target.value));
            }}
          >
            <option value="2024">{new Date().getFullYear()}年</option>
            <option value="2023">2023年</option>
          </Select>
        </label>
      </Label>
      <StatNumber un-line-height="[3.6rem]" un-h="[3.6rem]">
        <Select placeholder="全年" value={$(monthAtom)} onChange={(e) => changeMonth(Number(e.target.value))}>
          <option value="1">01</option>
        </Select>
      </StatNumber>
    </Stat>
  );
}

export function AmountStatisticsBox() {
  return (
    <StatisticsWrapper un-flex="~ items-end" un-bg="white" un-p="x-[2rem] y-[2rem]" un-m="b-[1rem]">
      <Filter />

      <div un-h="[3rem]" un-w="[0.1rem]" un-bg="$detail-color" un-rounded="full" un-m="x-[2rem]" />

      <StatGroup un-flex="[2]">
        <Stat>
          <Label>本月支出</Label>
          <StatNumber un-h="[3.6rem]" un-flex="~ items-center" un-color="$danger-color" un-line-height="[3.6rem]">
            <Amount amount={$(outputAmountAtom)} showSign={false} un-font="bold" un-text="[3.6rem]" />
          </StatNumber>
        </Stat>

        <Stat>
          <Label>本月收入</Label>
          <StatNumber un-h="[3.6rem]" un-flex="~ items-center" un-color="$success-color" un-line-height="[3.6rem]">
            <Amount amount={$(inputAmountAtom)} showSign={false} un-font="bold" un-text="[3.6rem]" />
          </StatNumber>
        </Stat>
      </StatGroup>
    </StatisticsWrapper>
  );
}
