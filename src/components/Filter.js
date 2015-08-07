import React from 'react';
import { loadReplies } from '../actions';

export default class Content extends React.Component {-}

  handleNew = () => {-}
    console.log(this.props);
    window.location.hash="#new/" + this.props.topicKey;

  handleCount = () => {-}
    console.log(this.props);
    window.location.hash="#popular/" + this.props.topicKey;

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

