import React, {PropTypes } from 'react';
import { Link } from 'react-router';
import {toggleForm} from '../actions/actions';
import {primary} from '../styles/theme';

let styles = {
  header: {
    backgroundColor: primary,
    height: '3.4em',
    display: 'flex'
  },
  title: {
    lineHeight: '3.4em',
    marginLeft: '0.5em'
  }
};

export default class Header extends React.Component {

  shouldComponentUpdate(newProps){
    return newProps.route !== this.props.route;
  }

  handleAbout = () => {
    const { router } = this.context;
    router.transitionTo('/about');    
  }

  handleBack = () => {

    const { router } = this.context;
    router.goBack();
 
  }

  renderBtn = name => {

    if(name === 'about'){
      return (
        <button onClick = { () => this.handleBack() }>
          Back 
        </button>
      );
    }
    
    return (
     <button onClick={() => this.handleAbout()}>
        About          
      </button>
    );
  }

  render() {

    return (
      <header style={styles.header}>

        { this.renderBtn(this.props.route) }

        <div style={styles.title}>
          <Link to='/'><h1>DISCOURS</h1></Link>
        </div>
      </header>
    );
  }

}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};


