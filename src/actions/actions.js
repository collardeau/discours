import * as db from '../utils/fireUtils.js';
import moment from 'moment';

const voteTimeout = 3000;

export const ALLOW_VOTE = 'ALLOW_VOTE';
function allowVote(topicId){
  return {
    type: ALLOW_VOTE
  };
}

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

export const HAS_NO_REPLIES = 'HAS_NO_REPLIES';
function hasNoReplies(topicId){
  return {
    type: HAS_NO_REPLIES,
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

export const UNSYNC_ALL = 'UNSYNC_ALL';
function unsyncAll(topicId){
  return {
    type: UNSYNC_ALL,
    topicId
  };
}

export function unsync(topicId) {
  return dispatch => {
    dispatch(unsyncAll(topicId));    
    db.unsync(['replies', topicId]);
  };
}
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export function receiveTopic(topicId, topic){
  return {
    type: RECEIVE_TOPIC,
    topic,
    topicId
 };
}

export const RECEIVE_REPLY = 'RECEIVE_REPLY';
function receiveReply(topicId, reply){
  return {
    type: RECEIVE_REPLY,
    topic: reply,
    topicId: reply.topicId
  };
}

export const RECEIVE_REPLY_BY_ORDER = 'RECEIVE_REPLY_BY_ORDER';
function receiveReplyByOrder(topicId, reply){
  return {
    type: RECEIVE_REPLY_BY_ORDER,
    topic: reply,
    topicId: reply.topicId
  };
}


export const QUEUE_REPLY = 'QUEUE_REPLY';
function queueReply(topicId, reply){
  return {
    type: QUEUE_REPLY,
    topic: reply,
    topicId: reply.topicId
  };
}

export const UNQUEUE = 'UNQUEUE';
function unqueue(topicId) {
  return {
    type: UNQUEUE,
    topicId
  };
}

export function unqueueIfNeeded(topicId){
  return (dispatch, getState) => {
    const queue = getState().repliesByNew[topicId].queued;
    if(queue.length) {
      dispatch(unqueue(topicId));
    }
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

function checkIfNoReplies(topicId){
  return (dispatch, getState) => {
    // check the state first
    db.exists(['replies', topicId])
    .then(exists => {
      if(!exists){
      dispatch(hasNoReplies(topicId));
      }
    });
  };
}

function fetchTopicIfNeeded(topicId){
  // debugger;
  return (dispatch, getState) => {
    // if it doesn't exist or content doesn't exists or ref (parent) doesn't exist
    if(!getState().topics[topicId] || !getState().topics[topicId].content || !getState().topics[topicId].ref){
      db.fetch(['topic', topicId])
      .then(data => {
        dispatch(receiveTopic(topicId, data));
        let parentId = data.ref;
        if(parentId !== 'none' && !getState().topics[parentId]){
          db.fetch(['topic', parentId])
          .then(parentData => {
            dispatch(receiveTopic(parentId, parentData));
          });
        }
      });
    }
  };
}

function getReplies(state, order){
  if(order === 'popular') {
    return state.repliesByPopular; 
  }
  return state.repliesByNew;
}

export const REQUEST_REPLIES_BY_POPULAR = 'REQUEST_REPLIES_BY_POPULAR';
function requestRepliesByPopular(topicId){
  return {
    type: REQUEST_REPLIES_BY_POPULAR,
    topicId
  };
}

export const REQUEST_REPLIES_BY_NEW = 'REQUEST_REPLIES_BY_NEW';
function requestRepliesByNew(topicId){
  return {
    type: REQUEST_REPLIES_BY_NEW,
    topicId
  };
}


export const REORDER_POPULAR = 'REORDER_POPULAR';
function reorderPopular(topicId, votes){
  return {
    type: REORDER_POPULAR,
    topicId,
    votes
  };
}


export function fetchTopicAndReplies(order, topicId){
  return (dispatch, getState) => {

    setTimeout(() => {
      dispatch(allowVote());
    }, voteTimeout);

    const prevTopicId = getState().selectedTopic;
    const isSameTopic = topicId === prevTopicId;
    const now = Date.now();
    dispatch(selectOrder(order));

    if(!isSameTopic){

      dispatch(selectTopic(topicId));
      dispatch(checkIfNoReplies(topicId)); // if needed
      dispatch(requestTopic(topicId));
      dispatch(fetchTopicIfNeeded(topicId));
      // fetch topic parent if needed

      db.syncOnChange(['replies', topicId], data => { // also on change (votes)
        dispatch(receiveChangedReply(data.topicId, data));
      });

      const lastUpdated = getState().repliesByNew[topicId].lastUpdated;    

      if(!lastUpdated){ // cache?
        db.fetchUntil(['replies', topicId], now, reply => {
          dispatch(receiveReply(topicId, reply));
        });
  
        db.syncSince(['replies', topicId], now, reply => {
          dispatch(queueReply(topicId, reply));
        });
   
      }else{
        db.syncSince(['replies', topicId], lastUpdated + 1, reply => {
          dispatch(queueReply(topicId, reply));
        });
   
      }
 
    }

 
    if(order === 'popular'){
      //debugger;
      const popCach = now - ( 30 * 1000); //one minute
      const lastRequested = getState().repliesByPopular[topicId].lastRequested;
      //console.log('last pop updated: ', lastPopularUpdated);
      if(lastRequested < popCach ) {
        console.log('invalid cach');
        dispatch(requestRepliesByPopular(topicId));
        db.fetchByOrder(['replies', topicId], 5, 'count', reply => {
          dispatch(receiveReplyByOrder(topicId, reply));
        });
      }else{
        console.log('use cache, but reorder');
        dispatch(reorderPopular(topicId, getState().votes));
      }
    }


    //const replies = getReplies(getState(), order);
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
    reply.ref = topicId;
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
    const uid = db.getAuth().uid;
    db.setTime(['lastVote', uid]);
    setTimeout(() => {
      dispatch(allowVote());
    }, voteTimeout);
  };
}

export const TOGGLE_FORM = 'TOGGLE_FORM';
export function toggleForm(){
  return {
    type: TOGGLE_FORM
  };
}
