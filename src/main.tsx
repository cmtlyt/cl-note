import React from 'react';
import ReactDOM from 'react-dom/client';
import { locale, extend } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/zh-cn';

import 'virtual:uno.css';
import 'virtual:svg-icons-register';
import App from './App.tsx';
import './global.css';

locale('zh-cn');
extend(isoWeek);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
