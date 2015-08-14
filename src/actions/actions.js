export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const SELECT_TOPIC = 'SELECT_TOPIC';

export function selectTopic(topicKey){
  return {
    type: SELECT_TOPIC,
    topicKey
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

export function changeRoute(route) {
  return {
      type: 'CHANGE_ROUTE',
      route
  };
}


