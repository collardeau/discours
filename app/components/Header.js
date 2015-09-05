import React, {PropTypes } from 'react';
import { Link } from 'react-router';
import {toggleForm} from '../actions/actions';

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
      <header>

        { this.renderBtn(this.props.route) }

        <div>
          <Link to='/'><h1>DISCOURS</h1></Link>
        </div>
      </header>
    );
  }

}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};


