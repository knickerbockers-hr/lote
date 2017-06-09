import React from 'react';
import MapContainer from './MapContainer';
import Card from 'material-ui/Card';

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
            <div>Sender: 
              { this.props.activeLote && this.props.activeLote.loteSender.display }
            </div>
            <div>Receiver: 
              { this.props.activeLote && this.props.activeLote.lotesReceived[0].loteReceiver.display }
            </div>
            <div>Message: 
              { this.props.activeLote && this.props.activeLote.lote.message }
            </div>
            <div>Lotecation:
              <span>Latitude: 
                { this.props.activeLote && this.props.activeLote.location.latitude }
              </span>
              <span>Longitude: 
                { this.props.activeLote && this.props.activeLote.location.longitude }
              </span>
            </div>
            <div>Radius: 
              { this.props.activeLote && this.props.activeLote.radius + ' meters'}
            </div>
            <div>Sent At: 
              { this.props.activeLote && this.props.activeLote.created_at }
            </div>
        </Card>
      </div>
    );
  }
}

export default Lote;
