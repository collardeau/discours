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

export const SYNC_ADD = 'SYNC_ADD';
function syncAdd(topicId){
  return {
    type: SYNC_ADD,
    topicId
  };
}

export const SYNC_CHANGE = 'SYNC_CHANGE';
function syncChange(topicId){
  return {
    type: SYNC_CHANGE,
    topicId
  };
}

export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export function receiveTopic(topicId, topic){
  return {
    type: RECEIVE_TOPIC,
    topic: {
      content: topic.content,
      parentTopic: topic.ref
    },
    topicId
 };
}


export const RECEIVE_REPLY = 'RECEIVE_REPLY';
function receiveReply(topicId, reply){
  return {
    type: RECEIVE_REPLY,
    topic: {
      content: reply.content,
      count: reply.count,
      parentTopic: reply.ref
    },
    topicId: reply.topicId
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

export const RECEIVE_CHANGED_REPLY = 'RECEIVE_CHANGED_REPLY';
function receiveChangedReply(topicId, reply){
  return {
    type: RECEIVE_CHANGED_REPLY,
    topic: {
      count: reply.count
    },
    topicId
  };
}

export function fetchTopicAndReplies(order, topicId){
  return (dispatch, getState) => {

    dispatch(selectTopic(topicId));
    dispatch(selectOrder(order));

    if(!getState().topics[topicId]){
      dispatch(requestTopic(topicId));
      db.fetch(['topic', topicId])
      .then(data => {
        dispatch(receiveTopic(topicId, data));
      });
    }
    
    //if(topicId === 'root'){
      //dispatch(hasReplies(topicId));
      //} else {
      //db.exists(['replies', topicId])
      //.then(()=>{
        //dispatch(hasReplies(topicId));
      //});
    //}

    dispatch(syncAdd(topicId));
    db.sync(['replies', topicId], reply => {
      dispatch(receiveReply(topicId, reply));
    });

    dispatch(syncChange(topicId));
    db.syncOnChange(['replies', topicId], data => {
      dispatch(receiveChangedReply(data.topicId, data));
    });

    //dispatch(syncRepliesByCount);
    //db.syncByOrder(['replies', topicId], 'count', reply => {
      //dispatch(receiveReplyByCount(topicId, reply));
    //});

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
      reply.count = 0;
      db.set(['replies', topicId, newId], reply);
    });
  };
}

export const REQUEST_UPVOTE = 'REQUEST_UPVOTE';
function requestUpvote(topicId, reply){
  return {
    type: REQUEST_UPVOTE,
    topicId: topicId
  };
}

export function upvote(topicId, parentId){
  return dispatch => {
    dispatch(requestUpvote(topicId));
    db.increment(['replies', parentId, topicId, 'count']);
  };
}
