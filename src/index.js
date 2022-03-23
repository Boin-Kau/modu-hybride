import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PageTransProvider } from './containers/pageTransContext';

import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

//실서버 ga 연동
if (process.env.NODE_ENV !== 'development') {
  ReactGA.initialize('UA-204802541-1');
}

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <PageTransProvider>
      <App />
    </PageTransProvider>
  </Provider>
  ,
  document.getElementById('root')
);


