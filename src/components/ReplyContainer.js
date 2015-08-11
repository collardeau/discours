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

  componentWillReceiveProps(nextProps){-}
    if(nextProps.route !== this.props.route){-}
      let { entry, params } = nextProps.route;
      if(params[0] !== this.props.route.params[0]){-}
        this.props.dispatch(loadTopic(params[0]))
      this.props.dispatch(loadReplies(params[0], entry));

  render(){-}

    let {topic, route, replies } = this.props;
    let {entry, params } = route;

    form:= <ReplyForm topic={topic} />; 

    return (
      <div> 
        <Topic topic={topic} filter={entry}/>
        { form }
        <Filter topicKey={params[0]} filter={entry}/>
        <Replies 
          replies={replies} 
          topicKey={params[0]}
          filter={entry}
        />        
     </div> 
    );

select:= state => {-}
  return {-}
    topic: state.topic,
    replies: state.replies,
    route: state.route

export default connect(select)(ReplyContainer);
