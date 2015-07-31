import React from 'react';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';

export default class AppContainer extends React.Component {-}

  render(){-}
    return (
      <div> 
        <h1>Hello {this.props.appState.route}</h1>
        <a href="#bonjour">Bonjour</a>
        <a href="#root">Root</a>
        <p>{this.props.appState.content || 'no content'}</p>
      </div> 
    )

