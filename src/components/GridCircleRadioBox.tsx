import { useState } from 'react';
import styled from 'styled-components';

import { CircleIcon } from './CircleIcon';

export interface RadioInfo {
  value: string;
  icon: string;
  label: string;
  onClick?: (value: string) => void;
}

interface RadioItemProps extends BaseCompProps<HTMLLabelElement> {
  radioInfo: RadioInfo;
  name?: string;
  isActive?: boolean;
  required?: boolean;
}

interface RadioItemHandlerProps {
  onClick?: (value: string) => void;
}

function RadioItem(props: RadioItemProps & RadioItemHandlerProps) {
  const {
    radioInfo: { value, icon, label, onClick: customClick },
    name,
    required,
    isActive,
    onClick,
    ...otherProps
  } = props;
  return (
    <label onClick={() => (customClick || onClick)?.(value)} {...otherProps}>
      <input type="radio" name={name} value={value} un-hidden="~" required={required} />
      <CircleIcon icon={icon} text={label} isActive={isActive} />
    </label>
  );
}

interface GridCircleRadioBoxProps extends BaseCompProps<HTMLDivElement> {
  name?: string;
  radioList: RadioInfo[];
  colNum?: number;
  required?: boolean;
}

interface GridCircleRadioBoxhandlerProps {
  onChange?: (id: string) => void;
}

const GrdiWrapper = styled.div<{ $colNum?: number }>`
  grid-template-columns: repeat(${(props) => props.$colNum || 4}, 1fr);
`;

export function GridCircleRadioBox(props: GridCircleRadioBoxProps & GridCircleRadioBoxhandlerProps) {
  const { name, radioList, colNum, required, onChange, ...otherProps } = props;
  const [curValue, setCurValue] = useState('');

  return (
    <GrdiWrapper un-grid="~ place-items-center" un-m="t-[-1em]" $colNum={colNum} {...otherProps}>
      {radioList.map((item) => (
        <RadioItem
          key={item.value}
          required={required}
          radioInfo={item}
          name={name}
          isActive={curValue === item.value}
          un-m="t-[1em]"
          onClick={(value) => {
            setCurValue(value as string);
            onChange?.(value as string);
          }}
        />
      ))}
    </GrdiWrapper>
  );
}
