import React from 'react';
import {toggleForm} from '../actions/actions';
import {primary} from '../styles/theme';

export default class Header extends React.Component {-}

  shouldComponentUpdate(newProps){-}
   return true;

  handleHomeClick = () => {-}
    window.location.hash = ""

  handleMenuClick = () => {-}
    window.location.hash = "about"


  handleToggle = () => {-}
    toggleForm();

  render() {-}
    return (
      <header style={styles.header}>
        <button onClick={this.handleMenuClick}>Menu</button>
        <div style={styles.title}>
          <h1 onClick={this.handleHomeClick}>DISCOURS</h1>
        </div>
      </header>
    );

styles:= {-}
  header: {-},
    backgroundColor: primary,
    height: '3.4em',
    display: 'flex',
  title: {-},
    lineHeight: '3.4em',
    marginLeft: '0.5em'
