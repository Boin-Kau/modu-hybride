import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PageTransProvider } from './contexts/pageTransContext';

import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';



const store = createStore(rootReducer);


ReactDOM.render(
  <Provider store={store}>
    <PageTransProvider>
      <App />
    </PageTransProvider>
  </Provider>
  ,
  document.getElementById('root')
);


