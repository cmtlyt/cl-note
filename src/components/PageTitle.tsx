import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { SvgIcon } from './SvgIcon';
import { Card } from './Card';

import { useWrapper } from '@/hooks/useWrapper';
import { Delivery } from '@/layout';
import { useSlots } from '@/hooks/useSlots';

interface PageTitleProps extends BaseCompProps<HTMLDivElement> {
  title?: string;
  hasBack?: boolean;
  hasFixed?: boolean;
  onBack?: () => boolean | void;
}

const TitleWrapper = styled(Card)`
  border-radius: 0;
`;

export function PageTitle(props: PageTitleProps): ReactNode {
  const { title, hasBack, hasFixed = false, children, onBack, ...otherProps } = props;

  const slots = useSlots(children);
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    const flag = onBack?.() ?? true;
    if (flag) {
      navigate(-1);
    }
  }, [onBack, navigate]);

  return useWrapper(
    <TitleWrapper
      slot="header"
      un-flex="~ items-center justify-center"
      un-p="y-[1rem]"
      un-bg="white"
      un-w="full"
      un-z="100"
    >
      <div un-absolute="~" un-left="[1rem]">
        {slots.icon || (hasBack && <SvgIcon name="chevron-left" onClick={onBackClick} un-size="$big-icon-size" />)}
      </div>
      <div un-font="bold" {...otherProps}>
        {slots.title || slots.default || title}
      </div>
      <div un-absolute="~" un-right="[2rem]">
        {slots.right}
      </div>
    </TitleWrapper>,
    Delivery,
    hasFixed,
  );
}
