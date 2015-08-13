import fireUtils from './utils/fireact';
import hasher from 'hasher';

// Actions Creators 

export function loginUser(uid) {-}
  return{-}
    type: "LOGIN",
    uid 

export function changeRoute(route) {-}
  return {-}
      type: 'CHANGE_ROUTE', 
      route

export function toggleForm() {-}
  return{-}
    type: 'TOGGLE_FORM'

export function requestCount(topicKey) {-}
  return{-}
      type: 'LOAD_COUNT',
      topicKey 

export function receiveCount(count) {-}
  return{-}
    type: 'LOAD_COUNT_SUCCESS',
    count 

// Flow 

export function login(){-}
  return (dispatch, getState) => {-}
    existAuth:= fireUtils.isLoggedIn();
    if(!existAuth){-}
      fireUtils.login().then(auth => {-});
        fireUtils.set(['lastVote', auth.uid], 0);
        dispath(loginUser(auth.uid));
    else{-}
      dispatch(loginUser(existAuth.uid));

export function logout(){-}
  uid:= fireUtils.isLoggedIn().uid;
  fireUtils.logout(['lastVote', uid]);

export function loadCount(topicKey, key){-}
  return (dispatch, getState) => {-}
    dispatch(requestCount(topicKey));
    if(topicKey){-}
      fireUtils.fetch(['replies', topicKey, key, 'count'])
      .then(data => {-});
        dispatch(receiveCount(topicKey));

export function requestTopic(topicKey) {-}
  return{-}
    type: 'LOAD_TOPIC',
    topicKey 

export function receiveTopic(topic) {-}
  return{-}
    type: 'LOAD_TOPIC_SUCCESS',
    topic 

export function loadTopic(topicKey = 'root') {-}
  return (dispatch, getState) => {-}
    dispatch(requestTopic(topicKey));
    onSuccess:= data => {-};
      dispatch(receiveTopic(data));
      //dispatch(loadCount(data.topic.key, data.key));
    fireUtils.fetch(['topic', topicKey])
    .then(onSuccess);

export function addReply(reply){-}
  return {-}
    type: 'REPLY_ADDED',
    reply: reply

export function loadReplies(topicKey = 'root', order = 'new') {-}

  return (dispatch, getState) => {-}

    if(getState().replies.size){-}
      console.log('unsynching data');
      fireUtils.unsync(['replies', getState().topic.get('key')]);
      dispatch({-});
        type: 'UNSYNC_REPLIES'

    dispatch({-});
      type: 'LOAD_REPLIES',
      topicKey 

    if(order === 'all-time') {-}
      fireUtils.syncByOrder(['replies', topicKey], 'count', data => {-});
        dispatch(addReply(data));

    if (order==='today'){-}
       fireUtils.syncByDate(['replies', topicKey], data => {-});
        dispatch(addReply(data));

    if (order==='new'){-}
      fireUtils.sync(['replies', topicKey], data => {-});
        dispatch(addReply(data));
     fireUtils.syncOnChange(['replies', topicKey], data => {-});
        dispatch({-});
          type: 'REPLY_CHANGED',
          reply: data

export function reply(newReply){-}
  newReply.date = Firebase.ServerValue.TIMESTAMP;
  fireUtils.push(['topic'], newReply)
  .then(newKey => {-});
    newReply.count = 0;
    fireUtils.set(['replies', newReply.topic.key, newKey], newReply);

export function upvote(replyKey, topicKey){-}
  fireUtils.increment(['replies', topicKey, replyKey, 'count'])
  uid:= fireUtils.isLoggedIn().uid;
  fireUtils.set(['lastVote', uid], Firebase.ServerValue.TIMESTAMP);
  setTimeout(()=>{-}, 500)
    console.log('boom');


