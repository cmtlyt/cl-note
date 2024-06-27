import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import { billListAtom, updateListStorage } from './scoped/List/state';

import { AmountStatisticsBox } from '@/components/AmountStatisticsBox';
import { BillList } from '@/components/BillList';
import { getBillList } from '@/api/bill';

function AtomBillList() {
  const billList = useAtomValue(billListAtom);

  const bills = useMemo(() => {
    return billList.map((item) => {
      return {
        id: item.id,
        title: item.title,
        amount: item.amount,
        icon: item.consumeTypeInfo.icon,
        date: item.date,
      };
    });
  }, [billList]);

  return <BillList bills={bills} onClick={(id) => console.log(id)} />;
}

export default function List() {
  return (
    <div un-h="full" un-flex="~ col">
      <AmountStatisticsBox />
      <div un-overflow="y-auto">
        <AtomBillList />
      </div>
    </div>
  );
}

export async function loader() {
  getBillList({ current: 1, pageSize: 10 }).then((res) => {
    updateListStorage({ billList: res.data.bills });
  });
  return {};
}
