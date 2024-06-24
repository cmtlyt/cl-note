import { $ } from 'jotai-signal';
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSetAtom } from 'jotai';

import { Amount } from './Amount';
import { Select } from './Select';
import { SvgIcon } from './SvgIcon';

import { inputAmountAtom, monthAtom, outputAmountAtom, yearAtom } from '@/storage/amountStatistics';

const StatisticsWrapper = styled.div`
  box-shadow: 0.2rem 0.2rem 1rem -0.8rem var(--shadow-color);
`;

function Label(props: BaseCompProps<HTMLDivElement>) {
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
        <Select
          onChange={(value) => changeYear(Number(value))}
          placeholder={{ label: '2024年', value: '2024' }}
          options={[
            { label: '2023年', value: '2023' },
            { label: '2022年', value: '2022' },
          ]}
        />
      </Label>
      <StatNumber un-line-height="[3.6rem]" un-h="[3.6rem]" un-w="full">
        <Select
          un-flex="~ items-center justify-between"
          un-text="[2.4rem]"
          un-w="[7rem]"
          un-whitespace="nowrap"
          placeholder={{ label: '全年', value: '0' }}
          options={[
            { label: '1月', value: '1' },
            { label: '2月', value: '2' },
            { label: '3月', value: '3' },
            { label: '4月', value: '4' },
            { label: '5月', value: '5' },
            { label: '6月', value: '6' },
            { label: '7月', value: '7' },
            { label: '8月', value: '8' },
            { label: '9月', value: '9' },
            { label: '10月', value: '10' },
            { label: '11月', value: '11' },
            { label: '12月', value: '12' },
          ]}
          onChange={(value) => changeMonth(Number(value))}
        >
          <SvgIcon name="arrow-bottom" un-size="[1.2rem]" un-color="$detail-text-color" />
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

      <StatGroup un-flex="[3]">
        <Stat>
          <Label>本月支出</Label>
          <StatNumber un-h="[3.6rem]" un-flex="~ items-center" un-color="$danger-color" un-line-height="[3.6rem]">
            <Amount amount={$(outputAmountAtom)} showSign={false} un-font="bold" un-text="[2.8rem]" />
          </StatNumber>
        </Stat>

        <Stat>
          <Label>本月收入</Label>
          <StatNumber un-h="[3.6rem]" un-flex="~ items-center" un-color="$success-color" un-line-height="[3.6rem]">
            <Amount amount={$(inputAmountAtom)} showSign={false} un-font="bold" un-text="[2.8rem]" />
          </StatNumber>
        </Stat>
      </StatGroup>
    </StatisticsWrapper>
  );
}
