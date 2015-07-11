import React from 'react';

export default class Header extends React.Component {

  render(){

    let styles = {
      title: {
        textAlign: 'left'
      }
    };

    let { content, res } = this.props.appState;

    return (
      <main style={styles.title}>
        <h3>{content}</h3>
        <p>{res[0].content}</p>
      </main>
    );
  }
}

