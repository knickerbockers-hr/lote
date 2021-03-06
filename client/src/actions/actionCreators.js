const axios = require('axios');
const geo = require('../lib/geo');

export const addContactsToStore = (contacts) => {
  return {
    type: 'ADD_CONTACTS',
    contacts
  };
};

export const increment = () => {
  return {
    type: 'INCREMENT'
  };
};

export const loadingChanged = (isLoading) => {
  return {
    type: 'IS_LOADING',
    isLoading
  };
};

export const addLotesToStore = (lotes) => {
  return {
    type: 'ADD_LOTES',
    lotes
  };
};

export const addOneLote = (lote) => {
  return {
    type: 'ONE_LOTE',
    lote
  };
};

export const setProfile = (profile) => {
  return {
    type: 'SET_PROFILE',
    profile
  };
};

export const updateLotecation = (location) => {
  return {
    type: 'UPDATE_LOTECATION',
    payload: location
  };
};

export const updateUserLocation = (location) => {
  return {
    type: 'UPDATE_USER_LOCATION',
    payload: location
  };
};

export const setActivePage = (activePage) => {
  return {
    type: 'SET_ACTIVE_PAGE',
    activePage
  };
};

export const setActiveContact = (activeContact) => {
  return {
    type: 'SET_ACTIVE_CONTACT',
    activeContact
  };
};

export const setActiveMessage = (activeMessage) => {
  return {
    type: 'SET_ACTIVE_MESSAGE',
    activeMessage
  };
};

export const setActiveLoteId = (activeLoteId) => {
  return {
    type: 'SET_ACTIVE_LOTE_ID',
    activeLoteId
  };
};

export const setActiveLote = (activeLote) => {
  return {
    type: 'SET_ACTIVE_LOTE',
    activeLote
  };
};


export const getLotes = (userId) => {
  console.log ('getting lotes');
  return function(dispatch, getState) {
    var state = getState();
    dispatch(loadingChanged(true));

    return axios.get(`/api/profiles/${userId}/lotes`)
      .then(function (res) {
        dispatch(loadingChanged(false));

        if (res.status === 200) {
          // console.log (res);
          return res.data;
        }
        throw 'request failed';
      })
      .then(function (lotes) {
        dispatch(addLotesToStore(lotes));
        if (state.activeLoteId) {
          lotes.forEach(lote => {
            if (lote.id === parseInt(state.activeLoteId)) {
              dispatch(setActiveLote(lote));
            }
          });
        }
        geo.Fences.clear();
        // load points into r-tree
        geo.Fences.load(lotes.map(geo.createGeofence));
      })
      .catch(function (err) {
        console.log (err);
      });
  };
};


export const getContacts = (userId) => {
  console.log ('getting contacts');
  return function(dispatch, getState) {
    var state = getState();
    dispatch(loadingChanged(true));

    return axios.get(`/api/profiles/${userId}/contacts`)
      .then(function (res) {
        dispatch(loadingChanged(false));

        if (res.status === 200) {
          // console.log (res);
          return res.data;
        }
        throw 'request failed';
      })
      .then(function (contacts) {
        dispatch(addContactsToStore(contacts));
      })
      .catch(function (err) {
        console.log (err);
      });
  };
};

