import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import ParentTopic from '../components/ParentTopic';

function loadData(props) {
    const { fetchTopicIfNeeded, parentId } = props;
    fetchTopicIfNeeded(parentId);
  }

class ParentTopicContainer extends Component {

  componentDidMount(){
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.parentId !== this.props.parentId){
      loadData(nextProps);
     }
   }

  shouldComponentUpdate(nextProps){
    return nextProps.content !== this.props.content; 
  }

  render(){

    if (!this.props.content){
      return <div></div>;
    }

    return (
      <ParentTopic {...this.props } />
    );

  }
}

function mapStateToProps(state){
  return {
    topics: state.topics
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const 
    { topics } = stateProps,
    { order, parentId } = parentProps;

  return Object.assign({}, parentProps, {
    fetchTopicIfNeeded: (topicId) => parentProps.fetchTopicIfNeeded(topicId),
    content: topics[parentId] ? topics[parentId].content : ''
  });
}

export default connect(
  mapStateToProps,
  {},
  mergeProps
)(ParentTopicContainer);

