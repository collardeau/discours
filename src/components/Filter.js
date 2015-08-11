import React from 'react';

export default class Content extends React.Component {-}

  handleNew = () => {-}
    window.location.hash="new/" + this.props.topicKey;

  handleAllTime = () => {-}
    window.location.hash="all-time/" + this.props.topicKey;

  handleToday = () => {-}
    window.location.hash="today/" + this.props.topicKey;

  render(){-}

    byNew:= <a onClick={this.handleNew}>Newest</a>;
    byAllTime:= <a onClick={this.handleAllTime}>All-time</a>;
    byToday:= <a onClick={this.handleToday}>Today</a>;

    if(this.props.replyFilter==="new"){-}
      byNew = <b>{byNew}</b>      
    if(this.props.replyFilter==="all-time"){-}
      byAllTime = <b>{byAllTime}</b>      
    if(this.props.replyFilter==="today"){-}
      byToday = <b>{byToday}</b>      


    styles:= {-}
      ul: {-},
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        margin: 0
        //marginTop: '1.3em'
      li: {-}
        flex: 1,      
        lineHeight: '2.1em',
        textAlign: 'center',
        border: '1px solid'

    return (
        <ul style={styles.ul}>
          <li style={styles.li}>
            {byNew}
          </li>
         <li style={styles.li}>
            {byToday}
          </li>
          <li style={styles.li}>
            {byAllTime} 
          </li>
        </ul>
    );

