import React from 'react';

class MyProfile extends React.Component {

  componentWillMount() {
    this.props.setActivePage('My Profile');
  }

  render() {
    const user = this.props.profile;
    return (
      <div>
        <div className="page-header text-right">
          <a href="/logout" className="btn btn-default btn-sm">Logout</a>
        </div>
        <div className="col-sm-6">
          <div className="well">
            <h3><span className="fa fa-user"></span> Local</h3>
            <p>
              <strong>display name</strong>: {user.display}<br></br>
              <strong>id</strong>: {user.id}<br></br>
              <strong>email</strong>: {user.email}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfile;
