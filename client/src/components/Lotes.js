import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Place from 'material-ui-icons/Place';
import Moment from 'moment';
import io from 'socket.io-client';

class Lotes extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.setActivePage('Lotes');
  }

  handleClick(loteId) {
    this.props.history.push(`/lotes/${ loteId }`);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/lotes/new');
  }

  render() {
    let lotesDisplayCount = 0;
    return (
      <div className="chatContainer" id="chat">
        <h1>
          { this.props.activeContact.display ? this.props.activeContact.display : this.props.activeContact.email }
          { !this.props.activeContact.email && 'No Contact Selected'}
        </h1>
        <div className="chat">

          { (this.props.activeContact.id !== this.props.profile.id)
              ? this.props.lotes.map((lote, i) => {

                if (lote.sender_id === this.props.activeContact.id || lote.lotesReceived[0].receiver_id === this.props.activeContact.id) {
                  lotesDisplayCount++;

                  if (lote.sender_id === this.props.profile.id) {
                    return (
                      <div className="senderStyle" key={ lote.id } onClick={ () => this.handleClick(lote.id) }>
                        <div className="loteMessage">{ lote.lote.message }</div>
                        <div className="loteTimeStamp">sent { Moment(lote.created_at).fromNow() }</div>
                        <Place />
                      </div>
                    );
                  } else if (lote.lotesReceived[0].receiver_id === this.props.profile.id) {
                    return (
                      <div className="receiverStyle" key={ lote.id } onClick={ () => this.handleClick(lote.id) }>
                        <div className="loteMessage">{ lote.lote.message }</div>
                        <div className="loteTimeStamp">sent { Moment(lote.created_at).fromNow() }</div>
                        <Place />
                      </div>
                    );
                  }
                }

              })
              : this.props.lotes.map((lote, i) => {
                if (lote.sender_id === this.props.profile.id && lote.lotesReceived[0].receiver_id === this.props.profile.id) {
                  lotesDisplayCount++;
                  return (
                    <div className="senderStyle" key={ lote.id } onClick={ () => this.handleClick(lote.id) }>
                      <div className="loteMessage">{ lote.lote.message }</div>
                      <div className="loteTimeStamp">sent { Moment(lote.created_at).fromNow() }</div>
                      <Place />
                    </div>
                  );
                }
              })
          }
        </div>
        { lotesDisplayCount === 0 && <div>No Lote History</div> }
        <div>
        { this.props.activeContact.email &&
          <form className="lote-message-form" ref="loteMessageForm" onSubmit={ this.handleSubmit }>
            <div>
              <label>
                <TextField multiLine={true} rows={1} className="lote-form-input-message" ref="message" type="text" name="message" onChange={ (event) => this.props.setActiveMessage(event.target.value) } />
              </label>
              <RaisedButton labelColor='#ffffff' backgroundColor='#48d09b' className="submitButton" label="Create New Lote" onTouchTap={ this.handleSubmit }/>
            </div>
          </form>
        }
        </div>
    </div>
    );
  }
}

export default Lotes;
