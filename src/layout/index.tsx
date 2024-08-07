import { Box, Flex as CkFlex } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { $ } from 'jotai-signal';

import { NavBar } from '@/components/NavBar';
import { layoutAtom, showLoadingAtom, slotsInfoAtom } from '@/storage/layout';
import { Loading } from '@/components/Loading';
import { useSlots } from '@/hooks/useSlots';

const Flex = styled(CkFlex)`
  height: 100%;
  height: 100vh;
  height: 100dvh;
`;

export default function Layout() {
  const [slotsInfo, setSlotsInfo] = useAtom(slotsInfoAtom);
  const [layoutInfo] = useAtom(layoutAtom);
  const location = useLocation();
  const navigation = useNavigation();

  const { slots, path } = slotsInfo;

  useEffect(() => {
    if (path && path !== location.pathname) setSlotsInfo({ path: '', slots: {} });
  }, [location.pathname, path, setSlotsInfo]);

  return (
    <>
      <Flex direction="column">
        <div un-relative="~" un-z="0" un-p="b-[2rem]" un-flex="~ col 1" un-overflow="hidden">
          {slots.header}
          <Box un-overflow="y-auto" un-flex="1">
            <Outlet />
          </Box>
          <Loading delay={300} visible={$(showLoadingAtom) || navigation.state === 'loading'} un-absolute="~" />
        </div>
        <div un-relative="~">
          {slots.footer || (layoutInfo.showNavBar && <NavBar onChange={(e) => console.log(e)} />)}
        </div>
      </Flex>
      <section un-fixed="~" un-size="0" un-top="0" un-left="0">
        {slots.fixed}
      </section>
    </>
  );
}

interface DeliveryProps {
  children: ReactNode;
}

export function Delivery(props: DeliveryProps) {
  const { children } = props;

  const setSlotsInfo = useSetAtom(slotsInfoAtom);
  const location = useLocation();

  const slots = useSlots(children, ['header', 'fixed', 'footer']);

  useEffect(() => {
    setSlotsInfo({ path: location.pathname, slots });
  }, [setSlotsInfo, location.pathname, slots]);

  return null;
}

export function loader(ctx: unknown) {
  console.log('loader', ctx);
  return {};
}
