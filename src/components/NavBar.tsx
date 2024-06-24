import { Box, Flex } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { gc } from '@cmtlyt/base';
import styled from 'styled-components';

import { SvgIcon } from './SvgIcon';

interface NavbarProps {
  onChange?: (value: string) => void;
}

interface NavItemProps extends BaseCompProps<HTMLDivElement> {
  to: string;
  icon: string;
}

interface NavItemHandlerProps {
  onClick?: BaseCompProps<HTMLAnchorElement>['onClick'];
}

function NavItem(props: NavItemProps & NavItemHandlerProps) {
  const { to, icon, className = '', onClick, ...otherProps } = props;

  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link to={to} un-transition="colors" un-relative="~" onClick={onClick}>
      <Box
        {...otherProps}
        un-absolute="~"
        un-left="0"
        un-top="50%"
        un-transform="translate-[-50%]"
        un-transition="all"
        className={gc(
          {
            [gc('translate-y-[-3em] p-1em', 'bg-[#fff] rounded-full', 'color-[var(--icon-active-color)] top-shadow')]:
              isActive,
          },
          className,
        )}
      >
        <SvgIcon name={icon} un-size="$big-icon-size" />
      </Box>
    </Link>
  );
}

const navMap = [
  {
    to: '/list',
    icon: 'queue-list',
  },
  {
    to: '/edit',
    icon: 'plus',
  },
  {
    to: '/user',
    icon: 'user',
  },
];

const Nav = styled.nav`
  padding-block: 1em;
  background-color: #fff;
  box-shadow: 0 0 3.5rem -2.5rem var(--shadow-color);
`;

export function NavBar(props: NavbarProps) {
  const { onChange } = props;

  return (
    <Nav>
      <Flex justify="space-evenly" un-h="$big-icon-size">
        {navMap.map((item) => (
          <NavItem key={item.to} {...item} onClick={() => onChange?.(item.to)} />
        ))}
      </Flex>
    </Nav>
  );
}
