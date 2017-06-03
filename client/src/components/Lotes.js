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
        <h1>Lotes</h1>
        {this.props.lotes.map((lote, i) => {
          return (<div style={lote.sender_id === this.props.profile.id ? this.state.senderStyle : this.state.receiverStyle} key={lote.id}>{lote.lote.message}</div>);
        })}
      </div>
    );
  }
}

export default Lotes;
