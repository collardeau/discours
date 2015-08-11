import React from 'react';
import {toggleForm} from '../actions';

export default class Header extends React.Component {-}

  shouldComponentUpdate(newProps){-}
   return true;

  handleHomeClick = () => {-}
    window.location.hash = "new/root"

  handleToggle = () => {-}
    toggleForm();

  render() {-}
    return (
      <header style={styles.header}>
        <h1 onClick={this.handleHomeClick}>DISCOURS</h1>
      </header>
    );

styles:= {-}
  header: {-}
    backgroundColor: '#999',
    height: '3.4em',
    lineHeight: '3.4em',
    padding: '0 0.5em'
    //marginBottom: '0.8em'
