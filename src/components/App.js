import React from 'react';
import Header from './Header';
import Content from './Content';
import normalize from 'normalize.css/normalize.css';
import css from '../styles/styles.css';

export default class App extends React.Component {-}

  render(){-}

    let { appState, change } = this.props;

    return (
      <div>
        <Header>Convos</Header>
        <Content appState={appState}></Content>
      </div>
    );

