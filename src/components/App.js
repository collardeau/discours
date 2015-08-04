import React from 'react';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';
import ReplyContainer from './ReplyContainer'
import Header from './Header';
//import Nav from './Nav';

export default class App extends React.Component {-}

  render(){-}

    let {route, reply, replies}= this.props.appState

    ui:= <ReplyContainer reply={reply} replies={replies} />
    if(route === 'bonjour') {-}
      ui = <div>Well, Bonjour... et bienvenue!</div>

    return (
      <div>
        <Header />
        {route}
       { ui }
      </div>
    );

