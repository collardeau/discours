import fireUtils from './utils/fireact';

export function changeRoute(route){
  console.log('change route action');
  return { type: 'CHANGE_ROUTE', route }
}

export function loadTopic(topicId) {
  // Interpreted by the thunk middleware:
  return function (dispatch, getState) {
    //let { posts } = getState();
    //if (posts[userId]) {
      // There is cached data! Don't do anything.
      //return;
    //}

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


