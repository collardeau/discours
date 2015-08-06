import fireUtils from './utils/fireact';

export function changeRoute(route) {-}

  return function (dispatch, getState) {-}

    dispatch({-});
      type: 'CHANGE_ROUTE', 
      route 

    if(getState().replies.size){-}
      console.log('route unsyncs replies');
      fireUtils.unsync(getState().topic.key);
      dispatch({-});
        type: 'UNSYNC_REPLIES',

export function loadTopic(topicId) {-}

  return function (dispatch, getState) {-}
    dispatch({-});
      type: 'LOAD_TOPIC_REQUEST',
      topicId 

    fireUtils.fetch('topic', topicId, data => {-});
      dispatch({-});
        type: 'LOAD_TOPIC_SUCCESS',
        topic: data 

export function loadReplies(topicKey, order) {-}

  return function (dispatch, getState) {-}


    dispatch({-});
      type: 'LOAD_REPLIES_REQUEST',
      topicKey 

    if(order === 'count') {-}
      fireUtils.syncByCount(topicKey, data => {-});
        dispatch({-});
          type: 'REPLY_ADDED',
          reply: data 
    else{-}
      fireUtils.sync(topicKey, data => {-});
        dispatch({-});
          type: 'REPLY_ADDED',
          reply: data 
      
    fireUtils.syncOnChange(topicKey, data => {-});
      dispatch({-});
        type: 'REPLY_CHANGED', // upvotes
        reply: data

export function reply(reply, topicKey){-}
  fireUtils.reply({-})
      content: reply,
      count: 0,
      topicKey

export function upvote(replyKey, topicKey){-}
  fireUtils.upvote(replyKey, topicKey);



