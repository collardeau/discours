import * as db from '../utils/fireUtils.js';

// PERMISSIONS

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

// WARNING

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

// VOTES 

export const RECEIVE_VOTE_COUNT = 'RECEIVE_VOTE_COUNT';
function receiveVoteCount(topicId, votes){
  return {
    type: RECEIVE_VOTE_COUNT,
    topicId,
    votes
  };
}

export const REQUEST_UPVOTE = 'REQUEST_UPVOTE';
function requestUpvote(topicId){
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
        db.pushLog(['voteHistory', topicId], { uid, ts}); // but only if it works
      }, err => {
        dispatch(setWarning('Not enough time elapsed between votes'), 3000);
        console.log(err.message);
      });
    }
  };
}

export const REQUEST_VOTE_COUNT = 'REQUEST_VOTE_COUNT';
function requestVoteCount(topicId){
  console.log('requesting vote count for ' + topicId);
  return {
    type: REQUEST_VOTE_COUNT,
    topicId
  };
}


export function syncVote(topicId, parentId){
  return (dispatch, getState) => {
    console.log('syncing vote at : ' + topicId + ' at parent: ' + parentId);
    dispatch(requestVoteCount(topicId));
    db.syncChange(['votes', parentId, topicId], data => {
      dispatch(receiveVoteCount(topicId, data.count)); 
    });
  };
}

function trackVotes(topicId){
  return (dispatch, getState) => {
    db.syncOnChange(['votes', topicId], data => { 
      // test disconnect here or in utils actually
      //dispatch(receiveVoteCount(data.topicId, data.count)); 
    }); 
  };
}

// TOPIC

