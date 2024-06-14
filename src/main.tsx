import React from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:uno.css';
import App from './App.tsx';
import './global.css';
import 'virtual:svg-icons-register';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
