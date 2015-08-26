import * as db from '../utils/fireUtils.js';
import moment from 'moment';

export const ALLOW_VOTE = 'ALLOW_VOTE';
function allowVote(topicId){
  return {
    type: ALLOW_VOTE
  };
}

export function allowVoteLater(time){
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(allowVote());
    }, time); 
  };
}


export const ALLOW_POST = 'ALLOW_POST';
function allowPost(topicId){
  return {
    type: ALLOW_POST
  };
}

export function allowPostLater(time){
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(allowPost());
    }, time); 
  };
}

export const CLEAR_WARNING = 'CLEAR_WARNING';
export function clearWarning(){
  return {
    type: CLEAR_WARNING
  };
}

export const SET_WARNING = 'SET_WARNING';
function setWarning(warning){
  return {
    type: SET_WARNING,
    warning
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
    db.unsync(['votes', topicId]);
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
    parentId: topicId,
    topic: reply,
    topicId: reply.topicId
  };
}

export const RECEIVE_ORDER_BY_COUNT = 'RECEIVE_ORDER_BY_COUNT';
function receiveOrderByCount(topicId, data){
  return {
    type: RECEIVE_ORDER_BY_COUNT,
    parentId: topicId,
    topic: data,
    topicId: data.topicId
  };
}


export const QUEUE_REPLY = 'QUEUE_REPLY';
function queueReply(topicId, reply){
  return {
    type: QUEUE_REPLY,
    parentId: reply.ref,
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
  return (dispatch, getState) => { // check the state first
    db.exists(['replies', topicId])
    .then(exists => {
      if(!exists){
        dispatch(hasNoReplies(topicId));
      }
    });
  };
}

function stateHasTopic(topicId, topics){
  if(topics[topicId] && topics[topicId].content) {
    return topics[topicId];
  }
  return null;
}

function fetchParentIfNeeded(topicId){
  return (dispatch, getState) => {

    const parentId = topicId.ref;
    if( parentId === 'none') { return; }
    const parentTopic = stateHasTopic(parentId, getState().topics);

    if(!parentTopic){
      dispatch(requestTopic(parentId));
      db.fetch(['topic', parentId])
      .then(topic => {
        dispatch(receiveTopic(parentId, topic));
       });
     }
  };
}

function fetchTopicAndParentIfNeeded(topicId){
  return (dispatch, getState) => {
    console.log('fetching topic and parent if needed');
    let topics = getState().topics;
    let localTopic = stateHasTopic(topicId, topics);
    let parentId, parentTopic;

    if(!localTopic){ //async
      db.fetch(['topic', topicId])
      .then(topic => {
        dispatch(requestTopic(topicId));
        dispatch(receiveTopic(topicId, topic));
        dispatch(fetchParentIfNeeded(topic));
      });
    }else{
        dispatch(fetchParentIfNeeded(topicId));
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

export const RECEIVE_VOTE_COUNT = 'RECEIVE_VOTE_COUNT';
function receiveVoteCount(topicId, votes){
  return {
    type: RECEIVE_VOTE_COUNT,
    topicId,
    votes
  };
}

export function requestVoteCount(parentId, topicId){
  return (dispatch, getState) => {
    db.fetch(['votes', parentId, topicId]).then(data => {
      const count = data ? data.count : 0; 
      dispatch(receiveVoteCount(topicId, count));
    });
  };
}

//export function fetchTopicAndParent(topicId){
//  return (dispatch, getState) => {
//    //dispatch(selectTopic(topicId));
//    dispatch(checkIfNoReplies(topicId)); // if needed
//    dispatch(fetchTopicAndParentIfNeeded(topicId));
//  };
//}
//
export function syncRepliesSince(topicId, timestamp){
  return (dispatch, getState) => {
    db.syncSince(['replies', topicId], timestamp, reply => {
      dispatch(queueReply(topicId, reply));
      dispatch(requestVoteCount(topicId, reply.topicId));
    });
  };
}

function fetchRepliesUntil(topicId, timestamp){
  return (dispatch, getState) => {
    db.fetchUntil(['replies', topicId], timestamp, reply => {
      dispatch(requestVoteCount(topicId, reply.topicId)); // if needed
      dispatch(receiveReply(topicId, reply));
    });
  };
}

function fetchRepliesByOrder(topicId, order){
  return (dispatch, getState) => {
      dispatch(requestRepliesByPopular(topicId));
      db.fetchByOrder(['votes', topicId], 5, 'count', reply => {
        dispatch(receiveOrderByCount(topicId, reply));
        dispatch(fetchTopicAndParentIfNeeded(reply.topicId));
      });
  };
}

function fetchPopular(topicId, timestamp){
  return (dispatch, getState) => {
    const lastRequested = getState().repliesByPopular[topicId].lastRequested;
    const cache = Date.now() - ( 5 * 60 * 1000);
    if(lastRequested < cache ){ 
      console.log('get new order list from server');
      dispatch(fetchRepliesByOrder(topicId, 'count'));
    }else{ 
      console.log('use cache, but reorder');
      dispatch(reorderPopular(topicId, getState().votes));
    }
  };
}

function trackVotes(topicId){
  return (dispatch, getState) => {
    db.syncOnChange(['votes', topicId], data => { 
      // test disconnect here or in utils actually
      dispatch(receiveVoteCount(data.topicId, data.count)); 
    }); 
  };
}
 
export function fetchDiscour(topicId, order){ // fetch discours?
  return (dispatch, getState) => {
    const isSameTopic = topicId === getState().selectedTopic;
    dispatch(selectOrder(order));
    dispatch(selectTopic(topicId));

    // always get topic and replies by new
    if(!isSameTopic){  // we've only tabbed over, dont need to get data again
      dispatch(fetchTopicAndParentIfNeeded(topicId));
      const lastUpdated = getState().repliesByNew[topicId].lastUpdated;
      if(!lastUpdated){ //console.log('getting past replies from server');
        const now = Date.now();
        dispatch(fetchRepliesUntil(topicId, now));
        dispatch(syncRepliesSince(topicId, now));
      }else{ //console.log('queuing replies from last update');
        dispatch(syncRepliesSince(topicId, lastUpdated + 1));
      }
    }

    if(order === 'popular'){
      dispatch(fetchPopular(topicId));
    }

    dispatch(trackVotes(topicId));
 
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

function isGibberish(s) {
  //http://www.webdeveloper.com/forum/showthread.php?157846-anti-spam-comment-javasript-by-regex-need-help/page2
  var v = 1, c = 1, ratio, len, gibberish = false;
  
  if(typeof s !== 'undefined' && s.length) {
    len = s.length;
    for(var i = 0; i < len; i++) {
      if(/[aeiou]/i.test(s.charAt(i))) { v++; }
      else{
        if(/[bcdfghjklmnpqrstvwxyz]/i.test(s.charAt(i))){ c++; }
      }
    }
   
    ratio = v / (c + v);
    if(ratio < 0.2 || ratio > 0.6) { gibberish = true; }

  }
 
  return gibberish;
}

function validateReply(reply){
  return (dispatch, getState) => {
    //console.log(reply);
    const content = reply.content;
    if (content === '') { 
      dispatch(setWarning('Empty Reply'));
      return false; 
    }
    const isGib = isGibberish(content);
    if(isGib){
      dispatch(setWarning('Gibberish!'));
      return false;
    }
    return true;
  };
}

export function addReply(topicId, reply){
  return (dispatch, getState) => {

    const isValid = dispatch(validateReply(reply));

    if(isValid){
      console.log('the reply is valid');
      dispatch(requestAddReply(topicId, reply));
      reply.ref = topicId;

      const uid = db.getAuth().uid;
      db.getTimestamp(['postStamp', uid])
      .then(ts => {
        dispatch(allowPostLater(30 * 1000));
        reply.stamp = ts;
        db.push(['topic'], reply)
        .then(newId => { 
          db.set(['replies', topicId, newId], reply);
          db.set(['votes', topicId, newId], { count: 0, stamp: 1});
        });
      }, err => {
        dispatch(setWarning(err.message));
        console.log(err.message);
      });
    }else{
      console.log('invalid reply, not doing anything');
    }

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
   const auth = db.getAuth();
    if(auth){
      dispatch(allowVoteLater(3200));
      const uid = auth.uid;
      dispatch(requestUpvote(topicId));
      db.getTimestamp(['voteStamp', uid]).then(ts => {
        db.addVote(['votes', parentId, topicId], ts);        
        db.push(['voteHistory', topicId], { uid, ts}); // but only if it works
      }, err => {
        dispatch(setWarning('Not enough time elapsed between votes'), 3000);
        console.log(err.message);
      });
    }
  };
}

export const TOGGLE_FORM = 'TOGGLE_FORM';
export function toggleForm(){
  return {
    type: TOGGLE_FORM
  };
}
