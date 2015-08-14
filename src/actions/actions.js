export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';


export const REQUEST_ROUTE = 'REQUEST_ROUTE';
function requestRoute(route) {
  return {
      type: REQUEST_ROUTE,
      route
  };
}

export const SELECT_TOPIC = 'SELECT_TOPIC';
function selectTopic(topicId){
  return {
    type: SELECT_TOPIC,
    topicId
  };
}


export function changeRoute(route){

  return dispatch => {

    dispatch(requestRoute(route));

    if(route.entry === 'about'){console.log('about'); }
    else {
      let topicId = route.params[0];
      dispatch(selectTopic(topicId));
      dispatch(fetchTopicAndReplies(topicId));
    }

  };
}

export const FETCH_TOPIC = 'FETCH_TOPIC';
function fetchTopic(topicKey){
  return {
    type: FETCH_TOPIC,
    topicKey
  };
}

export function fetchTopicAndReplies(key){
  return dispatch => {
    dispatch(fetchTopic(key));
  };
}

export function requestTopic(topicKey) {
  return {
    type: REQUEST_TOPIC,
    topicKey
  };
}

export function receiveTopic(topicKey, dataObj){
  return {
    type: RECEIVE_TOPIC,
    topic: dataObj,
    topicKey: topicKey,
    receivedAt: Date.now()
  };
}


export function loginUser(uid) {
  return {
    type: "LOGIN",
    uid
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT"
  };
}


