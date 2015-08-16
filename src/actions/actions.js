import * as db from '../utils/fireUtils.js';

export const SELECT_TOPIC = 'SELECT_TOPIC';
function selectTopic(topicId){
  return {
    type: SELECT_TOPIC,
    topicId
  };
}

export const SELECT_ORDER = 'SELECT_ORDER';
function selectOrder(order){
  return {
    type: SELECT_ORDER,
    order
  };
}

export const FETCH_TOPIC = 'FETCH_TOPIC';
function fetchTopic(topicId){
  return {
    type: FETCH_TOPIC,
    topicId
  };
}

export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export function requestTopic(topicId) {
  return {
    type: REQUEST_TOPIC,
    topicId
  };
}

export const HAS_REPLIES = 'HAS_REPLIES';
function hasReplies(topicId){
  return {
    type: HAS_REPLIES,
    topicId
  };
}

export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export function receiveTopic(topicId, topic){
  return {
    type: RECEIVE_TOPIC,
    topicId: topicId,
    topic: topic,
    receivedAt: Date.now()
  };
}

export const SYNC_REPLIES = 'SYNC_REPLIES';
function syncReplies(topicId){
  return {
    type: SYNC_REPLIES,
    topicId
  };
}

export const SYNC_REPLIES_BY_COUNT = 'SYNC_REPLIES_BY_COUNT';
function syncRepliesByCount(topicId){
  return {
    type: SYNC_REPLIES,
    topicId
  };
}


export const RECEIVE_REPLY = 'RECEIVE_REPLY';
function receiveReply(topicId, reply){
  return {
    type: RECEIVE_REPLY,
    topicId: topicId,
    reply: reply
  };
}

export const RECEIVE_REPLY_BY_COUNT = 'RECEIVE_REPLY_BY_COUNT';
function receiveReplyByCount(topicId, reply){
  return {
    type: RECEIVE_REPLY_BY_COUNT,
    topicId: topicId,
    reply: reply
  };
}

export function fetchTopicAndReplies(route){
  return dispatch => {

    let topicId = route.params[0],
        order = route.entry;

    dispatch(selectOrder(order));
    dispatch(selectTopic(topicId));
    dispatch(fetchTopic(topicId)); // request topic?

    db.fetch(['topic', topicId])
    .then(data => {
      dispatch(receiveTopic(topicId, data));
    });

    if(topicId === 'root'){
      //console.log('root so not checking if replies exist');
      dispatch(hasReplies(topicId));
    } else {
      db.exists(['replies', topicId])
      .then(()=>{
        dispatch(hasReplies(topicId));
      });
    }

    dispatch(syncReplies(topicId));
    db.sync(['replies', topicId], reply => {
      dispatch(receiveReply(topicId, reply));
    });
    dispatch(syncRepliesByCount);
    db.syncByOrder(['replies', topicId], 'count', reply => {
      dispatch(receiveReplyByCount(topicId, reply));
    });

  };
}

export const REQUEST_ADD_REPLY = 'REQUEST_ADD_REPLY';
function requestAddReply(topicId, reply){
  return {
    type: REQUEST_ADD_REPLY,
    topicId: topicId,
    reply: reply
  };
}

export function addReply(topicId, reply){
  return (dispatch, getState) => {
    dispatch(requestAddReply(topicId, reply));
    db.push(['topic'], reply)
    .then(newId => {
      db.set(['replies', topicId, newId], reply);
    });
  };
}


