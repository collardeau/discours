import React from 'react';
import Header from './Header';
import Content from './Content';
import actions from '../actions';

export default class App extends React.Component {-}
  
  render(){-}

    let { appState } = this.props;

    return (
      <div>
        <Header>Convos {this.props.appState.route}</Header>
        <Content appState={appState.retort}></Content>
      </div>
    );

