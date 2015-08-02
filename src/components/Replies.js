import React from 'react';
import ReplyItem from './ReplyItem';
import Filter from './Filter';

export default class Content extends React.Component {-}

  render(){-}

    let { content, replies } = this.props.reply;

    items := replies.map(item => <ReplyItem key={item.key} item={item} />);

    return (
      <div>
        <Filter />
        <ul>{items}</ul>
      </div>
    );

