import React from 'react';

class Main extends React.Component {
  render() {
    const user = this.props.profile;
    return (
      <div>
        <div className="page-header text-center">
            <h1><span className="fa fa-anchor"></span> Profile Page</h1>
            <a href="/" className="btn btn-default btn-sm">Home page</a>
            <a href="/logout" className="btn btn-default btn-sm">Logout</a>
        </div>

        <div className="row">

            <div className="col-sm-6">
                <div className="well">
                    <h3><span className="fa fa-user"></span> Local</h3>

                    <p>
                        <strong>display name</strong>: {user.display}<br></br>
                        <strong>id</strong>: {user.id}<br></br>
                        <strong>email</strong>: {user.email}
                    </p>

                    <a href="/unlink/local" className="btn btn-default">Unlink</a>

                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Main;
