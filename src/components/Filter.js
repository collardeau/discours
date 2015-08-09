import React from 'react';
import { loadReplies } from '../actions';

export default class Content extends React.Component {-}

  handleNew = () => {-}
    window.location.hash="#new/" + this.props.topicKey;

  handleCount = () => {-}
    window.location.hash="#all-time/" + this.props.topicKey;

  handleToday = () => {-}
    window.location.hash="#today/" + this.props.topicKey;

  render(){-}

    styles:= {-};
      ul: {-},
        display: 'flex'
      li: {-}
        marginRight: 5

    byNew:= <a onClick={this.handleNew}>New</a>;
    byAllTime:= <a onClick={this.handleCount}>All-time</a>;
    byToday:= <a onClick={this.handleToday}>Today</a>;

    if(this.props.replyFilter==="new"){-}
      byNew = <b>{byNew}</b>      
    if(this.props.replyFilter==="all-time"){-}
      byAllTime = <b>{byAllTime}</b>      
    if(this.props.replyFilter==="today"){-}
      byToday = <b>{byToday}</b>      

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
            {byAllTime} 
          </li>
          <li>
            {byToday}
          </li>
        </ul>
      </div>
    );

