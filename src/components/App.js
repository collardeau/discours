import React from 'react';
import hasher from 'hasher';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';

export default class AppContainer extends React.Component {-}

  componentDidMount(){-}
    hasher.changed.add(this.handleRoute);
    //boom.syncReplyAndRender(this.props.appState.route, this.props.appState);
    boom.sync(this.props.appState);

  handleRoute = newRoute => {-}
    boom.change(this.props.appState, {route: newRoute});

  render(){-}
    return (
      <div> 
        <h1>Hello {this.props.appState.route}</h1>
        <a href="#bonjour">Bonjour</a>
        <a href="#root">Root</a>
        <p>{this.props.appState.content || 'no content'}</p>
      </div> 
    )

