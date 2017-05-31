import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './store';
import App from './components/App';
import Main from './components/Main';

const router = (
  <Provider store={ store }>
    <BrowserRouter>
      <Route path='/' component={ App(Main) } />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
