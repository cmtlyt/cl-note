import { useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import { Card } from './Card';
import { Fullback } from './Fullback';

import { useSlots } from '@/hooks/useSlots';

export interface OptionInfo {
  label: string;
  value: string;
  onClick?: () => void;
}

interface OptionProps extends OptionInfo, Omit<BaseCompProps<HTMLDivElement>, 'onClick'> {}

interface OptionHandlerProps {
  onClick?: (value: string) => void;
}

function Option(props: OptionProps & OptionHandlerProps) {
  const { label, value, onClick, ...otherProps } = props;
  return (
    <div onClick={() => onClick?.(value)} un-line-height="none" un-w="full" {...otherProps}>
      {label}
    </div>
  );
}

interface SelectProps extends Omit<BaseCompProps<HTMLDivElement>, 'children'> {
  name?: string;
  placeholder?: OptionProps;
  options?: OptionProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OptionComp?: React.FC<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ReactNode | React.FC<any>;
}

interface SelectHandlerProps {
  onChange?: (value: string) => void;
}

const OptionWrapper = styled(Card)<{ $count: number }>`
  background-color: #fff8;
  ${(props) => css`
    --count: ${props.$count};
  `}
`;

export function Select(props: SelectProps & SelectHandlerProps) {
  const { name, placeholder, options: _tempOptions, children, OptionComp, onChange, ...otherProps } = props;

  const slots = useSlots(children as ReactNode, ['icon']);

  const options = useMemo(() => {
    return [...(placeholder ? [placeholder] : []), ...(_tempOptions || [])];
  }, [_tempOptions, placeholder]);

  const [curOpt, setCurOpt] = useState(
    options[0] || {
      value: '',
      label: '',
    },
  );

  const changeOpt = useCallback(
    (option: OptionProps) => {
      setCurOpt(option);
      onChange?.(option.value);
    },
    [onChange],
  );

  return (
    <div un-relative="~" className="group">
      <label>
        <Fullback>
          {/* @ts-expect-error is FC */}
          {slots.default && slots.default(curOpt)}
          <div {...otherProps} slot="fullback">
            <span>{curOpt.label}</span>
            {slots.icon}
          </div>
        </Fullback>
        <input type="input" un-hidden-with-position="~" readOnly name={name} value={curOpt.value} />
      </label>
      <OptionWrapper
        $count={options.length}
        un-absolute="~"
        un-top="full"
        un-grid="~  rows-[repeat(var(--count),0fr)]"
        un-overflow="hidden"
        un-transition="duration-200 property-[grid-template-rows] [&>*]:all [&>*]:duration-200"
        un-color="transparent"
        un-group-focus-within="color-inherit rows-[repeat(var(--count),1fr)] [&>*]:p-y-[0.5em]"
        un-w="max"
        un-backdrop-blur="[0.5rem]"
        un-z="1"
        un-min-h="[&>*]:0"
      >
        {options.map((option) => {
          return (
            <Fullback key={option.value}>
              {OptionComp && <OptionComp {...option} onClick={() => changeOpt(option)} />}
              <Option slot="fullback" key={option.value} {...option} un-p="x-[1em]" onClick={() => changeOpt(option)} />
            </Fullback>
          );
        })}
      </OptionWrapper>
    </div>
  );
}
