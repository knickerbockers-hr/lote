import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MapContainer from './MapContainer';
import { Card, CardMedia } from 'material-ui/Card';

class NewLote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lock: '',
      value: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeLockStatus = this.changeLockStatus.bind(this);
    this.handleDiffRecepient = this.handleDiffRecepient.bind(this);
  }

  handleDiffRecepient (event, index, value) {
    this.setState({value});
  }

  changeLockStatus(e) {
    this.setState({
      lock: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`/api/profiles/${this.props.profile.id}/lotes`, {
      senderId: this.props.profile.id,
      receiverId: this.props.profile.id,
      loteType: 'lotes_text',
      message: this.refs.message.value,
      lock: this.state.lock
    })
    .then((res) => {
      console.log (res);
    })
    .catch((err) => {
      console.log (err);
    });

    this.refs.loteForm.reset();
  }

  render() {
    return (

      <div className='newLoteContainer'>
        <h1>New Lote</h1>
        <Card>
          <CardMedia>
          <img src="https://images.unsplash.com/photo-1478809846154-d4ca173df3e0?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=slava-bowman-161206.jpg&s=9a7bc690d600510a68e231a1ac0b472b" width="20%" height="20%"/>
          </CardMedia>

          <DropDownMenu value={this.state.value} onChange={this.handleDiffRecepient} openImmediately={false}>
            <MenuItem value={0} primaryText="Self"/>
            {this.props.contacts.map((contact, i) => {
              return (
                <MenuItem key={i + 1} value={i + 1} primaryText={ contact }/>
              );
            })}
          </DropDownMenu>
          <form className="lote-form" ref="loteForm" onSubmit={this.handleSubmit}>
            <div>
              <label className="lote-form-label">
                <TextField multiLine={true} rows={1} className="lote-form-input-message" ref="message" type="text" name="message" />
              </label>
            </div>

              <label>

                <input type="radio" value="Unlocked" name="lock" onChange={this.changeLockStatus}/>
                  <span className="lockedStatus">
                    Unlocked
                  </span>
              </label>


              <label>
                <input type="radio" value="Locked" name="lock" onChange={this.changeLockStatus}/>
                  <span className="lockedStatus">
                    Locked
                  </span>
              </label>


              <label>
                <input type="radio" value="Trapped" name="lock" onChange={this.changeLockStatus}/>
                  <span className="lockedStatus">
                    Trapped
                  </span>
              </label>

            <div>
              <RaisedButton labelColor='white' backgroundColor='#0740C3' className="submitButton" label="Submit" onTouchTap={this.handleSubmit}/>
            </div>
          </form>
          <MapContainer {...this.props}/>
        </Card>
      </div>
    );
  }
}

export default NewLote;
