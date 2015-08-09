import React from 'react';
import { loadReplies } from '../actions';

export default class Content extends React.Component {-}

  handleNew = () => {-}
    window.location.hash="#new/" + this.props.topicKey;

  handleCount = () => {-}
    window.location.hash="#popular/" + this.props.topicKey;

  handleToday = () => {-}
    window.location.hash="#popular/" + this.props.topicKey + '/today';

  render(){-}

    styles:= {-};
      ul: {-},
        display: 'flex'
      li: {-}
        marginRight: 5

    byNew:= <a onClick={this.handleNew}>New</a>;
    byPopular:= <a onClick={this.handleCount}>Ever</a>;
    if(this.props.route==="new"){-}
      byNew = <b>{byNew}</b>      
    if(this.props.route==="popular"){-}
      byPopular = <b>{byPopular}</b>      

    return (
      <div>
        <ul style={styles.ul}>
          <li style={styles.li}>
            {byNew}
          </li>
        </ul>
        <p>By popularity:</p>
        <ul>
          <li style={styles.li}>
            {byPopular} 
          </li>
          <li>
            <a onClick={this.handleToday}>Today</a>
          </li>
        </ul>
      </div>
    );

