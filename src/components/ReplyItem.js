import React from 'react';

export default class Item extends React.Component {-}

  handleVoteClick = () => {-}
    boom.upvote(this.props.reply.key, this.props.reply.parentKey);

  render(){-}

    let { reply } = this.props;

    styles:= {-}
      li: {-}
        height: 50,

    return (
      <li style={styles.li}>
        <a href={'#' + reply.key}>{ reply.content }</a>
        - <b>{reply.count}</b> votes
        <button onClick={this.handleVoteClick}>Up</button>
      </li>
    );

