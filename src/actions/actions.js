
export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const SELECT_TOPIC = 'SELECT_TOPIC';


export const ROUTE_REQUEST = 'ROUTE_REQUEST';

function requestRoute(route) {
  return {
      type: ROUTE_REQUEST,
      route
  };
}

export function changeRoute(route){

  return dispatch => {

    dispatch(requestRoute(route));

    if(route.entry === 'about'){console.log('about'); }
    else {
      dispatch(fetchTopicAndReplies(route.params[0]));
      // dispatch the whole shabang!
    }

  };
}

function selectTopic(topicKey){
  return {
    type: SELECT_TOPIC,
    topicKey
  };
}

export function fetchTopicAndReplies(key){
  return dispatch => {
    dispatch(selectTopic(key));
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


