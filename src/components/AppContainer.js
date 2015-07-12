import React from 'react';
import Header from './Header';
import Content from './Content';

import css from '../styles/styles.css';

let styles = {
  container: {
    backgroundColor: 'lightBlue',
    width: '80%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  header: { flex: 1 },
  nav: { flex: 1 },
  content: { flex: 1}
};

export default class App extends React.Component {

  state = {
    ancestor: 'root',
    content: 'Who will win?',
    res: [{
      content: 'Federer',
      count: '5',
      ref: 'some id'
    }, {
      content: 'Djokovic',
      count: '4',
      ref: 'some id'
    }]
  }

  static change = (data) => this.setState(data);

  render(){

    return (
      <div style={styles.container}>
        <Header style={styles.header}>Convos</Header>
        <nav style={styles.nav}>Navigation</nav>
        <Content style={styles.content} appState={this.state} change={this.change}></Content>
        <footer style={styles.header}>Footer</footer>
      </div>
    );
  }
}

