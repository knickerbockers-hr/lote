import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MapContainer from './MapContainer';
import Card from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

class NewLote extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lock: false,
      receiverId: 0,
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLockToggle = this.handleLockToggle.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleRecipientChange (event, index, receiverId) {
    this.setState({ receiverId });
  }

  handleMessageChange (event) {
    this.setState({ message: event.target.value });
  }

  handleLockToggle(event, checked) {
    this.setState({ lock: checked });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`/api/profiles/${this.props.profile.id}/lotes`, {
      senderId: this.props.profile.id,
      receiverId: this.refs.receiver.props.value,
      loteType: 'lotes_text',
      message: this.state.message,
      lock: this.state.lock
    })
    .then((res) => {
      this.props.getLotes(this.props.profile.id);
      console.log (res);
    })
    .catch((err) => {
      console.log (err);
    });

    this.setState({ message: '' });
  }

  render() {
    return (
      <div className='newLoteContainer'>
        <h1>New Lote</h1>
        <Card>
          <DropDownMenu ref="receiver" value={ this.state.receiverId ? this.state.receiverId : this.props.profile.id } onChange={ this.handleRecipientChange } openImmediately={ false }>
            <MenuItem value={ this.props.profile.id } primaryText={ this.props.profile.display + ' (Self)' }/>
            {this.props.contacts.map((contact, i) => {
              return (
                contact.receiver_id !== this.props.profile.id && <MenuItem key={i + 1} value={ contact.receiver_id } primaryText={ contact.receiver.display }/>
              );
            })}
          </DropDownMenu>

          <form className="lote-form" ref="loteForm" onSubmit={ this.handleSubmit }>
            <div>
              <label className="lote-form-label">
                <TextField multiLine={true} rows={1} className="lote-form-input-message" ref="message" type="text" name="message" value={ this.state.message } onChange={ this.handleMessageChange } />
              </label>
            </div>
            <div>
              <Checkbox label='Location-Locked' checked={ this.state.lock } onCheck={ this.handleLockToggle } />
            </div>
            <div>
              <RaisedButton labelColor='white' backgroundColor='#0740C3' className="submitButton" label="Submit" onTouchTap={ this.handleSubmit }/>
            </div>
          </form>

          <MapContainer {...this.props} />
        </Card>
      </div>
    );
  }
}

export default NewLote;