export const SELECT_TOPIC = 'SELECT_TOPIC';
function selectTopic(topicId){
  return {
    type: SELECT_TOPIC,
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

export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export function receiveTopic(topicId, topic){
  return {
    type: RECEIVE_TOPIC,
    topic,
    topicId
 };
}

function stateHasTopic(topicId, topics){
  if(topics[topicId] && topics[topicId].content) {
    return topics[topicId];
  }
  return null;
}

export function fetchTopic(topicId){
  return (dispatch, getState) => {
    db.fetch(['topic', topicId])
    .then(topic => {
      dispatch(receiveTopic(topicId, topic));
    });
  };
}
 
export function fetchTopicIfNeeded(topicId){
  return (dispatch, getState) => {
    if(!topicId){ 
      return;
    }
    const topics = getState().topics; 
    if(!topics[topicId] || !topics[topicId].content) {
      dispatch(selectTopic(topicId));
      dispatch(fetchTopic(topicId));
    }
  };
}


function fetchParentIfNeeded(topicId){
  return (dispatch, getState) => {
    if( topicId === 'none') { return; }
    const topic = stateHasTopic(topicId, getState().topics);

    if(!topic){
      dispatch(requestTopic(topicId));
      db.fetch(['topic', topicId])
      .then(topic => {
        dispatch(receiveTopic(topicId, topic));
       });
     }
  };
}

function fetchTopicAndParentIfNeeded(topicId){
  return (dispatch, getState) => {
    let topics = getState().topics;
    let localTopic = stateHasTopic(topicId, topics);
    let parentId, parentTopic;

    if(!localTopic){ //async
      dispatch(requestTopic(topicId));
      db.fetch(['topic', topicId])
      .then(topic => {
        dispatch(receiveTopic(topicId, topic));
        dispatch(fetchParentIfNeeded(topic.ref));
      });
    }else{
        dispatch(fetchParentIfNeeded(localTopic.parentId));
    }
  };
}

// REPLIES BY NEW

export const RECEIVE_REPLY = 'RECEIVE_REPLY';
function receiveReply(topicId, reply){
 return {
    type: RECEIVE_REPLY,
    parentId: topicId,
    topic: reply,
    topicId: reply.topicId
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
    const replies = getState().repliesByNew[topicId];
    if(!replies) { return; }
    const queue = replies.queued ? replies.queued : [];
    if(queue.length) {
      dispatch(unqueue(topicId));
    }
  };
}

function fetchRepliesUntil(topicId, timestamp){
  return (dispatch, getState) => {
    db.fetchUntil(['replies', topicId], timestamp, reply => {
      //dispatch(requestVoteCount(topicId, reply.topicId)); // if needed
      dispatch(receiveReply(topicId, reply));
    });
  };
}

function syncRepliesSince(topicId, timestamp){
  return (dispatch, getState) => {
    db.syncSince(['replies', topicId], timestamp, reply => {
      dispatch(queueReply(topicId, reply));
      //dispatch(requestVoteCount(topicId, reply.topicId));
    });
  };
}

function syncReplies(topicId){
  return (dispatch, getState) => {
    console.log('synching replies with ', topicId);
    const repliesByNew = getState().repliesByNew;
    const lastUpdated = repliesByNew[topicId] && repliesByNew[topicId].lastUpdated;
    if(!lastUpdated){ console.log('getting past replies from server');
      const now = Date.now();
      dispatch(fetchRepliesUntil(topicId, now));
      dispatch(syncRepliesSince(topicId, now));
    }else{ console.log('queuing replies from last update');
      dispatch(syncRepliesSince(topicId, lastUpdated + 1));
    }
  };
}

// REPLIES BY POPULAR 

export const RECEIVE_POPULAR_VOTE = 'RECEIVE_POPULAR_VOTE';
function receivePopularVote(topicId, vote){
  return {
    type: RECEIVE_POPULAR_VOTE,
    parentId: topicId,
    topicId: vote.topicId,
    vote: vote
  };
}

export const REQUEST_REPLIES_BY_POPULAR = 'REQUEST_REPLIES_BY_POPULAR';
function requestRepliesByPopular(topicId){
  return {
    type: REQUEST_REPLIES_BY_POPULAR,
    topicId
  };
}

export const REQUEST_REPLY_ORDER_BY_COUNT = 'REQUEST_REPLY_ORDER_BY_COUNT';
function requestReplyOrderByCount(topicId){
  return {
    type: REQUEST_REPLY_ORDER_BY_COUNT,
    topicId
  };
}

function fetchReplyOrderByCount(topicId){
  return (dispatch, getState) => {
      dispatch(requestReplyOrderByCount);
      db.fetchByOrder(['votes', topicId], 5, 'count', vote => {
        console.log('receiving popular "vote": ', vote);
        fetchTopicIfNeeded(vote.topicId);
        dispatch(receivePopularVote(topicId, vote));
      });
  };
}

export function fetchPopularIfNeeded(topicId){
  return (dispatch, getState) => {
    const 
      repliesByPop = getState().repliesByPopular,
      lastRequested = repliesByPop[topicId] && repliesByPop[topicId].lastUpdated || 0,
      cache = Date.now() - ( 5 * 60 * 1000);
      if(lastRequested < cache ){ 
        console.log('get new order list from server');
        dispatch(fetchReplyOrderByCount(topicId)); // need a parentid
      }else{ 
        console.log('use cache, but reorder');
        dispatch(reorderPopular(topicId, getState().votes));
    }
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

// POST

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

export const TOGGLE_FORM = 'TOGGLE_FORM';
export function toggleForm(){
  return {
    type: TOGGLE_FORM
  };
}

// DISCOURS

export const SELECT_ORDER = 'SELECT_ORDER';
function selectOrder(order){
  return {
    type: SELECT_ORDER,
    order
  };
}

export const HAS_NO_REPLIES = 'HAS_NO_REPLIES';
function hasNoReplies(topicId){
  return {
    type: HAS_NO_REPLIES,
    topicId
  };
}

function checkForReplies(topicId){
  return (dispatch, getState) => { // check the state first
    const exists = getState().haveReplies[topicId] === 1;
    if(!exists){ console.log('checking for replies');
      db.exists(['replies', topicId])
      .then(exists => {
        if(!exists){
          dispatch(hasNoReplies(topicId));
        }
      });
    }
  };
}

export function fetchReplies(topicId){

  return (dispatch, getState) => {

      dispatch(checkForReplies(topicId));// if needed
      dispatch(syncReplies(topicId));
      //dispatch(trackVotes(topicId));
  };
 
}

export function fetchPopularReplies(topicId){
  return dispatch => {
      dispatch(fetchPopularIfNeeded(topicId));
  };
}

// KILL SYNCS

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
 
export function unsyncVote(topicId, parentId){
  return dispatch => {
    db.unsync(['votes', parentId, topicId]);
  };
}
