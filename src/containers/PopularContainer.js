import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import ReplyItem from '../components/ReplyItem';
import { fetchPopularIfNeeded } from '../actions/actions';

function loadData(props) {
  const { fetchPopularIfNeeded, topicId } = props;
    fetchPopularIfNeeded(topicId); // could bind this topic id 
  }

class PopularContainer extends Component {

  componentDidMount(){
    loadData(this.props);
  }

  shouldComponentUpdate(nextProps){
    return true;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.topicId !== this.props.topicId){
      loadData(nextProps);
    }
  }

  render(){

    const { topicId, replies } = this.props;

    return (
      <ul> 
        { replies.map((reply, i) =>
           <ReplyItem
            key={reply.topicId}
            order='new'
            parentId={topicId}
            reply={reply}
          />
        )}
      </ul>
 
    );
  }
}

function mapStateToProps(state){
  const { repliesByPopular, topics, votes } = state;

  return {
    repliesByPopular,
    topics,
    votes
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const 
    { repliesByPopular, topics } = stateProps,
    topicId = parentProps.params.topicId || 'root';

  const replies = repliesByPopular[topicId] ? 
    repliesByPopular[topicId].view.map(tId => {
      return {topicId: tId, ...topics[tId] };
    }) : [];

  return Object.assign({}, parentProps, {
    fetchPopularIfNeeded: (topicId) => dispatchProps.fetchPopularIfNeeded(topicId),
    replies,
    topicId
  });
}

export default connect(
  mapStateToProps,
  {fetchPopularIfNeeded},
  mergeProps
)(PopularContainer);

