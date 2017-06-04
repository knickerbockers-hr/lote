import React from 'react';
import ReactDOM from 'react-dom';
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react';


class WrappedMap extends React.Component {
  constructor(props) {
    super(props);

    this.autocomplete = {getPlace: () => {
      console.log('Autocomplete not loaded');
    }};
    this.onSubmit = this.onSubmit.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  centerMoved(mapProps, map) {
    this.props.updateLotecation(map.getCenter());
  }

  onSubmit(event) {
    event.preventDefault();
  }

  renderAutoComplete() {

    const {google, map} = this.props;

    if (!google || !map) { return; }

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      let {lat, lng} = place.geometry.location;
      this.props.updateLotecation(place.geometry.location);
    });

    this.autocomplete = autocomplete;
  }

  render() {
    const lotecation = this.props.lotecation;


    if (!this.props.loaded) {
      return (
        <div className="container-fluid">
          <form>
            <input
              type="text"
              ref="autocomplete"
              placeholder="Enter a location" />
            <input
              // className={styles.button}
              type="submit"
              value="Go" />
            </form>
          <div
            style={{
              position: 'relative',
              height: '80vh',
              width: '100%',
              'backgroundColor': '#eaeaea'
            }}>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <form onSubmit={this.onSubmit}>
            <input
              ref="autocomplete"
              type="text"
              placeholder="Enter a location" />
            <input
              // className={styles.button}
              type="submit"
              value="Go" />
            <span> {lotecation.lat()}, {lotecation.lng()} </span>
            </form>
          <Map {...this.props}
            containerStyle={{
              position: 'absolute',
              height: '100%',
              width: '100%'
            }}
            center={{lat: lotecation.lat() || 37.774929, lng: lotecation.lng() || -122.419416}}
            initialCenter={{lat: lotecation.lat() || 37.774929, lng: lotecation.lng() || -122.419416}}
            onDragend={this.centerMoved}
          >
          </Map>
          <img style={{
            position: 'relative',
            top: '40vh',
            left: '50%',
            transform: 'translate(-50%, -100%)'
          }}
            src={'../assets/location-icon.png'}></img>
        </div>
      );
    }
  }
}

class MapWrapper extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const {google} = this.props;

    return (
      <Map google={google}
          className={'map'}
          visible={false}
          containerStyle={{
            height: '80vh',
            width: '80%'
          }}>
            <WrappedMap {...props} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  version: '3.27',
  libraries: ['places']
})(MapWrapper);
