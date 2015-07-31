import React from 'react';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';
import ReplyContainer from './ReplyContainer'

export default class App extends React.Component {-}

  componentDidMount(){-}
    //boom.syncReply(this.props.appState.route);

  render(){-}

    let {route, reply}= this.props.appState

    let ui;

    if(route === 'bonjour') {-}
      ui = <div>Bonjour!</div>
    else {-}
      ui =<ReplyContainer reply={reply}replyKey={route}/>

    return (
      <div>
        <h1>On: {route}</h1>
        <a href="#bonjour">Bonjour</a>
        <a href="#root">Root</a>
        { ui }
      </div>
    );

