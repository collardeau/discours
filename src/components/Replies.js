import React from 'react';
import ReplyItem from './ReplyItem';
import Filter from './Filter';

export default class Replies extends React.Component {-}

  componentWillMount(){-}
    boom.syncReplies(this.props.parentKey);

  render(){-}

    replies := this.props.replies.map(reply => <ReplyItem reply={reply} key={reply.key} />);

    return (
      <div>
        <Filter />
        <ul>{replies}</ul>
      </div>
    );

Replies.defaultProps = {-}
  replies: []

Replies.propTypes = {-}
  replies: React.PropTypes.array.isRequired
