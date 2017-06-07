import store from './store';
import socket from './socket';

let success = (pos) => {
  store.dispatch({
    type: 'UPDATE_USER_LOCATION',
    payload: {
      lat: () => { return pos.coords.latitude; },
      lng: () => { return pos.coords.longitude; }
    }
  });
  console.log(pos.coords);
  socket.emit('location update', {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  });
};

let error = (err) => {
  // possibly want some sort of red flag in header when tracking isn't working
  // to let you know when you aren't picking up lotes
  console.warn('Tracking error: ', err);
};

let options = {

};

export default navigator.geolocation.watchPosition(success, error, options);
