import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profile from './profile';
import lotes from './lotes';
import myInt from './myInt';

const rootReducer = combineReducers({ profile, lotes, myInt, routing: routerReducer });

export default rootReducer;