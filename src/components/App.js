import React, { Component } from 'react';
import normalize from 'normalize.css/normalize.css';
//import css from '../styles/styles.css';
import ReplyContainer from './ReplyContainer'
import Header from './Header';
import Nav from './Nav';
import {logout} from '../actions';

export default class App extends Component {-}

  componentWillUnmount(){-}
    console.log('will unmount');
    logout();    

  handleLogout(){-}
    console.log('handle logout');
    logout();

  render(){-}

    let {route, replyFilter, topic, replies, uid}= this.props.appState

    ui:= <ReplyContainer 
      topic={topic} 
      replies={replies} 
      replyFilter={replyFilter}
    />;

    if ( route === 'about') {-}
      ui:= <div>Well, Bonjour... et bienvenue!</div>;

    return (
      <div>
        <Header/>
        <Nav />
        { ui }
      </div>
    );

