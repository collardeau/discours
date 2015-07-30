import React from 'react';
import hasher from 'hasher';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';

export default class AppContainer extends React.Component {-}

  componentDidMount(){-}
    hasher.changed.add(this.handleRoute);

  handleRoute = newRoute => {-}
    boom.routeAndRender(newRoute, this.props.appState);

  render(){-}
    return (
      <div> 
        <h1>Hello {this.props.appState.route}</h1>
        <a href="#bonjour">Bonjour</a>
        <a href="#root">Root</a>
      </div> 
    )

