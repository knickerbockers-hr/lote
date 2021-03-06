import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { TextField, RaisedButton, DropDownMenu, MenuItem, Card, Checkbox } from 'material-ui';
import MapContainer from './MapContainer';
import socket from '../socket';

class NewLote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lock: false,
      radius: 20
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeSubmit = this.placeSubmit.bind(this);
    this.placeRef = this.placeRef.bind(this);
    this.handleLockToggle = this.handleLockToggle.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
  }

  componentWillMount() {
    this.props.setActivePage('New Lote');
  }

  handleRecipientChange (event, index, receiverId) {
    this.setState({ receiverId });
  }

  handleRecipientChange (event, index, receiver) {
    this.props.setActiveContact(receiver);
  }

  handleLockToggle(event, checked) {
    this.setState({ lock: checked });
  }

  handleRadiusChange(event, index, radius) {
    this.setState({ radius: radius});
  }

  handleSubmit(event) {
    event.preventDefault();

    let loteInfo = {
      senderId: this.props.profile.id,
      receiverId: this.props.activeContact.id,
      loteType: 'lotes_text',
      radius: this.state.radius,
      message: this.props.activeMessage,
      lock: this.state.lock,
      longitude: this.props.lotecation.lng || this.props.userLocation.lng,
      latitude: this.props.lotecation.lat || this.props.userLocation.lat
    };

    socket.emit('send message', loteInfo, (err, msg) => {
      if (err) {
        console.log (err);
      } else {
        this.props.setActiveMessage('');
        this.props.history.push('/lotes');
      }
    });
  }

  placeRef(ref) {
    this.searchBox = ref ? ref.input : null;
  }

  placeSubmit(event) {
    event.preventDefault();
    console.log(this.props);
  }

  render() {
    let p = this.props;
    const mapProps = {
      history: p.history,
      location: p.location,
      lotecation: p.lotecation,
      userLocation: p.userLocation,
      updateLotecation: p.updateLotecation,
      searchBox: this.searchBox,
      centerTarget: true,
      lotes: p.lotes
    };
    return (
      <div className={ 'newLoteContainer' }>
        <MapContainer { ...mapProps } />
        <Card style={{
          width: '40%'
        }}>
          <DropDownMenu ref="receiver" value={ (this.props.activeContact.id && this.props.activeContact.id !== this.props.profile.id) ? this.props.activeContact : this.props.profile } onChange={ this.handleRecipientChange } openImmediately={ false }>
            <MenuItem value={ this.props.profile } primaryText={ this.props.profile.display + ' (Self)' }/>
            {this.props.contacts.map((contact, i) => {
              return (
                contact.receiver_id !== this.props.profile.id &&
                  <MenuItem
                  key={ i + 1 }
                  value={ contact.receiver }
                  primaryText={ contact.receiver.display ? contact.receiver.display : contact.receiver.email }
                  />
              );
            })}
          </DropDownMenu>
          <form ref="loteForm" onSubmit={ this.handleSubmit }>
            <TextField hintText="Enter a message" multiLine={ true } rows={ 1 } ref="message" type="text" name="message" value={ this.props.activeMessage } onChange={ (event) => this.props.setActiveMessage(event.target.value) } />
          </form>
          <form onSubmit={ this.placeSubmit }>
            <TextField id="locationSearch" ref={ this.placeRef } hintText="Location search" />
          </form>
          <div>
            <label className="loteFormLabel">Radius</label>
              <DropDownMenu ref="radius" value={this.state.radius} onChange={ this.handleRadiusChange } openImmediately={ false }>
                <MenuItem value={ 20 } primaryText="20 meters"/>
                <MenuItem value={ 100 } primaryText="100 meters"/>
                <MenuItem value={ 500 } primaryText="500 meters"/>
                <MenuItem value={ 2500 } primaryText="2,500 meters"/>
                <MenuItem value={ 10000 } primaryText="10,000 meters"/>
              </DropDownMenu>
          </div>
          <div>
            <Checkbox
              label="Location-Locked"
              style={{ width: "initial", margin: "auto", paddingRight: 12 }}
              labelStyle={{ width: "initial" }}
              checked={ this.state.lock }
              onCheck={ this.handleLockToggle }
            />
          </div>
          <div>
            <RaisedButton
              labelColor="#ffffff"
              backgroundColor="#48d09b"
              className="submitButton"
              label="Submit"
              onTouchTap={ this.handleSubmit }
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default NewLote;
