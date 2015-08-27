import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium';
import rules from '../styles/styles';
import {login} from '../actions/authActions';
import Header from '../components/Header';
import About from '../components/About';

function getRoute(props){
    return props.location.pathname.substring(1);
}

class App extends Component {

  constructor(props){
    super(props);
    props.login();
  }

  render(){

    const route = getRoute(this.props);

    return (
      <div>
        <Style rules={rules}/>
        <Header route={route}/>
        { this.props.children }
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

