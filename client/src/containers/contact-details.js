import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

class ContactDetail extends Component {
  render() {
    if (!this.props.contacts) {
      return (<h4>Add Some Contacts</h4>)
    }

    return (
      <div>
        <h2>{ this.props.contacts }</h2>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    contact: state.activeContact
  }
}; 

export default connect(mapStateToProps)(ContactDetail);  