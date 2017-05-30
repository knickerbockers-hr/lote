import React from 'react';
import loadJS from 'loadjs';

class geocodeMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {addressSearch: ''};

    this.geocodeAddress = this.geocodeAddress.bind(this);
    this.setMapElementReference = this.setMapElementReference.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadJS(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`, {
      success: () => {
        this.geocoder = new google.maps.Geocoder();
      },
      error: () => {

      }}
    );
  }

  geocodeAddress(address) {
    this.geocoder.geocode({address: address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log('GEOCODE OK: ', results);
      }
    });
  }

  handleFromSubmit(event) {
    event.preventDefault();
    this.geocodeAddress(this.searchInputElement.value);
  }

  initMap() {
    // http://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
    map = new google.maps.Map(this.refs.map.getDOMNode());
  }

  setMapElementReference(mapElementReference) {
    this.mapElement = mapElementReference;
  }

  render() {
    return (
      <div>
        <div ref={this.setMapElementReference}></div>
      </div>);
  }
}

export default geocodeMap;
