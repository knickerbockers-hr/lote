import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <AppBar style={{ backgroundColor: '#48d09b' }} title={this.props.activePage} iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={ this.toggleDrawer }/>
        <Drawer
          docked={ false }
          width={ 300 }
          onRequestChange={ this.toggleDrawer }
          open={ this.state.open }
        >
          <AppBar style={{ backgroundColor: '#48d09b' }} title="Menu" onLeftIconButtonTouchTap={ this.toggleDrawer } />

          <MenuItem primaryText="Home" containerElement={ <Link className="nav-btn" to="/"/> } onTouchTap={ ()=>{ this.toggleDrawer(); } } />
          <MenuItem primaryText="Contacts" containerElement={ <Link className="nav-btn" to="/contacts"/> } onTouchTap={ ()=>{ this.toggleDrawer(); } } />
          <MenuItem primaryText="New Lote" containerElement={ <Link className="nav-btn" to="/lotes/new"/> } onTouchTap={ ()=>{ this.toggleDrawer(); } } />
          <MenuItem primaryText="My Profile" containerElement={ <Link className="nav-btn" to="/myprofile"/> } onTouchTap={ ()=>{ this.toggleDrawer(); } } />
        </Drawer>
      </div>
    );
  }
}

export default Nav;
