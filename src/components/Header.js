import React from 'react';
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
   return true;
  }

  render() {

    const { order } = this.props.params;
    console.log(order); // the condition isn't working

    return (
      <header style={styles.header}>
        <button>

          { order ? 
            <Link to='/'>Home</Link> : 
            <Link to='/about'> About</Link> 
          }

        </button>

        <div style={styles.title}>
          <Link to='/'><h1>DISCOURS</h1></Link>
        </div>
      </header>
    );
  }

}
