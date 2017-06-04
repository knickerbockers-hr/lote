import React from 'react';
import axios from 'axios';
import styles from '../css/styles';

class NewContact extends React.Component {

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`/api/profiles/${this.props.profile.id}/contacts`, {
      senderId: this.props.profile.id,
      receiverEmail: this.refs.receiverEmail.value
    })
    .then((res) => {
      this.props.getContacts(this.props.profile.id);
      console.log (res);
    })
    .catch((err) => {
      console.log (err);
    });

    this.refs.contactForm.reset();
  }

  render() {
    return (
      <div>
        <form className="newContactForm" ref="contactForm" onSubmit={ this.handleSubmit.bind(this) }>
          <label>New Contact:
            <input className="newContactInput" ref="receiverEmail" placeholder="Enter email address" />
          </label>
        </form>
      </div>
    );
  }
}

export default NewContact;
