import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <Link className="nav-btn" to="/">Home</Link>
        <Link className="nav-btn" to="/contacts">Contacts</Link>
        <Link className="nav-btn" to="/lotes">Lotes</Link>
        <Link className="nav-btn" to="/lotes/new">New Lote</Link>
        <a className="nav-btn" href="/profile">My Profile</a>
        <Link className="nav-btn" to="/random">Random</Link>
      </div>
    );
  }
}

export default Nav;
