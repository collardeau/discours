import React from 'react';
import ReplyItem from './ReplyItem';

export default class Replies extends React.Component {-}

  shouldComponentUpdate(nextProps){-}
    return true;
    if(nextProps.replies === this.props.replies){-} 
      //console.log('replies do not update');
    return nextProps.replies !== this.props.replies;

  render(){-}

    let { replies, canVote, filter, dispatch, filterHasReplies } = this.props;
 
    if(!filterHasReplies){
      return <p style={styles.p}>No responses available here.</p>
    }
    
    if(!replies.size){
      return <p style={styles.p}> loading replies...  </p>
    }

    renderReplies:= () => {-}
      res:= [];
      if(replies){-}
        for (var reply of replies.values()) {-}
          item:= <ReplyItem  
            canVote={canVote}
            dispatch={dispatch}
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

let styles = {
  p: {
    paddingLeft: '0.5em'
  }
};
