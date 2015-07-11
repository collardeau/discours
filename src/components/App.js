import React from 'react';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
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
    };
  }

  render(){

    return (
      <div>
        <h1>Hello, world</h1>
        <p>{ this.state.content}</p>
      </div>
    );
  }
}

