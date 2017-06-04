import React from 'react';
import { Redirect } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Lotes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // senderStyle: {
      //   backgroundColor: '#ffff99',
      //   marginTop: 5,
      //   padding: 5,
      //   position: 'relative',
      //   margin: '5px 45px 5px 20px',
      //   float: 'left',
      //   clear: 'both'
      // },

      // receiverStyle: {
      //   backgroundColor: '#afd9e0',
      //   marginTop: 5,
      //   padding: 5,
      //   position: 'relative',
      //   margin: '5px 45px 5px 20px',
      //   float: 'right',
      //   clear: 'both'
      // },

      // 'senderStyle::before': {
      //   textAlign: 'center',
      //   content: '',
      //   position: 'absolute',
      //   width: 0,
      //   height: 0,
      //   left: -16,
      //   right: 'auto',
      //   top: 5,
      //   bottom: 'auto',
      //   border: '9.8px solid',
      //   borderColor: '#ffff99 #ffff99  transparent transparent'
      // },
      redirect: false

    },

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ redirect: true });
  }

  render() {
    let lotesDisplayCount = 0;
    return (
      <div>
        { this.state.redirect && <Redirect to='/lotes/new' /> }
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
                    return (<div className="senderStyle" key={lote.id}>{lote.lote.message}</div>);
                  }
                }
              })
              : this.props.lotes.map((lote, i) => {
                if (lote.sender_id === this.props.profile.id && lote.lotesReceived[0].receiver_id === this.props.profile.id) {
                  lotesDisplayCount++;
                  if (lote.sender_id === this.props.profile.id) {
                    return (<div className="senderStyle" key={lote.id}>{lote.lote.message}</div>);
                  } else {
                    return (<div className="receiverStyle" key={lote.id}>{lote.lote.message}</div>);
                  }
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
              <RaisedButton labelColor='white' backgroundColor='#48d09b' className="submitButton" label="Create New Lote" onTouchTap={ this.handleSubmit }/>
            </div>
          </form>
        }
        </div>
    </div>
    );
  }
}

export default Lotes;

// return (<div style={lote.sender_id === this.props.profile.id ? this.state.senderStyle : this.state.receiverStyle} key={lote.id}>{lote.lote.message}</div>);
