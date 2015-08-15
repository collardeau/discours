import {fetch, exists} from '../utils/fireUtils.js';

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

export const REQUEST_REPLIES = 'REQUEST_REPLIES';
function requestReplies(topicId){
  return {
    type: REQUEST_REPLIES,
    topicId
  };
}

export const RECEIVE_REPLY = 'RECEIVE_REPLY';
function hasReplies(topicId, reply){
  return {
    type: RECEIVE_REPLY,
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

    fetch(['topic', topicId])
    .then(data => {
      dispatch(receiveTopic(topicId, data));
    });

    if(topicId === 'root'){
      console.log('root so not checking if replies exist');
      dispatch(hasReplies(topicId));
    } else {
      exists(['replies', topicId])
      .then(()=>{
        dispatch(hasReplies(topicId));
      });
    }

    dispatch(requestReplies(topicId));

  };
}


