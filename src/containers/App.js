import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import hasher from 'hasher';
import {changeRoute} from '../actions/routeActions';
import {login} from '../actions/authActions';

class App extends Component {

  constructor(props){
    super(props);
    //props.dispatch(login());
    hasher.init();
    hasher.initialized.add(this.handleRoute);
    hasher.changed.add(this.handleRoute);
  }

  componentDidMount(){
    //this.props.dispatch(login());
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
      <div>
        { this.props.content }
        <br />Look here, a brand new app
      </div>

    );
  }
}

let select = state => {
  return {
    route: state.route
  };
};

function mapStateToProps(state){
  const { selectedTopic, topics } = state;
  return {
    topic: topics[selectedTopic]
  };
}

export default connect(mapStateToProps)(App);

