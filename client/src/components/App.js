import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    lotes: state.lotes,
    contacts: state.contacts,
    lotecation: state.lotecation,
    myInt: state.myInt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
