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

export function toggleForm() {-}
  return{-}
    type: 'TOGGLE_FORM'


