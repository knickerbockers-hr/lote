import React from 'react';
import { Redirect } from 'react-router';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      contactCardStyle: {
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        marginTop: 5,
        padding: 5,
      },
    };
  }

  render() {
    return (
      <div>
        { !this.props.contacts ? <p>No Contacts Yet!</p>
          : this.props.contacts.map((contact, index) => {
            return (
              <div style={ this.state.contactCardStyle } key={ index } onClick={ () => this.props.selectContact(contact.receiver) }>
                { contact.receiver.display ? contact.receiver.display : contact.receiver.email }
              </div>
            );
          })
        }
      </div>
    );
  }
}

// need to handle redirect with click { <Redirect to='/lotes' /> }

export default List;
