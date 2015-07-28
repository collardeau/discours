import React from 'react';
import App from './App';
import actions from '../actions';

export default class AppContainer extends React.Component {-}

  state = {-}
    parentKey: 'root',
    key: '',
    count: 0,
    content: '',
    replies: [{-}]
      content: '',
      count: 0,
      key: '',
      parentKey: ''

  componentDidMount(){-}
    actions.init(data => this.setState(data));
    actions.syncConvo(this.state.parentKey);

  render(){-}
    return <App appState={this.state} />

