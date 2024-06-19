import { NoteList } from '@/components/NoteList';
import { AmountStatisticsBox } from '@/components/AmountStatisticsBox';

export default function List() {
  return (
    <div>
      <AmountStatisticsBox />
      <NoteList
        notes={[
          {
            id: '1',
            title: '123123123123123123123123123123123123123123123123',
            content: '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
            date: '123',
            icon: 'react',
          },
          {
            id: '2',
            title: '123123123123123123123123123123123123123123123123',
            content: '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
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
            content: '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
            date: '123',
            icon: 'react',
          },
        ]}
        onClick={(id) => {
          console.log('click', id);
        }}
      />
    </div>
  );
}
