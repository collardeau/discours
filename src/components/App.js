import React from 'react';

export default class App extends React.Component {

  state = {
    ancestor: 'root',
    content: 'Who will win?',
    resp: [{
      content: 'Federer',
      count: '5',
      ref: 'some id'
    }, {
      content: 'Djokovic',
      count: '4',
      ref: 'some id'
    }]
  }

  handleClick = () => {
    this.change({content: 'mofo'});
  }

  change = (data) => {
    this.setState(data);
  }

  render(){

    return (
      <div>
        <h1>Hello, world</h1>
        <p>{ this.state.content}</p>
        <button onClick={this.handleClick}>Hit me</button>
      </div>
    );
  }
}

