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
    const { order, topicId, unqueue } = this.props;
    if (tab === order) {
      unqueue(topicId);
    }
    else {
      window.location.hash = tab + '/' + topicId;
    }
  }

  renderTab = (tab, tabName, last = false) => {

    const { queued } = this.props;
    console.log(queued);

    let dyStyles = {
      tab: {
        backgroundColor: tab === this.props.order ? primary : light,
        borderRight: last ? '' : '1px solid'
      },
      queue: {
        display: queued > 0 ? 'inline' : 'none' 
      }
    };

    return (
      <li style={[styles.li, dyStyles.tab]}
        onClick= { () => this.handleTabClick(tab)}>
        {tabName} 
        <span style={dyStyles.queue}> { this.props.queued }</span>
      </li>
    );
  }

  render(){

    return (
      <ul style={styles.ul}>
        {this.renderTab('new', 'New')}
      </ul>
    );
  }
}

//{this.renderTab('popular', 'Most Popular', true)}
Filter.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']),
  topicId: PropTypes.string.isRequired
};


