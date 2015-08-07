import React from 'react';
import { loadReplies } from '../actions';

export default class Content extends React.Component {-}

  handleNew = () => {-}
    console.log('order by newest');
    // not working
    loadReplies(this.props.topicKey, 'new');

  handleCount = () => {-}
    console.log('order by most popular ');
    // not working
    loadReplies(this.props.topicKey, 'count');
  render(){-}

    styles:= {-}
      ul: {-},
        display: 'flex'
      li: {-}
        marginRight: 5

    return (
      <ul style={styles.ul}>
        <li style={styles.li} onClick={this.handleNew}>
          By New / 
        </li>
        <li onClick={this.handleCount}> By Vote </li>
      </ul>
    );

