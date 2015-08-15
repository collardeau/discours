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
    console.log('app props: ', this.props);
    return (
      <div>
        <br />Look here, a brand new app
      </div>

    );
  }
}

App.propTypes = {
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired
  })

};

function mapStateToProps(state){
  const { selectedTopic, topics, replies } = state;
  return {
    topic: topics[selectedTopic] || {content: 'no content'},
    replies: replies[selectedTopic] ?
      replies[selectedTopic].map(tId => topics[tId]) : []
  };
}

export default connect(mapStateToProps)(App);

