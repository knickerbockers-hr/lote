const rbush = require('rbush');
const geopoint = require('geopoint');

// create and export to hold in global state
const createGeofence = (lote) => {
  const {longitude, latitude} = lote.location;
  let point = new geopoint(latitude, longitude);
  // default radius half a km in case of db error
  let radius = lote.radius / 1000 || 0.5;
  let bbox = point.boundingCoordinates(radius, true);
  return {
    minX: bbox[0].longitude(),
    minY: bbox[0].latitude(),
    maxX: bbox[1].longitude(),
    maxY: bbox[1].latitude(),
    data: lote
  };
};

module.exports.Fences = rbush();
module.exports.createGeofence = createGeofence;

