import { ChakraProvider } from '@chakra-ui/react';

import RouterView from './router';

function App() {
  return (
    <ChakraProvider>
      <RouterView />
    </ChakraProvider>
  );
}

export default App;
