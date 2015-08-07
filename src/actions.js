import fireUtils from './utils/fireact';
import hasher from 'hasher';

export function changeRoute(route) {-}

  return (dispatch, getState) => {-}

    params:= route.split('/');
    nextRoute:= params.shift();

    dispatch({-});
      type: 'CHANGE_ROUTE', 
      route: nextRoute

    if(getState().replies.size){-}
      fireUtils.unsync(getState().topic.key);
      dispatch({-});
        type: 'UNSYNC_REPLIES',

    if(nextRoute === 'new'){-}
      dispatch(loadTopic(params[0]));
      dispatch(loadReplies(params[0], 'new'));

    if(nextRoute === 'popular'){-}
      dispatch(loadTopic(params[0]));
      dispatch(loadReplies(params[0], 'count'));

export function loadTopic(topicId) {-}

  return (dispatch, getState) => {-}
    dispatch({-});
      type: 'LOAD_TOPIC_REQUEST',
      topicId 

    fireUtils.fetch('topic', topicId, data => {-});
      dispatch({-});
        type: 'LOAD_TOPIC_SUCCESS',
        topic: data 

export function loadReplies(topicKey, order) {-}

  return (dispatch, getState) => {-}

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



