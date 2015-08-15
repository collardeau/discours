import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import router from '../utils/router';
import {changeRoute} from '../actions/routeActions';
import {login} from '../actions/authActions';

class App extends Component {

  constructor(props){
    super(props);
    //props.dispatch(login());
    router.start(this.handleRoute);
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
  route: PropTypes.shape({
    entry: PropTypes.string.isRequired,
    params: PropTypes.array.isRequired
  })

};

function mapStateToProps(state){
  return {
    route: state.route || { entry: 'new', params: []}
  };
}

export default connect(mapStateToProps)(App);

