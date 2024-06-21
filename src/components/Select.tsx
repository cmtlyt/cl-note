import { useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import { Card } from './Card';

interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

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

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: OptionProps;
  options?: OptionProps[];
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
  const { placeholder, options: _tempOptions, onChange, ...otherProps } = props;

  const options = useMemo(() => {
    return [...(placeholder ? [placeholder] : []), ...(_tempOptions || [])];
  }, [_tempOptions, placeholder]);

  const [curOpt, setCurOpt] = useState({
    value: options?.[0].value || '',
    label: options?.[0].label || '',
  });

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
        <div {...otherProps}>{curOpt.label}</div>
        <input type="input" un-hidden-with-position="~" readOnly />
      </label>
      <OptionWrapper
        $count={options.length}
        un-absolute="~"
        un-top="full"
        un-grid="~  rows-[repeat(var(--count),0fr)]"
        un-overflow="hidden"
        un-transition="all duration-200"
        un-group-focus-within="rows-[repeat(var(--count),1fr)] [&>*]:p-y-[0.5em]"
        un-w="max-content"
        un-backdrop-blur="[0.5rem]"
        un-m="t-[1rem]"
      >
        {options.map((option) => {
          return (
            <Option
              key={option.value}
              {...option}
              un-min-h="0"
              un-p="x-[1em]"
              un-transition="all duration-200"
              onClick={() => changeOpt(option)}
            />
          );
        })}
      </OptionWrapper>
    </div>
  );
}
