import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import profile from './profile';
import lotes from './lotes';
import contacts from './contacts';
import myInt from './myInt';
import lotecation from './lotecation';
import activeContact from './activeContact';
import addContacts from './addContacts'; 
import contactsList from './contactsList'; 

const rootReducer = combineReducers({ 
  profile, 
  lotes, 
  myInt, 
  lotecation,
  activeContact, 
  addContacts,
  contactsList,
  routing: routerReducer 
});

export default rootReducer;
