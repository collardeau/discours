import React, { Component } from 'react';
import { connect } from 'react-redux';
import Replies from './Replies';
import ReplyForm from './ReplyForm';
import Filter from './Filter';
import Topic from './Topic';
import {loadTopic, setFilter, loadReplies } from '../actions/appActions';

class ReplyContainer extends Component {-}

  componentDidMount(){-}
    let {entry, params } = this.props.route
    this.props.dispatch(loadTopic(params[0]));
    this.props.dispatch(loadReplies(params[0], entry));

  componentWillReceiveProps(nextProps){-}
    if(nextProps.route !== this.props.route){-}
      let { entry, params } = nextProps.route;
      this.props.dispatch(loadReplies(params[0], entry));
      if(params[0] !== this.props.route.params[0]){-}
        this.props.dispatch(loadTopic(params[0]))

  render(){-}

    let {canVote, topic, route, replies, formIsOpen, dispatch, isLoading, filterHasReplies } = this.props;
    let {entry, params } = route;

    form:= <ReplyForm topic={topic} />; 

    return (
      <div> 
        <Topic 
          dispatch={dispatch}
          filter={entry}
          formIsOpen={formIsOpen}
          topic={topic} 
        />
        { formIsOpen===true ? form : '' }
        <Filter topicKey={params[0]} filter={entry}/>
        <Replies 
          canVote={canVote}
          dispatch={dispatch}
          filter={entry}
          filterHasReplies={filterHasReplies}
          isLoading={isLoading}
          replies={replies} 
          topicKey={params[0]}
        />        
     </div> 
    );

select:= state => {-}
  return {-}
    topic: state.topic,
    replies: state.replies,
    route: state.route,
    formIsOpen: state.formIsOpen,
    isLoading: state.isLoading,
    canVote: state.canVote,
    filterHasReplies: state.filterHasReplies

export default connect(select)(ReplyContainer);
