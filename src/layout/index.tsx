import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { NavBar } from '@/components/NavBar';

export default function Home() {
  return (
    <Flex direction="column" h="100dvh">
      <Box flex="1">
        <Outlet />
      </Box>
      <NavBar />
    </Flex>
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
