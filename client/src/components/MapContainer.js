import React from 'react';
import ReactDOM from 'react-dom';
import AddLocation from 'material-ui-icons/AddLocation';
import Place from 'material-ui-icons/Place';
import Map, {Marker, GoogleApiWrapper} from '../lib/google-maps-react';
import toMaterialStyle from 'material-color-hash';

const placeIcon = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z';


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
    const searchBox = new google.maps.places.SearchBox(node);
    node.placeholder = '';
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
    const {lotecation, userLocation, lotes} = this.props;
    let mapCenter = {};
    // makes sure to center on first lote sent
    if (lotes.length === 1) {
      console.log(lotes);
      mapCenter.lat = lotes[0].location.latitude;
      mapCenter.lng = lotes[0].location.longitude;
    } else {
      mapCenter.lat = lotecation.lat || userLocation.lat;
      mapCenter.lng = lotecation.lng || userLocation.lng;
    }

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
            center={mapCenter}
            initialCenter={mapCenter}
            onDragend={this.centerMoved}
          >
            {this.props.lotes.map((lote, index) => {
              let color = toMaterialStyle(lote.loteSender.email);
              return (
                <Marker key={index}
                position={{
                  lat: lote.location.latitude,
                  lng: lote.location.longitude
                }}
                icon={{
                  path: placeIcon,
                  fillColor: color.backgroundColor,
                  fillOpacity: 1,
                  strokeColor: color.backGroundColor
                }}/>
              );
            })}
          </Map>
          {this.props.centerTarget && <AddLocation style={{
            height: '48px',
            width: '48px',
            position: 'relative',
            top: '50vh',
            transform: 'translate(0%, -100%)'
          }}></AddLocation>}
            <span style={{
              position: 'absolute',
              right: '0px',
              top: '10%'
            }}> {mapCenter.lat}, mapCenter.lng} </span>
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
