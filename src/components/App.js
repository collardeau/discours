import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReplyContainer from './ReplyContainer'
import Header from './Header';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium';
import rules from '../styles/styles';
import hasher from 'hasher';
import {login, changeRoute } from '../actions';

class App extends Component {-}

  constructor(props){-}
    super(props);
    this.props.dispatch(login());  
    hasher.init();
    hasher.initialized.add(this.handleRoute);
    hasher.changed.add(this.handleRoute);

  handleRoute= route => {-}
    params:= route.split('/');
    nextRoute:={-}
      entry: params.shift(),
      params: params
    this.props.dispatch(changeRoute(nextRoute));
 
  render(){-}

    let {route, uid}= this.props;

    ui:= <ReplyContainer />;

    if ( route.entry === 'about') {-}
      ui:= <div>Well, Bonjour... et bienvenue!</div>;

    return (
      <div>
        <Style rules={rules}/>
        <Header/>
        { ui }
      </div>
    );

select:= state => {-}
  return {-}
    route: state.route,
    uid: state.uid

export default connect(select)(App);
