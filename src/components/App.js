import React from 'react';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';
import ReplyContainer from './ReplyContainer'
import Header from './Header';

export default class App extends React.Component {-}

  componentDidMount(){-}
    //boom.syncReply(this.props.appState.route);

  shouldComponentUpdate(){-}
    //console.log('should app component update');
    return true;

  render(){-}

    let {route, reply}= this.props.appState

    let ui;

    if(route === 'bonjour') {-}
      ui = <div>Well, Bonjour... et bienvenue!</div>
    else {-}
      ui =<ReplyContainer reply={reply}replyKey={route}/>

    ui = <div>Well, bonjour... et bienvenues!</div>
    console.log(route);
    return (
      <div>
        <Header title={route}></Header>
        <a href="#root">Root</a>
        <a href="#bonjour">Bonjour</a><br />
        { ui }
      </div>
    );

