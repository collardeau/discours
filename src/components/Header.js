import React from 'react';

export default class Header extends React.Component {-}

  shouldComponentUpdate(newProps){-}
   return true;

  handleClick = () => {-}
    window.location.hash = "new/root"

  render() {-}
    return (
      <header style={styles.header}>
        <h1 onClick={this.handleClick}>DISCOURS</h1>
        <button>Reply</button>
      </header>
    );

styles:= {-}
  header: {-}
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#999',
    //marginBottom: '0.8em'
