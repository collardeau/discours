import fireUtils from '../utils/fireact';
import * as act from './actionCreators';

export function loadTopic(topicKey = 'root') {-}
  return (dispatch) => {-}
    dispatch(act.requestTopic(topicKey));
    fireUtils.fetch(['topic', topicKey])
    .then(data => {
      dispatch(act.receiveTopic(data));
    });
    fireUtils.getLast(['replies', topicKey])
    .then(snap => {
      console.log(snap.exists());
    });
    // check if any replies
    // check if any replies today
export function loadReplies(topicKey = 'root', order = 'new') {-}
  return (dispatch, getState) => {-}

    if(getState().replies.size){-}
      console.log('unsynching data');
      fireUtils.unsync(['replies', getState().topic.get('key')]);
      dispatch(act.unsync());

    dispatch(act.requestReplies(topicKey));

    if(order === 'all-time') {
      fireUtils.syncByOrder(['replies', topicKey], 'count', data => {
        dispatch(act.receiveReply(data));
      }, exists => {
        if(!exists) dispatch(act.noReplies());
      });
    }

    if (order==='today'){
       fireUtils.syncByDate(['replies', topicKey], data => {
        dispatch(act.receiveReply(data));
       }, exists => {
        if(!exists) dispatch(act.noReplies());
      });
    }

    if (order==='new'){
      fireUtils.sync(['replies', topicKey], data => {
        dispatch(act.receiveReply(data));
      }, exists => {
        if(!exists) dispatch(act.noReplies());
      });
      fireUtils.syncOnChange(['replies', topicKey], data => {
        dispatch(act.changeReply(data));
      });
    }

export function reply(newReply){-}
  newReply.date = Firebase.ServerValue.TIMESTAMP;
  fireUtils.push(['topic'], newReply)
  .then(newKey => {-});
    newReply.count = 0;
    fireUtils.set(['replies', newReply.topic.key, newKey], newReply);

export function upvote(replyKey, topicKey){-}
  return dispatch => {-}
    dispatch(act.requestUpvote(replyKey));
    fireUtils.increment(['replies', topicKey, replyKey, 'count'])
    uid:= fireUtils.isLoggedIn().uid;
    fireUtils.set(['lastVote', uid], Firebase.ServerValue.TIMESTAMP);
    setTimeout(()=>{-}, 5000)
      dispatch(act.allowVote());

export function loadCount(topicKey, key){-}
  return (dispatch) => {-}
    dispatch(act.requestCount(topicKey));
    if(topicKey){-}
      fireUtils.fetch(['replies', topicKey, key, 'count'])
      .then(data => {-});
        dispatch(act.receiveCount(topicKey));

