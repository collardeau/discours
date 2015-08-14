import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import hasher from 'hasher';
import {login, changeRoute} from '../actions/actions';

class App extends Component {

  constructor(props){
    super(props);
    hasher.init();
    hasher.initialized.add(this.handleRoute);
    hasher.changed.add(this.handleRoute);
  }

  componentDidMount(){
    //console.log('App mounts');
    this.props.dispatch(login());
  }

  handleRoute = route => {
    let params = route.split('/');
    let nextRoute = {
      entry: params.shift(),
      params: params
    };
    this.props.dispatch(changeRoute(nextRoute));
  }

  render(){
    return (
      <div>Look here, a brand new app</div>
    );
  }

}

let select = state => {
  return {
    route: state.route
  };
};

export default connect(select)(App);

