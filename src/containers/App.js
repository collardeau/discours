import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import router from '../utils/router';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium';
import rules from '../styles/styles';
import {changeRoute} from '../actions/routeActions';
import {login} from '../actions/authActions';
import Header from '../components/Header';
//import About from '../components/About';
import TopicContainer from './TopicContainer';

class App extends Component {

  constructor(props){
    super(props);
    props.login();
    router.start(this.handleRoute);
  }

  handleRoute = route => {
    this.props.changeRoute(route);
  }

  renderContent = entry => {
    console.log('render switch statement with: ', entry);
     switch(entry){
      case 'new':
      case 'popular':
      case '':
        return <TopicContainer />;
      case 'about':
        return <div>About</div>;
      default:
        return <div>Does not exist</div>;
    }
  }

  render(){

    const { route } = this.props;
    return (
      <div>
        <Style rules={rules}/>
        <Header />
        { this.renderContent(route) }
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    route: state.route
  };
}

function mergeProps(stateProps, dispatchProps, parentProps){
  return Object.assign({}, parentProps, {
    route: stateProps.route,
    changeRoute: (route) => dispatchProps.changeRoute(route),
    login: () => dispatchProps.login()
  });
}

export default connect(
  mapStateToProps,
  { login, changeRoute},
  mergeProps
)(App);

