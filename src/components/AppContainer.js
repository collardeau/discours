import React from 'react';
import App from './App';
import actions from '../actions';

export default class AppContainer extends React.Component {-}

  state = {-}
    key: 'root',
    count: 0,
    content: '',
    replies: [{-}]
      content: '',
      count: 0,
      key: '',
      parentKey: ''

  componentDidMount(){-}
    actions.init(data => this.setState(data));
    actions.syncConvo(this.state.key);

  render(){-}
    return <App appState={this.state} />

