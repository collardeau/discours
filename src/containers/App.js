import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import router from '../utils/router';
import normalize from 'normalize.css/normalize.css';
import Radium, { Style } from 'radium';
import rules from '../styles/styles';
import {changeRoute} from '../actions/routeActions';
import {login} from '../actions/authActions';
import Header from '../components/Header';
import About from '../components/About';
import TopicContainer from './TopicContainer';

class App extends Component {

  constructor(props){
    super(props);
    //router.start(this.handleRoute);
    //props.login();
  }

  componentDidMount(){
    //router.start(this.handleRoute);
    //this.props.login();
  } 

  handleRoute = route => {
    this.props.changeRoute(route);
  }

  renderContent = entry => {
    console.log('render switch statement with: ', entry);
    switch(entry){
      case 'new':
      case 'popular':
      //case '':
        return <TopicContainer />;
      case 'about':
      case '':
        return <About />;
      default:
        return <div>Does not exist</div>;
    }
  }

  render(){

    //console.log('rendering App');
    //console.log(this.props);
    const { route } = this.props;
    //console.log('route in App Container :', route);
    return (
      <div>
        <Style rules={rules}/>
        Hello my good friend, how awesome is this
        <Header route={route}/>
      </div>

    );
  }
}

function mapStateToProps(state){
  //console.log('map state top props');
  //console.log(state);
  return {
    route: state.route
  };
}

function mergeProps(stateProps, dispatchProps, parentProps){
  return Object.assign({}, parentProps, {
    route: stateProps.route, // blank when should be about
    changeRoute: (route) => dispatchProps.changeRoute(route),
    login: () => dispatchProps.login()
  });
}

export default connect(
  mapStateToProps,
  { login, changeRoute},
  mergeProps
)(App);

