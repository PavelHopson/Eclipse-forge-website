import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { LocaleProvider } from './lib/locale';
import { ThemeProvider } from './lib/theme';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocaleProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LocaleProvider>
  </React.StrictMode>,
);
