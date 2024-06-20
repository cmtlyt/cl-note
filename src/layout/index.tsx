import { Box, Flex as CkFlex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { NavBar } from '@/components/NavBar';

const Flex = styled(CkFlex)`
  height: 100%;
  height: 100vh;
  height: 100dvh;
`;

export default function Home() {
  return (
    <>
      <Flex direction="column">
        <Box un-flex="1" un-overflow="y-auto" un-p="b-[2rem]">
          <Outlet />
        </Box>
        <NavBar onChange={(e) => console.log(e)} />
      </Flex>
    </>
  );
}

export function loader(ctx: unknown) {
  console.log('loader', ctx);
  return {};
}

export async function action({ request }: { request: Request }) {
  const data = await request.json();
  console.log(data);
  return {};
}
