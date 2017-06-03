import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profile from './profile';
import lotes from './lotes';
import contacts from './contacts';
import myInt from './myInt';
import lotecation from './lotecation';

const rootReducer = combineReducers({ profile, lotes, contacts, myInt, lotecation, routing: routerReducer });

export default rootReducer;
