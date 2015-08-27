import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
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

  handleTab = tab => {
    // don't handle unqueue here
    const { order, topicId, unqueueIfNeeded } = this.props;
    if(tab === 'new'){
      unqueueIfNeeded(topicId);
    }
  }

  renderTab = (tab, tabName, last = false) => {

    const { order, topicId, queued } = this.props;

    let dyStyles = {
      tab: {
        backgroundColor: tab === order ? primary : light,
        borderRight: last ? '' : '1px solid'
      },
      queue: {
        display: queued > 0 && tab === 'new' ? 'inline' : 'none' 
      }
    };

    let path = '/';
    if (tab === 'new') { path = '/new/' + topicId; }
    if (tab === 'popular') { path = '/popular/' + topicId; }

    return (
      <li style={[styles.li, dyStyles.tab]}>
        <Link to={path}>{tabName} </Link>
        <span style={dyStyles.queue}> { this.props.queued }</span>
      </li>
    );
  }

  render(){

    return (
      <ul style={styles.ul}>
        {this.renderTab('new', 'New')}
        {this.renderTab('popular', 'Popular', true)}
      </ul>
    );
  }
}

//{this.renderTab('popular', 'Most Popular', true)}
Filter.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']),
  topicId: PropTypes.string.isRequired
};


