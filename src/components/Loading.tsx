import { gc } from '@cmtlyt/base';
import styled from 'styled-components';

interface LoadingProps extends BaseCompProps<HTMLDivElement> {
  visible: boolean;
  delay?: number;
}

const LoadingWrapper = styled.div<{ $delay?: number }>`
  ${(props) => (props.$delay ? `transition-delay: ${props.$delay}ms` : '')}
`;

export function Loading(props: LoadingProps) {
  const { visible, delay, ...otherProps } = props;

  return (
    <LoadingWrapper
      $delay={delay}
      un-position="fixed"
      un-inset="0"
      un-bg="#0003"
      un-z="100"
      un-center="~"
      un-color="white"
      un-text="[3rem]"
      un-opacity="0"
      un-pointer-events="none"
      un-transition="opacity"
      className={gc({ 'opacity-100 pointer-events-auto transition-none': visible })}
      {...otherProps}
    >
      <div>Loading...</div>
    </LoadingWrapper>
  );
}
