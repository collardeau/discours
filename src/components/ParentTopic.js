import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Radium from 'radium';
import {light, white} from '../styles/theme';

let styles = {
 parentTopic: {
    marginBottom: '0.8em',
    display: 'none'
  }
};

function loadData(props) {
    const { fetchTopicIfNeeded, parentId } = props;
    fetchTopicIfNeeded(parentId);
  }

@Radium
class ParentTopic extends Component {

  componentDidMount(){
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.parentId !== this.props.parentId){
      loadData(nextProps);
     }
   }

  shouldComponentUpdate(nextProps){
    return true;
  }

  handleClick = () => {
    const { router } = this.context;
    const { order, parentId } = this.props;
    router.transitionTo('/' + order + '/' + parentId );    
  }

  render(){

    const { content } = this.props;
    if (!content){
      return <div></div>;
    }

    return (
      <div style={styles.topic}>
        <small onClick={this.handleClick}>
          In response to: { content }
        </small>
     </div>
    );
  }
}

ParentTopic.contextTypes = {
  router: PropTypes.object.isRequired
};

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
)(ParentTopic);

