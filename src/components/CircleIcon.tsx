import { isUrl } from '@cmtlyt/base';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { SvgIcon } from './SvgIcon';
import { Case } from './Case';
import { Fullback } from './Fullback';
import { Card } from './Card';
import { UnwrapSlot } from './UnwrapSlot';

import { useSlots } from '@/hooks/useSlots';

interface CircleIconProps extends BaseCompProps {
  text?: string;
  icon?: string;
  isActive?: boolean;
}

interface TextWrapperProps extends BaseCompProps {
  isActive?: boolean;
}

function TextWrapper(props: TextWrapperProps) {
  const { isActive, ...otherProps } = props;
  return (
    <div
      un-text="[1.4rem]"
      un-line-height="none"
      un-width="full"
      un-flex="~ justify-center"
      un-word-break="break-all"
      un-color={isActive ? '$primary-active-color' : '$detail-text-color'}
      un-m="t-[0.4em]"
      un-transition="colors"
      {...otherProps}
    />
  );
}

const IconWrapper = styled(Card)<{ $isActive?: boolean }>`
  border-radius: 9999px;
  ${(props) => {
    if (props.$isActive) {
      return css`
        background-color: var(--primary-active-color);
        color: white;
        box-shadow: null;
      `;
    }
    return '';
  }}
`;

export function CircleIcon(props: CircleIconProps) {
  const { text, icon, children, isActive, onClick, ...otherProps } = props;

  const slots = useSlots(children);

  const _isUrl = useMemo(() => {
    return isUrl(icon);
  }, [icon]);

  return (
    <div
      un-flex="~ col items-center"
      un-w="[calc(var(--content-big-icon-size)+1em)]"
      un-text="center"
      onClick={onClick}
    >
      <IconWrapper $isActive={isActive} un-transition="colors" un-p="[0.5em]" un-overflow="hidden">
        <Fullback>
          <Case slot="fullback" when={_isUrl ? 'img' : 'icon'}>
            <img slot="img" src={icon} un-size="$content-big-icon-size" {...otherProps} />
            <SvgIcon slot="icon" name={icon!} un-size="$content-big-icon-size" {...(otherProps as BaseUnoProps)} />
          </Case>
          {slots.icon || slots.default}
        </Fullback>
      </IconWrapper>
      <Fullback wrapper={TextWrapper} wrapperProps={{ isActive }}>
        {slots.text}
        {text && <UnwrapSlot slot="fullback">{text}</UnwrapSlot>}
      </Fullback>
    </div>
  );
}
