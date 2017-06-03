import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

var defaultState = {
  profile: {},
  lotes: [],
  contacts: [],
  myInt: 100,
  lotecation: {
    lat: () => { return 0; },
    lng: () => { return 0; }}
}; // we need a reducer for each state

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, defaultState, enhancer);

export default store;
