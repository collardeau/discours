import {fetch} from '../utils/fireUtils.js';

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const SELECT_ORDER = 'SELECT_ORDER';
export const FETCH_TOPIC = 'FETCH_TOPIC';
export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const HAS_REPLIES = 'HAS_REPLIES';

function selectTopic(topicId){
  return {
    type: SELECT_TOPIC,
    topicId
  };
}

function selectOrder(order){
  return {
    type: SELECT_ORDER,
    order
  };
}

function fetchTopic(topicId){
  return {
    type: FETCH_TOPIC,
    topicId
  };
}

function hasReplies(topicId){
  return {
    type: HAS_REPLIES,
    topicId
  };
}

export function requestTopic(topicId) {
  return {
    type: REQUEST_TOPIC,
    topicId
  };
}

export function receiveTopic(topicId, topic){
  return {
    type: RECEIVE_TOPIC,
    topicId: topicId,
    topic: topic,
    receivedAt: Date.now()
  };
}

export function fetchTopicAndReplies(route){
  return dispatch => {

    let topicId = route.params[0],
        order = route.entry;

    dispatch(selectOrder(order));
    dispatch(selectTopic(topicId));
    dispatch(fetchTopic(topicId));

    fetch(['topic', topicId])
    .then(data => {
      dispatch(receiveTopic(topicId, data));
    });

    dispatch(hasReplies(topicId, true));
  };
}


