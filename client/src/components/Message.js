import React from 'react';

// class Message extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loteMessage: '',
//       loteExists: false
//     };

//     this.message = this.message.bind(this);
//     this.submitMessage = this.submitMessage.bind(this);
//   }

//   message(e) {
//     this.setState({
//       loteMessage: e.target.value,
//       loteExists: true
//     });
//   }

//   submitMessage() {
//     if (this.state.loteExists) {
//       this.props.loteHandler({lote: this.state.loteMessage, loteExists: this.state.loteExists});
//     }
//   }

Message extends
  render() {
    return (
      <div className="Message">
        <h1>Type a Lote</h1>
        <textarea className="loteMessage" onChange={this.message} name="Text1" cols="40" rows="5"></textarea>
        <div><button type="submit" onClick={this.submitMessage}>Submit Lote</button></div>
      </div>
    );
  }
}

export default Message;
