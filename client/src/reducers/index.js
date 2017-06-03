import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profile from './profile';
import lotes from './lotes';
import contacts from './contacts';
import myInt from './myInt';
import lotecation from './lotecation';
import activePage from './activePage';
import activeContact from './activeContact';
import activeMessage from './activeMessage';
import userLocation from './user-location';

const rootReducer = combineReducers({
  profile,
  lotes,
  contacts,
  myInt,
  lotecation,
  userLocation,
  activePage,
  activeContact,
  activeMessage,
  routing: routerReducer
});

export default rootReducer;
