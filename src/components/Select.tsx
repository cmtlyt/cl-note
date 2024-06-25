import { useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { gc } from '@cmtlyt/base';

import { Card } from './Card';
import { Fullback } from './Fullback';

import { useSlots } from '@/hooks/useSlots';

export interface OptionInfo {
  label: string;
  value: string;
  onClick?: () => void;
}

interface OptionProps extends Omit<OptionInfo, 'onClick'>, Omit<BaseCompProps<HTMLDivElement>, 'onClick'> {
  onClick?: (value: string) => void;
}

function Option(props: OptionProps) {
  const { label, value, onClick, ...otherProps } = props;
  return (
    <div onClick={() => onClick?.(value)} un-line-height="none" un-w="full" {...otherProps}>
      {label}
    </div>
  );
}

interface SelectProps extends Omit<BaseCompProps<HTMLDivElement>, 'children' | 'onChange'> {
  name?: string;
  placeholder?: OptionProps;
  options?: OptionProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OptionComp?: React.FC<any>;
  optionWrapperClass?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ReactNode | React.FC<any>;
  defaultValue?: string;
  placement?: 'topleft' | 'topright' | 'topcenter' | 'bottomleft' | 'bottomright' | 'bottomcenter';
  required?: boolean;

  onChange?: (value: string) => void;
}

const OptionWrapper = styled(Card)<{ $count: number }>`
  background-color: #fff8;
  ${(props) => css`
    --count: ${props.$count};
  `}
`;

const placementMap = {
  topleft: 'bottom-full left-0',
  topright: 'bottom-full right-full',
  topcenter: 'bottom-full left-50% -translate-x-50%',
  bottomleft: 'top-full left-0',
  bottomright: 'top-full right-full',
  bottomcenter: 'top-full left-50% -translate-x-50%',
};

export function Select(props: SelectProps) {
  const {
    name,
    placeholder,
    options: _tempOptions,
    optionWrapperClass = '',
    children,
    OptionComp,
    placement = 'bottomleft',
    defaultValue,
    required,
    onChange,
    ...otherProps
  } = props;

  const slots = useSlots(children as ReactNode, ['icon']);

  const options = useMemo(() => {
    return [...(placeholder ? [placeholder] : []), ...(_tempOptions || [])];
  }, [_tempOptions, placeholder]);

  const [curOpt, setCurOpt] = useState(
    options.find((option) => option.value === defaultValue) ||
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
          {slots.default && slots.default({ ...curOpt, type: 'label' })}
          <div un-flex="~ items-center" {...otherProps} slot="fullback">
            <span>{curOpt.label}</span>
            {slots.icon}
          </div>
        </Fullback>
        <input type="input" un-hidden-with-position="~" readOnly name={name} value={curOpt.value} required={required} />
      </label>
      <OptionWrapper
        $count={options.length}
        un-absolute="~"
        un-grid="~  rows-[repeat(var(--count),0fr)]"
        un-overflow="hidden"
        un-transition="duration-200 property-[grid-template-rows,top,left,right,bottom] [&>*]:all [&>*]:duration-200"
        un-color="transparent"
        un-group-focus-within="color-inherit rows-[repeat(var(--count),1fr)] [&>*]:p-y-[0.5rem]"
        un-w="max"
        un-backdrop-blur="[0.5rem]"
        un-z="1"
        un-min-h="[&>*]:0"
        className={gc(placementMap[placement], optionWrapperClass)}
      >
        {options.map((option) => {
          return (
            <Fullback key={option.value} wrapper={(props: { children: ReactNode }) => <div {...props} />}>
              {OptionComp && <OptionComp {...option} type="option" onClick={() => changeOpt(option)} />}
              <Option slot="fullback" key={option.value} {...option} un-p="x-[1em]" onClick={() => changeOpt(option)} />
            </Fullback>
          );
        })}
      </OptionWrapper>
    </div>
  );
}
