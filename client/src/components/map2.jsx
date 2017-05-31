import React from 'react';
import ReactDOM from 'react-dom';

import Map, {Marker, GoogleApiWrapper} from 'google-maps-react';

class geocodeMap extends react.component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
        name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
