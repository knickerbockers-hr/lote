import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import App from './components/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

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
