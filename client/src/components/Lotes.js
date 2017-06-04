import React from 'react';
import { Redirect } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Lotes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      senderStyle: {
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        marginTop: 5,
        padding: 5,
      },
      receiverStyle: {
        backgroundColor: 'pink',
        borderRadius: 5,
        marginTop: 5,
        padding: 5,
      },
      redirect: false
    };

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

        { this.props.lotes.map((lote, i) => {
          if (lote.sender_id === this.props.activeContact.id || lote.lotesReceived[0].receiver_id === this.props.activeContact.id) {
            lotesDisplayCount++;
            return (<div style={lote.sender_id === this.props.profile.id ? this.state.senderStyle : this.state.receiverStyle} key={lote.id}>{lote.lote.message}</div>);
          }
        })}
        { lotesDisplayCount === 0 && <div>No Lote History</div> }

        { this.props.activeContact.email &&
          <form className="lote-message-form" ref="loteMessageForm" onSubmit={ this.handleSubmit }>
            <div>
              <label>
                <TextField multiLine={true} rows={1} className="lote-form-input-message" ref="message" type="text" name="message" onChange={ (event) => this.props.setActiveMessage(event.target.value) } />
              </label>
              <RaisedButton labelColor='white' backgroundColor='#0740C3' className="submitButton" label="Submit" onTouchTap={ this.handleSubmit }/>
            </div>
          </form>
        }
      </div>
    );
  }
}

export default Lotes;
