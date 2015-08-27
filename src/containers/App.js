import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import router from '../utils/router';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium';
import rules from '../styles/styles';
import {changeRoute} from '../actions/routeActions';
import {login} from '../actions/authActions';
import Header from '../components/Header';
import About from '../components/About';

class App extends Component {

  constructor(props){
    super(props);
    props.login();
  }

  render(){

    const { location, children } = this.props;
    const { pathname } = location;
    const route = pathname.substring(1);

    return (
      <div>
        <Style rules={rules}/>
        <Header route={route}/>
        { children }
      </div>

    );
  }
}

function mapStateToProps(state){
  return {};
}

function mergeProps(stateProps, dispatchProps, parentProps){
  return Object.assign({}, parentProps, {
    login: () => dispatchProps.login()
  });
}

export default connect(
  mapStateToProps,
  { login },
  mergeProps
)(App);

