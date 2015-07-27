import React from 'react';
import App from './App';
import actions from '../actions';

export default class AppContainer extends React.Component {-}

  state = {-}
    ancestor: '',
    content: '',
    replies: [{-}]
      content: '',
      count: '',
      key: ''

  componentDidMount(){-}
    actions.syncConvo('root', data => {-});
      this.setState(data);

  change = (data) => {-}

  render(){-}
    return <App appState={this.state} />

