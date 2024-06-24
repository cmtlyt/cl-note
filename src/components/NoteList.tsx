import { SvgIcon } from './SvgIcon';
import { Tag } from './Tag';
import { Card } from './Card';

interface NoteInfo {
  title: string;
  content?: string;
  date: string;
  id: string;
  icon?: string;
}

interface NoteItemProps extends BaseCompProps<HTMLDivElement> {
  note: NoteInfo;
}

interface NoteItemHandlerProps {
  onClick?: (id: string) => void;
}

const NoteItemWrapper = Card;

export function NoteItem(props: NoteItemProps & NoteItemHandlerProps) {
  const { note, onClick, ...otherProps } = props;

  return (
    <NoteItemWrapper un-flex="~ col" un-p="[1rem]" onClick={() => onClick?.(note.id)} {...otherProps}>
      <div un-flex="~ items-center" un-w="full">
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

interface NoteListProps extends BaseCompProps<HTMLDivElement> {
  notes: NoteInfo[];
}

interface NoteListHandlerProps extends NoteItemHandlerProps {}

export function NoteList(props: NoteListProps & NoteListHandlerProps) {
  const { notes, onClick, ...otherProps } = props;
  return (
    <div un-w="full" un-flex="~ col" un-p="x-[1rem]" {...otherProps}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} un-m="b-[1rem]" onClick={onClick} />
      ))}
    </div>
  );
}
