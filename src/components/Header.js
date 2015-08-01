import React from 'react';

export default class Header extends React.Component {-}

  shouldComponentUpdate(newProps){-}
    if(!boom.lastLog.route) {-}
      console.log('not updating header');
      return false;
    return true;

  render() {-}

    return (
      <header>
        <h1>{ this.props.title}</h1>
      </header>
    );

