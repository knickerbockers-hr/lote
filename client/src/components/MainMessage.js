import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionLote from '../actions/actionLote';
import Message from './Message';
import Location from './Location';

function mapStateToProps(state) {
  return {
    lote: state.lote
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionLote, dispatch);
}

const MainMessage = connect(mapStateToProps, mapDispatchToProps)()
//not sure what's supposed to go into the parentheses-- is it all the way to Location?
//last child component?

export default App;

// import React from 'react';
// import Message from './Message';
// import Location from './Location';
// import $ from 'jquery';


// class MainMessage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lote: '',
//       loteExists: false,
//       sender_id: '123',
//       lote_type: 'text',
//       lote_id: '1',
//       location_id: '321',
//       radius: '5',
//       lock: 'true'
//     };

//     this.loteHandler = this.loteHandler.bind(this);
//   }

//   loteHandler(data) {
//     this.setState({
//       lote: data.lote,
//       loteExists: data.loteExists
//     });
//     if (this.state.loteExists) {
//       $.ajax({
//         method: 'POST',
//         url: '/sendLote',
//         dataType: 'json',
//         data: {lote: this.state.lote, sender_id: this.state.sender_id, lote_type: this.state.lote_type, lote_id: this.state.lote_id, location_id: this.state.location_id, radius: this.state.radius, lock: this.state.lock},
//         success: (data) => {
//           console.log('success!');
//         }
//       });
//     }
//   }



//   render() {
//     return (
//       <div className="MainMessage">
//       <Message loteHandler={this.loteHandler}/>
//       <Location/>
//       </div>
//     );
//   }
// }

// export default MainMessage;
