import React from 'react';

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
      }
    };
  }

  render() {
    return (
      <div>
        <h1>{ this.props.activeContact.display }</h1>
        {console.log('PROPS IN LOTE.JS', this.props)}

        {this.props.lotes.map((lote, i) => {
          if (lote.sender_id === this.props.activeContact.id || lote.lotesReceived[0].receiver_id === this.props.activeContact.id) {
            return (<div style={lote.sender_id === this.props.profile.id ? this.state.senderStyle : this.state.receiverStyle} key={lote.id}>{lote.lote.message}</div>);
          }
        })}
      </div>
    );
  }
}

export default Lotes;
