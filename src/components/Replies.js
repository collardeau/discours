import React from 'react';
import ReplyItem from './ReplyItem';
import Filter from './Filter';

export default class Replies extends React.Component {-}

  componentDidMount(){-}
    //boom.syncReplies(this.props.parentKey);

  render(){-}
    replies:= () => {-}
      res:= [];
      for (var reply of this.props.replies.values()) {-}
        res.push(<ReplyItem reply={reply} key={reply.key} />);
      return res;

    return (
      <div>
        <Filter parentKey={this.props.parentKey}/>
        <ul>{replies()}</ul>
      </div>
    );


