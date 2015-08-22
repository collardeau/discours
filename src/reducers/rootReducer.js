import { combineReducers } from 'redux';
import * as authActions from '../actions/authActions';
import * as routeActions from '../actions/routeActions';
import * as actionTypes from '../actions/actions';

function uid(state=null, action){
  switch(action.type){
    case authActions.LOGIN_USER:
      return action.uid;
    default:
      return state;
  }
}

function route(state='about', action){
  switch(action.type){
    case routeActions.SELECT_ROUTE:
      return action.route;
    default:
      return state;
  }
}

function voteReducer(state=false, action){
  switch(action.type) {
    case actionTypes.REQUEST_UPVOTE:
    case actionTypes.LOGOUT:
      return false;
    case actionTypes.ALLOW_VOTE:
    case authActions.LOGIN_USER:
      return true;
    default:
      return state;
  }
}

function permissions(state={post: false, vote: false}, action) {
  switch(action.type){
    case actionTypes.ALLOW_VOTE:
    case actionTypes.LOGOUT:
    case authActions.LOGIN_USER:
    case actionTypes.REQUEST_UPVOTE:
      return Object.assign({}, state, {
        vote: voteReducer(state[vote], action)
     });
    default:
      return state;
  }
}

function selectedTopic(state='', action){
  switch(action.type) {
    case actionTypes.SELECT_TOPIC:
      return action.topicId;
    default:
      return state;
  }
}

function selectedOrder(state='new', action){
  switch(action.type) {
    case actionTypes.SELECT_ORDER:
      return action.order;
    default:
      return state;
  }
}

function topicReducer(state={content: '', parentId: ''}, action){
  switch(action.type) {
   case actionTypes.RECEIVE_TOPIC:
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
    case actionTypes.QUEUE_REPLY:
      const {content, ref: parentId } = action.topic;
      return Object.assign({}, state, {
        content,
        parentId
      });
   default:
      return state;
  }
}

function topics(state={}, action){
  switch(action.type) {
    case actionTypes.SELECT_TOPIC:
    case actionTypes.RECEIVE_TOPIC:
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
    case actionTypes.QUEUE_REPLY:
      return Object.assign({}, state, {
        [action.topicId]: topicReducer(state[action.topicId], action)
     });
    default:
      return state;
  }
}

function vote(state=0, action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
    case actionTypes.RECEIVE_CHANGED_REPLY:
      return action.topic.count;
    default:
      return state;
  }
}

function votes(state={}, action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
    case actionTypes.RECEIVE_CHANGED_REPLY:
    case actionTypes.QUEUE_REPLY:
      return Object.assign({}, state, {
      [action.topicId]: vote(state[action.topicId], action)
    });
    default:
      return state;
  }
}

function comp (arr, votes) { 
  let voteA, voteB;
  return arr.sort((a, b) => {
    voteA = votes[a]; 
    voteB = votes[b];
    if(voteA > voteB) { return -1; }
    if(voteA < voteB) { return 1; }
    return 0;
  });
} 

function repliesByNewReducer(state={
  lastQueuedTime: 0, 
  lastUpdated: 0, 
  view: [], 
  queued: []}, action) {
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
      return Object.assign({}, state, {
        lastUpdated: action.topic.date,
        view: [action.topicId, ...state.view]
      });
   case actionTypes.QUEUE_REPLY:
      return Object.assign({}, state, {
        //lastUpdated: action.topic.date,
        lastQueuedTime: action.topic.date,
        queued: [ action.topicId, ...state.queued]
    });
    case actionTypes.UNQUEUE:
      return Object.assign({}, state, {
        lastUpdated: state.lastQueuedTime,
        queued: [],
        view: [...state.queued, ...state.view]
    });
    default:
      return state;
  } 
}

function repliesByNew(state={}, action){
  switch(action.type){
    case actionTypes.REQUEST_TOPIC:
    case actionTypes.UNQUEUE:
      return Object.assign({}, state, {
        [action.topicId]: repliesByNewReducer(state[action.topicId], action) //state.Topic here?
    });
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.QUEUE_REPLY:
      const parentId = action.topic.ref;
      return Object.assign({}, state, {
        [parentId]: repliesByNewReducer(state[parentId], action)
    });
    default:
      return state;
  }
}

function repliesByPopularReducer(state={
  lastRequested: 0,
  high: 0,
  view: []}, action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
      const newCount = action.topic.count;
      const high = state.high;
      const isNewHigh = newCount >= high;
      return Object.assign({}, state, {
        high: isNewHigh ? newCount : high,
        lastRequested: Date.now(),
        view: isNewHigh ? [action.topicId, ...state.view] : [...state.view, action.topicId]  
      });
    case actionTypes.REQUEST_REPLIES_BY_POPULAR:
      return { lastRequested: 0, high: 0, view: [] };
    case actionTypes.REORDER_POPULAR:
        const view = [...comp(state.view, action.votes)];
        const newHigh = action.votes[view[0]];
      return Object.assign({}, state, {
        view,
        high: newHigh
      });
    default:
      return state;
  } 
}

function repliesByPopular(state={}, action){
  switch(action.type){
    case actionTypes.SELECT_TOPIC:
    case actionTypes.REQUEST_REPLIES_BY_POPULAR:
    case actionTypes.REORDER_POPULAR:
      return Object.assign({}, state, {
        [action.topicId]: repliesByPopularReducer(state[action.topicId], action)
    });
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
      const parentId = action.topic.ref;
      return Object.assign({}, state, {
        [parentId]: repliesByPopularReducer(state[parentId], action)
    });
    default:
      return state;
  }
}

function hasReplies(state=-1, action){
  switch(action.type){
    case actionTypes.HAS_NO_REPLIES:
      return 0;
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
    case actionTypes.QUEUE_REPLY:
      return 1;
    default:
      return state;
  } 
}

function haveReplies(state={}, action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_REPLY_BY_ORDER:
    case actionTypes.QUEUE_REPLY:
      const parentId = action.topic.ref;
      return Object.assign({}, state, {
        [parentId]: hasReplies(state[parentId], action)
      });
    case actionTypes.SELECT_TOPIC:
    case actionTypes.HAS_NO_REPLIES:
      return Object.assign({}, state, {
        [action.topicId]: hasReplies(state[action.topicId], action)
      });
    default:
      return state;
  }
}

function formIsOpen(state=false, action){
  switch (action.type){
    case actionTypes.TOGGLE_FORM:
      return !state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  formIsOpen,
  haveReplies,
  permissions,
  route,
  selectedTopic,
  selectedOrder,
  repliesByNew,
  repliesByPopular,
  topics,
  uid,
  votes
});

export default rootReducer;
