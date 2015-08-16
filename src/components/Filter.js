import React, {findDOMNode, Component} from 'react';
import Radium from 'radium';
import {light, primary} from '../styles/theme';

let styles = {
  ul: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    borderTop: '1px solid',
    borderBottom: '1px solid'
  },
  li: {
    flex: 1,
    lineHeight: '2.1em',
    textAlign: 'center'
  }
};

@Radium
export default class Content extends Component {

  renderTab = (filter, filterName, last = false) => {
    let li = {
      backgroundColor: filter === this.props.filter ? primary : light,
      borderRight: last ? '' : '1px solid'
    };

    return (
      <li style={[styles.li, li]}>
        {filterName}
      </li>
    );
  }
  render(){

    return (
      <ul>
        {this.renderTab('new', 'New')}
        {this.renderTab('all-time', 'Most Popular', true)}
      </ul>
    );
  }
}


