import React from 'react';

export default class Header extends React.Component {

  render(){

    let styles = {
      title: {
        textAlign: 'center'
      }
    };

    return (
      <header style={styles.title}>
        <h1>{ this.props.children}</h1>
      </header>
    );
  }
}

