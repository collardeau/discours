import React from 'react';

export default class Content extends React.Component {-}

  handleNew = () => {-}
    window.location.hash="new/" + this.props.topicKey;

  handleAllTime = () => {-}
    window.location.hash="all-time/" + this.props.topicKey;

  handleToday = () => {-}
    window.location.hash="today/" + this.props.topicKey;

  render(){-}

    byNew:= <a onClick={this.handleNew}>New</a>;
    byAllTime:= <a onClick={this.handleAllTime}>All-time</a>;
    byToday:= <a onClick={this.handleToday}>Today</a>;

    if(this.props.replyFilter==="new"){-}
      byNew = <b>{byNew}</b>      
    if(this.props.replyFilter==="all-time"){-}
      byAllTime = <b>{byAllTime}</b>      
    if(this.props.replyFilter==="today"){-}
      byToday = <b>{byToday}</b>      

    return (
      <div>
        <p>view by</p>
        <ul>
          <li>
            {byNew}
          </li>
          <li>
            {byAllTime} 
          </li>
          <li>
            {byToday}
          </li>
        </ul>
      </div>
    );

