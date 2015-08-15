import fireUtils from '../utils/fireact.js';

// auth actions

export const LOGIN_USER = 'LOGIN_USER';

function loginUser(uid){
  return {
    type: LOGIN_USER,
    uid
  };
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
function requestLogin(){
  return {
    type: REQUEST_LOGIN
  };
}


export function login(){
  return dispatch => {
    dispatch(requestLogin());
    dispatch(loginUser('obelix'));
  };
}

// route actions

export const REQUEST_ROUTE = 'REQUEST_ROUTE';
function requestRoute(route) {
  return {
      type: REQUEST_ROUTE,
      route
  };
}

export function changeRoute(route){
  return dispatch => {
    dispatch(requestRoute(route));
    if(route.entry === 'about'){console.log('about'); }
    else {
      dispatch(fetchTopicAndReplies(route)); // if needed?
    }
  };
}

// firebase actions
export const SELECT_TOPIC = 'SELECT_TOPIC';
function selectTopic(topicId){
  return {
    type: SELECT_TOPIC,
    topicId
  };
}
export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const FETCH_TOPIC = 'FETCH_TOPIC';
export const HAS_REPLIES = 'HAS_REPLIES';

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

export const SELECT_ORDER = 'SELECT_ORDER';
function selectOrder(order){
  return {
    type: SELECT_ORDER,
    order
  };
}
export function fetchTopicAndReplies(route){
  return dispatch => {
    let order = route.entry;
    dispatch(selectOrder(route.entry));
    let topicId = route.params[0];
    dispatch(selectTopic(topicId));
    dispatch(fetchTopic(topicId));
    //check if it has replies
    dispatch(hasReplies(topicId, true));
  };
}

export function requestTopic(topicId) {
  return {
    type: REQUEST_TOPIC,
    topicId
  };
}

export function receiveTopic(topicId, dataObj){
  return {
    type: RECEIVE_TOPIC,
    topic: dataObj,
    topicId: topicId,
    receivedAt: Date.now()
  };
}

