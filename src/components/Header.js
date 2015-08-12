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
        <button>Menu</button>
        <div style={styles.title}>
          <h1 onClick={this.handleHomeClick}>DISCOURS</h1>
        </div>
      </header>
    );

styles:= {-}
  header: {-},
    backgroundColor: '#999',
    height: '3.4em',
    display: 'flex',
  title: {-},
    lineHeight: '3.4em',
    marginLeft: '0.5em'
