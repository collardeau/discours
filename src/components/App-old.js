import React from 'react';
import Header from './Header';
import Content from './Content';
import actions from '../actions';

export default class App extends React.Component {-}
  
  componentDidMount(){-}
    console.log('app did mount');

  componentWillUnmount(){-}
    console.log('app will unmount');

  shouldComponentUpdate(nextProps, nextState){-}
    console.log('should app update');
    console.log(nextProps === this.props)
    return true;

  render(){-}

    let { appState } = this.props;

    return (
      <div>
        <Header>Convos {this.props.appState.route}</Header>
        <Content appState={appState.retort}></Content>
      </div>
    );

