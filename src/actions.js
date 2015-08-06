import fireUtils from './utils/fireact';

export function changeRoute(route){
  return { type: 'CHANGE_ROUTE', route }
}

export function loadTopic(topicId) {
  // Interpreted by the thunk middleware:
  return function (dispatch, getState) {
    dispatch({
      type: 'LOAD_TOPIC_REQUEST',
      topicId 
    });

    fireUtils.fetch('topic', topicId, data => {
      dispatch({
        type: 'LOAD_TOPIC_SUCCESS',
        topic: data 
      });
    });
  }
}

export function loadReplies(topicId) {
  return function (dispatch, getState) {
    dispatch({
      type: 'LOAD_REPLIES_REQUEST',
      topicId 
    });

    fireUtils.sync(topicId, data => {
      dispatch({
        type: 'REPLY_ADDED',
        reply: data 
      });
    });

    fireUtils.syncOnChange(topicId, data => {
      dispatch({
        type: 'REPLY_CHANGED',
        reply: data
      })
    })
  }
}




