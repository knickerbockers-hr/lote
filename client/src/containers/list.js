import React, { Component } from 'react'; 
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux'; 

//import the action/action creator to handle the items that you're listing
import { selectContact } from '../actions/index';
import { search } from '../actions/index'; 
import styles from '../css/styles';

class List extends Component {
  constructor(props) {
    super(props); 
    this.createListContacts = this.createListContacts.bind(this); 
  }

  createListContacts() {
    { console.log('PROPS IN LIST.JS: ', this.props.contacts)}

    if (!this.props.contacts) {
      return (
        <div>
          No Contacts Yet!
        </div>
      )
    }

    return this.props.contacts.map((contact, index) => {
      return (
        <li 

          key={ index }

          //contacts state is just an array of names
          //need to add another property if we need more information about the contact
          onClick={ () => this.props.selectContact(contact) }
        > { contact }
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul> 
          {this.createListContacts()}
        </ul>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
}; 

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectContact: selectContact }, dispatch); 
}

export default connect(mapStateToProps, mapDispatchToProps)(List); 