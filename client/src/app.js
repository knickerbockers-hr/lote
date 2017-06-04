// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import App from './components/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const router = (
<MuiThemeProvider>
  <Provider store={ store }>
    <BrowserRouter>
      <Route path='/' component={ App } />
    </BrowserRouter>
  </Provider>
</MuiThemeProvider>
);

ReactDOM.render(router, document.getElementById('root'));
