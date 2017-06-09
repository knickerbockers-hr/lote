import store from './store';
import socket from './socket';
import {Fences, createGeofence} from './lib/geo';
import geopoint from 'geopoint';

// Listen for new lotes after initial data grab
let newLote = (lote) => {
  store.dispatch({
    type: 'ONE_LOTE',
    lote
  });
};

socket.on('new message', function(data) {
  console.log('SOCKET RESPONSE IN TRACKER.JS', data.data);
  Fences.insert(createGeofence(data.data));
  newLote(data.data);
});

// Start location tracking in background
let success = (pos) => {
  store.dispatch({
    type: 'UPDATE_USER_LOCATION',
    payload: {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    }
  });

  let location = new geopoint(pos.coords.latitude, pos.coords.longitude);
  let bbox = location.boundingCoordinates(.01, true);

  let triggeredLotes = Fences.search({
    minX: bbox[0].longitude(),
    minY: bbox[0].latitude(),
    maxX: bbox[1].longitude(),
    maxY: bbox[1].latitude()
  });

  console.log('lotes in range: ', triggeredLotes.map((lote) => {
    return lote.data;
  }));
};


let error = (err) => {
  // possibly want some sort of red flag in header when tracking isn't working
  // to let you know when you aren't picking up lotes
  console.warn('Tracking error: ', err);
};

let options = {

};

export default navigator.geolocation.watchPosition(success, error, options);
