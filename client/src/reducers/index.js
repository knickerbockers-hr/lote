import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profile from './profile';
import lotes from './lotes';
import myInt from './myInt';
import lotecation from './lotecation';

const rootReducer = combineReducers({ profile, lotes, myInt, lotecation, routing: routerReducer });

export default rootReducer;
