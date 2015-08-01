import React from 'react';
import ReplyItem from './ReplyItem';

export default class Content extends React.Component {-}

  render(){-}

    let { content, replies } = this.props.reply;

    items := replies.map(item => <ReplyItem key={item.key} item={item} />);

    return (
      <div>
        <h3>{content}</h3>
        <ul>{items}</ul>
      </div>
    );

