import styled from 'styled-components';

import { SvgIcon } from './SvgIcon';
import { Tag } from './Tag';

interface NoteInfo {
  title: string;
  content?: string;
  date: string;
  id: string;
  icon?: string;
}

interface NoteItemProps extends React.HTMLAttributes<HTMLDivElement> {
  note: NoteInfo;
}

interface NoteItemHandlerProps {
  onClick?: (id: string) => void;
}

const NoteItemWrapper = styled.div`
  box-shadow: 0.2rem 0.2rem 1rem -0.8rem var(--shadow-color);
`;

export function NoteItem(props: NoteItemProps & NoteItemHandlerProps) {
  const { note, onClick, ...otherProps } = props;

  return (
    <NoteItemWrapper
      un-flex="~ col"
      un-bg="white"
      un-p="[1rem]"
      un-rounded="[1rem]"
      onClick={() => onClick?.(note.id)}
      {...otherProps}
    >
      <div un-flex="~ items-center" un-w="full" un-overflow="hidden">
        {note.icon && <SvgIcon name={note.icon} un-size="$big-icon-size" un-flex-shrink="0" un-m="r-[0.5em]" />}
        <div un-flex="1" un-line-clamp="1" un-m="r-[0.5em]" un-text="[2rem]" un-line-height="none">
          {note.title}
        </div>
        <Tag un-color="$detail-text-color" un-flex-shrink="0">
          {note.date}
        </Tag>
      </div>
      {note.content && (
        <div un-line-clamp="2" un-text="[1.4rem]" un-color="$detail-text-color" un-line-height="none" un-m="t-[0.5em]">
          {note.content}
        </div>
      )}
    </NoteItemWrapper>
  );
}

interface NoteListProps extends React.HTMLAttributes<HTMLDivElement> {
  notes: NoteInfo[];
}

export function NoteList(props: NoteListProps & NoteItemHandlerProps) {
  const { notes, onClick, ...otherProps } = props;
  return (
    <div un-w="full" un-flex="~ col" un-p="x-[1rem]" {...otherProps}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} un-m="b-[1rem]" onClick={onClick} />
      ))}
    </div>
  );
}
