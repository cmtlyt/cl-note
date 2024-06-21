import { Box, Flex as CkFlex } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { NavBar } from '@/components/NavBar';
import { getSlots } from '@/utils';
import { layoutAtom, slotsInfoAtom } from '@/storage/layout';

const Flex = styled(CkFlex)`
  height: 100%;
  height: 100vh;
  height: 100dvh;
`;

export default function Layout() {
  const [slotsInfo, setSlotsInfo] = useAtom(slotsInfoAtom);
  const [layoutInfo] = useAtom(layoutAtom);
  const location = useLocation();

  const { slots, path } = slotsInfo;

  useEffect(() => {
    if (path && path !== location.pathname) setSlotsInfo({ path: '', slots: {} });
  }, [location.pathname, path, setSlotsInfo]);

  return (
    <>
      <Flex direction="column">
        {slots.header}
        <Box un-flex="1" un-overflow="y-auto" un-p="b-[2rem]">
          <Outlet />
        </Box>
        {slots.footer || (layoutInfo.showNavBar && <NavBar onChange={(e) => console.log(e)} />)}
      </Flex>
    </>
  );
}

interface DeliveryProps {
  children: React.ReactNode;
}

export function Delivery(props: DeliveryProps) {
  const { children } = props;

  const setSlotsInfo = useSetAtom(slotsInfoAtom);
  const location = useLocation();

  const slots = getSlots(children);

  useEffect(() => {
    setSlotsInfo({ path: location.pathname, slots });
  }, [setSlotsInfo, location.pathname, slots]);

  return null;
}

export function loader(ctx: unknown) {
  console.log('loader', ctx);
  return {};
}
