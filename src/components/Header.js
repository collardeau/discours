import React from 'react';
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
   return true;
  }

  handleHomeClick = () => {
    window.location.hash = "";
  }

  handleAboutClick = () => {
    window.location.hash = "about";
  }

  render() {

    let btn;
    if(this.props.route === 'about'){
      btn = <button onClick={this.handleHomeClick}>Home</button>;
    }else{
      btn = <button onClick={this.handleAboutClick}>About</button>;
    }

    return (
      <header style={styles.header}>
        { btn }
        <div style={styles.title}>
          <h1 onClick={this.handleHomeClick}>DISCOURS</h1>
        </div>
      </header>
    );
  }

}
