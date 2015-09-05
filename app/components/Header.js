import React, {PropTypes } from 'react';
import { Link } from 'react-router';
import {toggleForm} from '../actions/actions';
import styles from '../styles/header.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
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
        <button styleName='btn' onClick = { () => this.handleBack() }>
          Back 
        </button>
      );
    }
    
    return (
     <button styleName='btn' onClick={() => this.handleAbout()}>
        About          
      </button>
    );
  }

  render() {

    return (
      <header styleName='header'>

        { this.renderBtn(this.props.route) }

        <div styleName='title'>
          <Link to='/'>
            <h1 styleName='h1'>DISCOURS</h1>
          </Link>
        </div>
      </header>
    );
  }

}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};


