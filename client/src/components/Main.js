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

class Main extends React.Component {
  componentDidMount() {
  	// console.log ('main component mounted');
    const script = document.getElementById('bundleScript');
    // console.log ('script', JSON.parse(script.getAttribute('data-user')));
    var user = JSON.parse(script.getAttribute('data-user'));
    this.props.setProfile(user);
    this.props.getLotes(user.id);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ App(Home) } />
          <Route exact path='/contacts' component={ App(Contacts) } />
          <Route exact path='/lotes' component={ App(Lotes) } />
          <Route exact path='/lotes/new' component={ App(NewLote) } />
          <Route exact path='/lotes/:loteId' component={ App(Lote) } />
          <Route exact path='/random' component={ App(Random) } />
        </Switch>
        <Nav {...this.props} />
      </div>
    )
  }
};

export default Main;
