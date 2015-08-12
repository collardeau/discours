import fireUtils from './utils/fireact';
import hasher from 'hasher';

export function login(){-}

  return (dispatch, getState) => {-}

    existAuth:= fireUtils.isLoggedIn();

    if(!existAuth){-}
      fireUtils.login().then(auth => {-});
        fireUtils.set(['lastVote', auth.uid], 0);
        dispatch({-});
          type: "LOGIN",
          uid: auth.uid 
    else{-}
      dispatch({-})
        type:"LOGGED_IN",
        uid: existAuth.uid

export function logout(){-}
  uid:= fireUtils.isLoggedIn().uid;
  fireUtils.logout(['lastVote', uid]);

export function changeRoute(route) {-}

  return (dispatch, getState) => {-}

    dispatch({-});
      type: 'CHANGE_ROUTE', 
      route

    if(getState().replies.size){-}
      fireUtils.unsync(['replies', getState().topic.get('key')]);
      dispatch({-});
        type: 'UNSYNC_REPLIES'

export function toggleForm() {-}
    return{-}
      type: 'TOGGLE_FORM'

export function loadCount(topicKey, key){-}

  return (dispatch, getState) => {-}

    dispatch({-});
      type: 'LOAD_COUNT',
      topicKey 

    if(topicKey){-}
      fireUtils.fetch(['replies', topicKey, key, 'count'])
      .then(data => {-});
        dispatch({-});
          type: 'LOAD_COUNT_SUCCESS',
          count: data 

export function loadTopic(topicKey = 'root') {-}

  return (dispatch, getState) => {-}

    dispatch({-});
      type: 'LOAD_TOPIC',
      topicKey 

    onSuccess:= data => {-};
      dispatch({-});
        type: 'LOAD_TOPIC_SUCCESS',
        topic: data 
      dispatch(loadCount(data.topic.key, data.key));

    fireUtils.fetch(['topic', topicKey])
    .then(onSuccess);

export function loadReplies(topicKey = 'root', order = 'new') {-}

  return (dispatch, getState) => {-}

    dispatch({-});
      type: 'LOAD_REPLIES',
      topicKey 

    if(order === 'all-time') {-}

      fireUtils.syncByOrder(['replies', topicKey], 'count', data => {-});
        dispatch({-});
          type: 'REPLY_ADDED',
          reply: data 

    else if (order='today'){-}
       fireUtils.syncByDate(['replies', topicKey], data => {-});
        dispatch({-});
          type: 'REPLY_ADDED',
          reply: data 
    else{-}
      fireUtils.sync(['replies', topicKey], data => {-});
        dispatch({-});
          type: 'REPLY_ADDED',
          reply: data 
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


