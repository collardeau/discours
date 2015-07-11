import React from 'react';
import Header from './Header';
import Content from './Content';

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

  change = (data) => this.setState(data);

  handleClick = (data) => {
    this.change({content: 'hello my friend'});
    console.log('change state');
  }

  render(){

    let styles = {
      container: {
        backgroundColor: 'lightBlue',
        width: '80%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }
    };

    return (
      <div style={styles.container}>
        <Header>Convos</Header>
        <Content appState={this.state} change={this.change}></Content>
        <button onClick={this.handleClick}>Hit me</button>
      </div>
    );
  }
}

