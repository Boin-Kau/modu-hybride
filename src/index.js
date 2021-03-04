import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PageTransProvider } from './contexts/pageTransContext';

ReactDOM.render(
  <PageTransProvider>
    <App />
  </PageTransProvider>
  ,
  document.getElementById('root')
);


