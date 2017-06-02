
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

var defaultState = {
  profile: {},
  lotes: [{lote: {message: 'hello'}}],
  myInt: 100
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store;
