import store from './store';

let success = (pos) => {
  console.log('locationchange: ', pos.coords.latitude);
  store.dispatch({
    type: 'UPDATE_USER_LOCATION',
    payload: {
      lat: () => { return pos.coords.latitude; },
      lng: () => { return pos.coords.longitude; }
    }
  });
};

let error = (err) => {
  console.warn('Tracking error: ', err);
};

let options = {

};

export default navigator.geolocation.watchPosition(success, error, options);
