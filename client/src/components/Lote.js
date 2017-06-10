import React from 'react';
import MapContainer from './MapContainer';
import Card from 'material-ui/Card';
import Forward from 'material-ui-icons/Forward';
import Moment from 'moment';

class Lote extends React.Component {
  componentWillMount() {
    this.props.setActivePage('Lote');
  }

  componentDidMount() {
    this.props.setActiveLoteId(this.props.params.loteId);
    if (this.props.lotes.length > 0) {
      this.props.lotes.forEach(lote => {
        if (lote.id === parseInt(this.props.params.loteId)) {
          this.props.setActiveLote(lote);
        }
      });
    }
  }

  componentWillUnmount() {
    console.log ('unmounting lote');
    this.props.setActiveLoteId(null);
    this.props.setActiveLote(null);
  }

  render() {
    let p = this.props;
    const mapProps = {
      history: p.history,
      location: p.location,
      lotecation: p.lotecation,
      userLocation: p.userLocation,
      updateLotecation: p.updateLotecation,
      searchBox: this.searchBox
    };

    return (
      <div className={'newLoteContainer'}>
        <MapContainer {...mapProps} />
        <Card style={{ width: '40%' }}>
          <div className="chat">
            <div className="loteDisplay">
              { this.props.activeLote && this.props.activeLote.loteSender.display }
              <Forward className="forward" />
              { this.props.activeLote && this.props.activeLote.lotesReceived[0].loteReceiver.display }
            </div>
            <div className="loteDisplaySenderStyle">
              <div className="loteMessage">
                { this.props.activeLote && this.props.activeLote.lote.message }
              </div>
              <div className="loteTimeStamp">{ this.props.activeLote && Moment(this.props.activeLote.created_at).format('LLLL') }</div>
            </div>
            <div className="lotecationDetails">
              <span>
                Lat/Lng: { this.props.activeLote && this.props.activeLote.location.latitude }/{ this.props.activeLote && this.props.activeLote.location.longitude }
              </span>
              <span>
                Radius: { this.props.activeLote && this.props.activeLote.radius + ' meters'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Lote;
