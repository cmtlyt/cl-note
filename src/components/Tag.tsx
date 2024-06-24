import styled from 'styled-components';

interface TagProps extends BaseCompProps<HTMLDivElement> {}

const TagWrapper = styled.div`
  box-shadow: 0 0 0 0.1rem #e5e5e5;
`;

export function Tag(props: TagProps) {
  return <TagWrapper un-p="x-[0.75em]" un-text="[0.8em]" un-rounded="full" {...props} />;
}
