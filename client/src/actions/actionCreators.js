const axios = require('axios');

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

export const getLotes = (userId) => {
  console.log ('getting lotes');
  return function(dispatch, getState) {
    var state = getState();
    dispatch(loadingChanged(true));

    return axios.get(`/api/profiles/${userId}/lotes`)
      .then(function (res) {
        dispatch(loadingChanged(false));

        if (res.status === 200) {
          console.log (res);
          return res.data;
        }
        throw 'request failed';
      })
      .then(function (lotes) {
        console.log ('received lotes', lotes);
        dispatch(addLotesToStore(lotes));
      })
      .catch(function (err) {
        console.log (err);
      });
  };
};

export const setProfile = (profile) => {
  return {
    type: 'SET_PROFILE',
    profile
  };
};

// export const addLote = (lote) => {
//   return {
//     type: 'ADD_LOTE',
//     lote
//   };
// };

// export const removeLote = (index) => {
//   return {
//    type: 'REMOVE_LOTE',
//    index
//   };
// };
