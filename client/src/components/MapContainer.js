import React from 'react';
import ReactDOM from 'react-dom';
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react';


class WrappedMap extends React.Component {
  constructor(props) {
    super(props);

    this.searchBox = {getPlace: () => {
      console.log('searchBox not loaded');
    }};
    this.onSubmit = this.onSubmit.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
  }

  componentDidMount() {
    this.renderSearchBox();
  }

  componentDidUpdate(prevProps) {
    const {google, map, searchBox} = this.props;
    if (map !== prevProps.map) {
      this.renderSearchBox();
    } else if (searchBox !== prevProps.searchBox) {
      this.renderSearchBox();
    }
  }

  centerMoved(mapProps, map) {
    let location = map.getCenter();
    this.props.updateLotecation({lat: location.lat(), lng: location.lng()});
  }

  onSubmit(event) {
    event.preventDefault();
  }

  renderSearchBox() {

    const {google, map} = this.props;

    if (!google || !map || !this.props.searchBox) { return; }
    const aref = this.props.searchBox;
    const node = ReactDOM.findDOMNode(aref);
    console.log('node: ', node);
    const searchBox = new google.maps.places.SearchBox(node);
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      const place = places[0];

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
      this.props.updateLotecation({lat: lat(), lng: lng()});
    });

    this.searchBox = searchBox;
  }

  render() {
    const {lotecation, userLocation} = this.props;

    if (!this.props.loaded) {
      return (
        <div className="container-fluid">
          <div
            style={{
              position: 'relative',
              height: '100%',
              width: '100%',
              'backgroundColor': '#eaeaea'
            }}>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid fill">
          <Map {...this.props}
            containerStyle={{
              position: 'absolute',
              height: '100%',
              width: '100%'
            }}
            center={{lat: lotecation.lat || userLocation.lat, lng: lotecation.lng || userLocation.lng}}
            initialCenter={{lat: lotecation.lat || userLocation.lat, lng: lotecation.lng || userLocation.lng}}
            onDragend={this.centerMoved}
          >
          </Map>
          <img style={{
            position: 'relative',
            top: '50vh',
            transform: 'translate(0%, -100%)'
          }}
            src={'../assets/location-icon.png'}></img>
            <span style={{
              position: 'absolute',
              right: '0px',
              top: '10%'
            }}> {lotecation.lat || userLocation.lat}, {lotecation.lng || userLocation.lng} </span>
        </div>
      );
    }
  }
}

class MapWrapper extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.loaded !== this.props.loaded ||
      nextProps.location !== this.props.location ||
      nextProps.lotecation !== this.props.lotecation ||
      nextProps.userLocation !== this.props.userLocation;
  }

  render() {
    const props = this.props;
    const {google} = this.props;

    return (
      <Map google={google}
          className={'map'}
          visible={false}
          containerStyle={{
            height: '100%',
            width: '100%'
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
