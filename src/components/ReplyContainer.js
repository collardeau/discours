import React, { Component } from 'react';
import { connect } from 'react-redux';
import Replies from './Replies';
import ReplyForm from './ReplyForm';
import Filter from './Filter';
import Topic from './Topic';
import {loadTopic, setFilter, loadReplies } from '../actions';

class ReplyContainer extends Component {-}

  componentDidMount(){-}
    let {entry, params } = this.props.route
    this.props.dispatch(loadTopic(params[0]));
    this.props.dispatch(loadReplies(params[0], entry));
   //dispatch(setFilter(filter));

   componentWillUnmount(){-}
      console.log('reply container is unmounting');

  render(){-}

    topic:= this.props.topic;
    topicKey:= topic.get('key');

    form:= <ReplyForm topic={topic} />; 

    return (
      <div> 
        <Topic topic={topic} replyFilter={this.props.replyFilter}/>
        { form }
        <Filter topicKey={topicKey} replyFilter={this.props.replyFilter}/>
        <Replies 
          replies={this.props.replies} 
          topicKey={topicKey}
          replyFilter={this.props.replyFilter}
        />        
     </div> 
    );

select:= state => {-}
  return {-}
    topic: state.topic,
    replyFilter: state.replyFilter,
    key: state.route.params[0],
    replies: state.replies,
    route: state.route

export default connect(select)(ReplyContainer);
