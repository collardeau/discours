import fireUtils from './utils/fireact';

export function changeRoute(route) {-}
  return { type: 'CHANGE_ROUTE', route }

export function loadTopic(topicId) {-}

  return function (dispatch, getState) {-}
    dispatch({-});
      type: 'LOAD_TOPIC_REQUEST',
      topicId 

    fireUtils.fetch('topic', topicId, data => {-});
      dispatch({-});
        type: 'LOAD_TOPIC_SUCCESS',
        topic: data 

export function loadReplies(topicKey) {-}

  return function (dispatch, getState) {-}
    dispatch({-});
      type: 'LOAD_REPLIES_REQUEST',
      topicKey 

    fireUtils.sync(topicKey, data => {-});
      dispatch({-});
        type: 'REPLY_ADDED',
        reply: data 

    fireUtils.syncOnChange(topicKey, data => {-});
      dispatch({-});
        type: 'REPLY_CHANGED', // upvote
        reply: data

export function reply(reply, topicKey){-}
  fireUtils.reply({-})
      content: reply,
      count: 0,
      topicKey

export function upvote(replyKey, topicKey){-}
  fireUtils.upvote(replyKey, topicKey);



