import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';




class NewLote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lock: '',
      value: 1
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

      <div>
        <h1>New Lote</h1>
        <DropDownMenu value={this.state.value} onChange={this.handleDiffRecepient} openImmediately={false}>
          <MenuItem value={1} primaryText="Self"/>
          <MenuItem value={2} primaryText="Ed"/>
          <MenuItem value={3} primaryText="Alana"/>
          <MenuItem value={4} primaryText="Connor"/>
        </DropDownMenu>
          <form className="lote-form" ref="loteForm" onSubmit={this.handleSubmit}>
            <div>
              <label className="lote-form-label">
                Recipient:
                <input type="text" name="message" value="self" disabled/>
              </label>
            </div>
            <div>
              <label className="lote-form-label">
                <TextField floatingLabelText="Message" className="lote-form-input-message" ref="message" type="text" name="message" />
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Unlocked" name="lock" onChange={this.changeLockStatus}/>
                Unlocked
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Locked" name="lock" onChange={this.changeLockStatus}/>
                Locked
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Trapped" name="lock" onChange={this.changeLockStatus}/>
                Trapped
              </label>
            </div>
            <div>
              <RaisedButton primary={true} label="Submit" onTouchTap={this.handleSubmit}></RaisedButton>
            </div>
          </form>
      </div>
    );
  }
}

export default NewLote;
