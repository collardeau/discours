import React from 'react';
import ReplyItem from './ReplyItem';

export default class Replies extends React.Component {-}

  shouldComponentUpdate(nextProps){-}
    //return true;
    if(nextProps.replies === this.props.replies){-} 
      //console.log('replies do not update');
    return nextProps.replies !== this.props.replies;

  render(){-}

    if(!this.props.replies.size){-}
        return <p> ... No Data...</p>

    renderReplies:= () => {-}
      res:= [];
      if(this.props.replies){-}
        filter:= this.props.filter;
        for (var reply of this.props.replies.values()) {-}
          item:= <ReplyItem  
            key={reply.key} 
            reply={reply} 
            filter={filter}
          />

          if(filter==='today'){-}
            res.push(item);
          else{-}
            res.unshift(item);

      return res;

    return (
      <div>
       <ul>{renderReplies()}</ul>
      </div>
    );


