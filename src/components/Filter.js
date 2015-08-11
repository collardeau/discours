import React from 'react';

export default class Content extends React.Component {-}

  handleNew = () => {-}
    window.location.hash="new/" + this.props.topicKey;

  handleAllTime = () => {-}
    window.location.hash="all-time/" + this.props.topicKey;

  handleToday = () => {-}
    window.location.hash="today/" + this.props.topicKey;

  render(){-}

    filter:= this.props.filter;

    return (
        <ul style={styles.ul}>
          <li style={styles.li}>
            <a onClick={this.handleNew}>Newest</a>
            { filter === 'new' ? ' *' : ''}
          </li>
         <li style={styles.li}>
            <a onClick={this.handleAllTime}>All-time</a>
            { filter === 'all-time' ? ' *' : ''}
          </li>
          <li style={styles.li}>
            <a onClick={this.handleToday}>Today</a>
            { filter === 'today' ? ' *' : ''}
          </li>
        </ul>
    );

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


