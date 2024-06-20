import { ChakraProvider } from '@chakra-ui/react';
import { StyleSheetManager } from 'styled-components';

import RouterView from './router';

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'un'}>
      <ChakraProvider>
        <RouterView />
      </ChakraProvider>
    </StyleSheetManager>
  );
}

export default App;
