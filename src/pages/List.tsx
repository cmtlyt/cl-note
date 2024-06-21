import { NoteList } from '@/components/NoteList';
import { AmountStatisticsBox } from '@/components/AmountStatisticsBox';
import { AmountList } from '@/components/AmountList';
import { Select } from '@/components/Select';

export default function List() {
  return (
    <div un-h="full" un-flex="~ col">
      <AmountStatisticsBox />
      <Select
        placeholder={{ label: '请选择', value: '请选择' }}
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
        ]}
      />
      <div un-overflow="y-auto">
        <AmountList
          amounts={[
            {
              id: '1',
              amount: 123,
              date: '2023-12-25',
              icon: 'user',
              title: '123123123123123123123123123123123123123123123123',
            },
            {
              id: '2',
              amount: 123123,
              date: '2023-12-25',
              icon: 'react',
              title: '123123',
            },
            {
              id: '3',
              amount: -123,
              date: '2023-12-25',
              icon: 'react',
              title: '123123',
            },
            {
              id: '4',
              amount: -123123,
              date: '2023-12-25',
              icon: 'react',
              title: '123123',
            },
            {
              id: '5',
              amount: 123123.123,
              date: '2023-12-25',
              icon: 'react',
              title: '123123',
            },
            {
              id: '6',
              amount: -123123.123,
              date: '2024-6-20',
              icon: 'react',
              title: '123123',
            },
          ]}
          onClick={(id) => console.log(id)}
        />
        <NoteList
          notes={[
            {
              id: '1',
              title: '123123123123123123123123123123123123123123123123',
              content:
                '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
              date: '123',
              icon: 'react',
            },
            {
              id: '2',
              title: '123123123123123123123123123123123123123123123123',
              content:
                '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
              date: '123',
              icon: 'user',
            },
            {
              id: '3',
              title: '123123123123123123123123123123123123123123123123',
              date: '2023-12-25',
              icon: 'user',
            },
            {
              id: '4',
              title: '123123123123123123123123123123123123123123123123',
              date: '2023-12-25',
            },
            {
              id: '5',
              title: '12312312',
              content:
                '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
              date: '123',
              icon: 'react',
            },
          ]}
          onClick={(id) => {
            console.log('click', id);
          }}
        />
      </div>
    </div>
  );
}
