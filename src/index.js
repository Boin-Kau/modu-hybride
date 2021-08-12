import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PageTransProvider } from './containers/pageTransContext';

import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-204802541-1');
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


