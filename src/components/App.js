import React from 'react';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';
import ReplyContainer from './ReplyContainer'
import Header from './Header';

export default class App extends React.Component {-}

  render(){-}

    let {route, reply}= this.props.appState

    ui:= <ReplyContainer reply={reply} />
    if(route === 'bonjour') {-}
      ui = <div>Well, Bonjour... et bienvenue!</div>

    return (
      <div>
        <Header title={route}></Header>
        <a href="#root">Root</a> <a href="#bonjour">Bonjour</a><br />
        { ui }
      </div>
    );

