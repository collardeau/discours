import React from 'react';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';
import ReplyContainer from './ReplyContainer'
import Header from './Header';
import Nav from './Nav';

export default class App extends React.Component {-}

  render(){-}

    //console.log(this.props);

    //let {route, topic, replies}= this.props.appState

    //ui:= <ReplyContainer topic={topic} replies={replies} />
    ui:= <div>Well, Bonjour... et bienvenue!</div>

    return (
      <div>
        { this.props.appState.route }
        { this.props.appState.topic.content }
       { ui }
      </div>
    );

