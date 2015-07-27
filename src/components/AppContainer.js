import React from 'react';
import App from './App';

export default class AppContainer extends React.Component {-}

  state = {-}
    ancestor: 'root',
    content: 'Who was more popular, Sampras or Agassi?',
    replies: [{
      content: 'Agassi was more charismatic',
      count: '5',
      key: '002'
    }, {
      content: 'Sampras was a servebot',
      count: '4',
      key: '001'
    }]

  static change = (data) => this.setState(data);

  render(){-}
    return <App appState={this.state} change={this.change} />

