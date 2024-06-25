import { gc } from '@cmtlyt/base';
import styled from 'styled-components';

import { Fullback } from './Fullback';
import { Card } from './Card';
import { UnwrapSlot } from './UnwrapSlot';

import { useSlots } from '@/hooks/useSlots';

interface FieldWrapperProps extends BaseCompProps<HTMLDivElement> {
  label?: string;
  required?: boolean;
  layout?: 'horizontal' | 'vertical';
  children?: ReactNode;
}

const Wrapper = styled(Card)``;

const layoutMap = {
  horizontal: '',
  vertical: 'flex-col',
};

export function FieldWrapper(props: FieldWrapperProps) {
  const { label, required = false, layout = 'horizontal', children, className = '', ...otherProps } = props;
  const slots = useSlots(children, ['label', 'default']);

  return (
    <Wrapper
      un-flex="~ justify-between items-center"
      un-h="[3em]"
      un-m="y-[1rem]"
      un-p="x-[1rem] y-[0.5em]"
      un-text="[1.4rem]"
      className={gc([layoutMap[layout], className])}
      {...otherProps}
    >
      <div
        un-flex="~ [3] items-center"
        un-m="r-[1em]"
        un-line-height="none"
        className={gc({ "after:content-['*'] after:text-red-500 after:m-l-[0.2em]": required })}
      >
        <Fullback>
          {slots.label}
          <UnwrapSlot slot="fullback">{label}</UnwrapSlot>
        </Fullback>
      </div>
      <div un-flex="[7]">{slots.default}</div>
    </Wrapper>
  );
}
