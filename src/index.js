// index.js o tu componente principal
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '../src/shared/components/ThemeContext';
import { FontSizeProvider } from '../src/shared/components/FontSizeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <FontSizeProvider>
        <App />
      </FontSizeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
