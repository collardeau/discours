import React from 'react';
import ReplyItem from './ReplyItem';
import Filter from './Filter';

export default class Replies extends React.Component {-}

  componentDidMount(){-}
    boom.syncReplies(this.props.parentKey);

  componentWillUpdate(){-}
    console.log('will update'); 

  render(){-}
    replies:= () => {-}
      res:= [];
      for (var reply of this.props.replies.values()) {-}
        res.push(<ReplyItem reply={reply} key={reply.key} />);
      return res;

    return (
      <div>
        <Filter />
        <ul>{replies()}</ul>
      </div>
    );


