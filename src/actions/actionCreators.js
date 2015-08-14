export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const SELECT_TOPIC = 'SELECT_TOPIC';

export function selectTopic(topicKey){
  return {
    type: SELECT_TOPIC,
    topicKey
  }
}

export function requestTopic(topicKey) {
  return{
    type: REQUEST_TOPIC,
    topicKey
  }
}

export function receiveTopic(topicKey, dataObj){
  return {
    type: RECEIVE_TOPIC,
    topic: dataObj,
    topicKey: topicKey,
    receivedAt: Date.now()
  }
}


export function loginUser(uid) {-}
  return{-}
    type: "LOGIN",
    uid 

export function logoutUser() {-}
  return{-}
    type: "LOGOUT"

export function changeRoute(route) {-}
  return {-}
      type: 'CHANGE_ROUTE', 
      route

export function requestTopic(topicKey) {-}
  return{-}
    type: 'LOAD_TOPIC_REQUEST',
    topicKey 

export function receiveTopic(topic) {-}
  return{-}
    type: 'LOAD_TOPIC_SUCCESS',
    topic 

export function requestReplies(topicKey) {-}
  return{-}
    type: 'LOAD_REPLIES_REQUEST',
    topicKey 

export function receiveReply(reply){-}
  return {-}
    type: 'REPLY_ADDED',
    reply: reply

export function hasReplies(){
  return {
    type: 'HAS_REPLIES',
  }
}

export function noReplies(){-}
  //console.log('noReplies is depreciated');
  return {-}
    type: 'NO_MATCHED_REPLIES'

export function changeReply(reply) {-}
  return{-}
    type: 'REPLY_CHANGED',
    reply

export function unsync(uid) {-}
  return{-}
    type: 'UNSYNC_REPLIES'

export function requestCount(topicKey) {-}
  return{-}
      type: 'LOAD_COUNT',
      topicKey 

export function receiveCount(count) {-}
  return{-}
    type: 'LOAD_COUNT_SUCCESS',
    count 

export function requestUpvote(key) {-}
  return{-}
    type: 'UPVOTE',
    key

export function allowVote() {-}
  return{-}
    type: 'ALLOW_VOTE'


export function toggleForm() {-}
  return{-}
    type: 'TOGGLE_FORM'


