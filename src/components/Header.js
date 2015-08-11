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
        <button onClick={this.handleToggle}>Reply</button>
      </header>
    );

styles:= {-}
  header: {-}
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#999',
    //marginBottom: '0.8em'
