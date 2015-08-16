import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import router from '../utils/router';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium';
import rules from '../styles/styles';
import {changeRoute} from '../actions/routeActions';
import {login} from '../actions/authActions';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import TopicContainer from './TopicContainer';

class App extends Component {

  constructor(props){
    super(props);
    router.start(this.handleRoute);
    props.login();
  }

  handleRoute = route => {
    let params = route.split('/');
    let nextRoute = {
      entry: params.shift(),
      params: params
    };
    this.props.changeRoute(nextRoute);
  }

  render(){

    console.log('app props', this.props);

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
  })
};

function mapStateToProps(state){
  return {
    route: state.route.entry ? state.route : { entry: 'new', params: []}
  };
}

function mergeProps(stateProps, dispatchProps, parentProps){
  return Object.assign({}, parentProps, {
    route: stateProps.route,
    changeRoute: (route) => dispatchProps.changeRoute(route),
    login: () => dispatchProps.login()
  });
}

export default connect(
  mapStateToProps,
  { login, changeRoute},
  mergeProps
)(App);

