import React from 'react';
import ReactDOM from 'react-dom';
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react';

class WrappedMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: {
        lat: undefined,
        lng: undefined
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(event) {
    event.preventDefault();
  }

  renderAutoComplete() {
    console.log('render: ', this);
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

      this.setState({
        place: place,
        position: place.geometry.location
      });
    });
  }

  render() {
    if (!this.props.loaded) {
      return (
        <h1>LOADING</h1>
      );
    } else {
      const {position} = this.state;
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              // className={styles.button}
              type='submit'
              value='Go' />
            <span> {position && position.lat()}, {position && position.lng()} </span>
            </form>
          <Map {...this.props}
            containerStyle={{
              position: 'relative',
              height: '100vh',
              width: '100%'
            }}
            google={this.props.google}>
            <Marker position={this.state.position} />
            </Map>
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
          visible={false}>
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
