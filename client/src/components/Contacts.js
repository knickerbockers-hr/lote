import React from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux'; 
import { search, selectContact } from '../actions'; 
import List from '../containers/list';
//import Search from './search';
import NewContact from './NewContact';
import ContactDetail from '../containers/contact-details';
import styles from '../css/styles';

class Contacts extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      contacts: []
    };
    this.addContact = this.addContact.bind(this); 
  }

  addContact(input) {
    let contacts = this.state.contacts.slice();
    contacts.push(input); 
    
    this.setState({
      contacts: contacts
    });
  }

  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <NewContact
          input={ this.state.input }
          addContact={ this.addContact }
        />
        <ContactDetail
          //input={ this.state.input }
          search={ this.search }
        />
         <List
          contacts={ this.state.contacts }
        />
      </div>
    );
  }
}

export default Contacts;
