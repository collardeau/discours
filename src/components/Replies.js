import React from 'react';
import ReplyItem from './ReplyItem';
import Filter from './Filter';

export default class Replies extends React.Component {-}

  componentWillMount(){-}
    boom.syncReplies(this.props.reply.key);

  componentWillReceiveProps(){-}
    console.log('replies will receive props');

  render(){-}

    //let { content, replies } = this.props.reply;

    //items := replies.map(item => <ReplyItem key={item.key} item={item} />);
    items:= <li>Item</li>

    return (
      <div>
        <Filter />
        <ul>{items}</ul>
      </div>
    );

Replies.defaultProps = {-}
  replies: ['loading...']

Replies.propTypes = {-}
  replies: React.PropTypes.array.isRequired
