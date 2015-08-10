import React, { Component } from 'react';
import ReplyContainer from './ReplyContainer'
import Header from './Header';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium'
import rules from '../styles/styles';

export default class App extends Component {-}

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
        <Style rules={rules}/>
        <Header/>
        { ui }
      </div>
    );

