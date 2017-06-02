import React from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';

class NewLote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lock: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeLockStatus = this.changeLockStatus.bind(this);
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
          <form className="lote-form" ref="loteForm" onSubmit={this.handleSubmit}>
            <div>
              <label className="lote-form-label">
                Recipient:
                <input type="text" name="message" value="self" disabled/>
              </label>
            </div>
            <div>
              <label className="lote-form-label">
                Message:
                <input className="lote-form-input-message" ref="message" type="text" name="message" />
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
            <input type="submit" value="Submit" />
          </form>
          <MapContainer {...this.props}/>
      </div>
    );
  }
}

export default NewLote;
