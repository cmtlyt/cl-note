import { ChakraProvider } from '@chakra-ui/react';
import { StyleSheetManager } from 'styled-components';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';

import RouterView from './router';

function App() {
  return (
    <ConfigProvider locale={locale}>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'un'}>
        <ChakraProvider>
          <RouterView />
        </ChakraProvider>
      </StyleSheetManager>
    </ConfigProvider>
  );
}

export default App;
