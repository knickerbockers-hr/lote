import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import App from './App';
import Home from './Home';
import Contacts from './Contacts';
import Lotes from './Lotes';
import NewLote from './NewLote';
import Lote from './Lote';
import Random from './Random';
//import MapContainer from './MapContainer.jsx';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.Home = () => <Home {...this.props} />;
    this.Contacts = () => <Contacts {...this.props} />;
    this.Lotes = () => <Lotes {...this.props} />;
    this.NewLote = () => <NewLote {...this.props} />;
    this.Lote = () => <Lote {...this.props} />;
    this.Random = () => <Random {...this.props} />;
  }

  componentDidMount() {
    // console.log ('main component mounted');
    const script = document.getElementById('bundleScript');
    // console.log ('script', JSON.parse(script.getAttribute('data-user')));
    var user = JSON.parse(script.getAttribute('data-user'));
    this.props.setProfile(user);
    this.props.getLotes(user.id);
    this.props.getContacts(user.id);
  }

  render() {
    return (
      <div>
        <Nav {...this.props} />
        <Switch>
          <Route exact path='/' render={ this.Home } />
          <Route exact path='/contacts' render={ this.Contacts } />
          <Route exact path='/lotes' render={ this.Lotes } />
          <Route exact path='/lotes/new' render={ this.NewLote } />
          <Route exact path='/lotes/:loteId' render={ this.Lote } />
          <Route exact path='/random' render={ this.Random } />
        </Switch>
      </div>
    );
  }
}

export default Main;
