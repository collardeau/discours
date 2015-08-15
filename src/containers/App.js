import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import router from '../utils/router';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium';
import rules from '../styles/styles';
import {changeRoute} from '../actions/routeActions';
import {login} from '../actions/authActions';
import Header from '../components/Header';
import TopicContainer from './TopicContainer';

class App extends Component {

  constructor(props){
    super(props);
    //props.dispatch(login());
    router.start(this.handleRoute);
  }

  handleRoute = route => {
    let params = route.split('/');
    let nextRoute = {
      entry: params.shift(),
      params: params
    };
    this.props.dispatch(changeRoute(nextRoute));
  }

  render(){

    const { route } = this.props;
    let ui = <TopicContainer />;

    if (route.entry === 'about') {
      ui = <div>Welcome to the new app with new powers!</div>;
    }

    return (
      <div>
        <Style rules={rules}/>
        <Header />
        {ui}
      </div>

    );
  }
}

App.propTypes = {
  route: PropTypes.shape({
    entry: PropTypes.string.isRequired,
    params: PropTypes.array.isRequired
  }),
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    route: state.route.entry ? state.route : { entry: 'new', params: []}
  };
}

export default connect(mapStateToProps)(App);

