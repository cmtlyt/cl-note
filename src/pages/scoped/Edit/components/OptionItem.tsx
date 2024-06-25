import { gc } from '@cmtlyt/base';
import styled, { css } from 'styled-components';

import { SvgIcon } from '@/components/SvgIcon';
import type { OptionItem } from '@/constant/editPageData';

const SvgIcon2 = styled(SvgIcon)<{ $size?: string }>`
  ${(props) =>
    props.$size &&
    css`
      width: ${props.$size};
      height: ${props.$size};
    `}
`;

export function OptionItem(props: OptionItem) {
  const { label, icon, size, type, onClick } = props;
  return (
    <div
      onClick={() => onClick?.()}
      un-flex="~ items-center"
      un-line-height="none"
      un-h="2.5em"
      className={gc({ 'px-[1em]': type === 'option' })}
    >
      <SvgIcon2 name={icon} un-size="$big-icon-size" $size={size} />
      <span un-m="l-[0.5em]">{label}</span>
    </div>
  );
}
