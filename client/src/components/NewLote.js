import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MapContainer from './MapContainer';
import {Card, CardMedia} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

class NewLote extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lock: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeSubmit = this.placeSubmit.bind(this);
    this.placeSearch = this.placeSearch.bind(this);
    this.placeRef = this.placeRef.bind(this);
    this.handleLockToggle = this.handleLockToggle.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`/api/profiles/${this.props.profile.id}/lotes`, {
      senderId: this.props.profile.id,
      receiverId: this.props.activeContact.id,
      loteType: 'lotes_text',
      message: this.props.activeMessage,
      lock: this.state.lock,
      longitude: this.props.lotecation.lng || this.props.userLocation.lng,
      latitude: this.props.lotecation.lat || this.props.userLocation.lat
    })
    .then((res) => {
      this.props.setActiveMessage('');
      this.props.getLotes(this.props.profile.id);
      this.props.history.push('/lotes');
    })
    .catch((err) => {
      console.log (err);
    });
  }

  placeRef(ref) {
    this.autocomplete = ref ? ref.input : null;
  }

  placeSubmit(event) {
    event.preventDefault();
    console.log('submit');
  }

  placeSearch(event) {
    console.log('hello');
  }

  render() {
    let p = this.props;
    const mapProps = {
      history: p.history,
      location: p.location,
      lotecation: p.lotecation,
      userLocation: p.userLocation,
      updateLotecation: p.updateLotecation,
      autocomplete: this.autocomplete
    };
    return (
      <div className={'newLoteContainer'}>
        <MapContainer {...mapProps} />
        <Card style={{
          width: '40%'
        }}>

          <form className="lote-form" onSubmit={this.placeSubmit}>
            <TextField id="locationSearch"
              ref={this.placeRef}
            />
            <RaisedButton labelColor='#ffffff' backgroundColor='#48d09b' className="submitButton" label="Search" type="submit" onTouchTap={ this.placeSearch }/>
          </form>

          <DropDownMenu ref="receiver" value={ (this.props.activeContact.id && this.props.activeContact.id !== this.props.profile.id) ? this.props.activeContact : this.props.profile } onChange={ this.handleRecipientChange } openImmediately={ false }>

            <MenuItem value={ this.props.profile } primaryText={ this.props.profile.display + ' (Self)' }/>
            {this.props.contacts.map((contact, i) => {
              return (
                contact.receiver_id !== this.props.profile.id &&
                  <MenuItem key={ i + 1 } value={ contact.receiver } primaryText={ contact.receiver.display ? contact.receiver.display : contact.receiver.email }/>
              );
            })}
          </DropDownMenu>

          <form className="lote-form" ref="loteForm" onSubmit={ this.handleSubmit }>
            <div>
              <label className="lote-form-label">
                <TextField multiLine={true} rows={1} className="lote-form-input-message" ref="message" type="text" name="message" value={ this.props.activeMessage } onChange={ (event) => this.props.setActiveMessage(event.target.value) } />
              </label>
            </div>
            <div>
              <Checkbox label='Location-Locked' style={{width: 'initial', margin: 'auto', paddingRight: 12}} labelStyle={{width: 'initial'}} checked={ this.state.lock } onCheck={ this.handleLockToggle } />
            </div>
            <div>
              <RaisedButton labelColor='#ffffff' backgroundColor='#48d09b' className="submitButton" label="Submit" onTouchTap={ this.handleSubmit }/>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

export default NewLote;
