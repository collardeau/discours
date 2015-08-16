import React, {Component, PropTypes} from 'react';
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
export default class Filter extends Component {

  handleTabClick = tab => {
    window.location.hash = tab + '/' + this.props.topicId;
  }

  renderTab = (tab, tabName, last = false) => {
    let li = {
      backgroundColor: tab === this.props.order ? primary : light,
      borderRight: last ? '' : '1px solid'
    };

    return (
      <li style={[styles.li, li]}
        onClick= { () => this.handleTabClick(tab)}>
        {tabName}
      </li>
    );
  }
  render(){

    console.log( 'filter has props: ', this.props);

    return (
      <ul>
        {this.renderTab('new', 'New')}
        {this.renderTab('popular', 'Most Popular', true)}
      </ul>
    );
  }
}

Filter.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']),
  topicId: PropTypes.string.isRequired
};


