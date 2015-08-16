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

function route(state={}, action){
  switch(action.type){
    case routeActions.REQUEST_ROUTE:
      return action.route;
    default:
      return state;
  }
}

function selectedTopic(state='root', action){
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

function hasReplies(state=false, action){
  switch(action.type){
    case actionTypes.HAS_REPLIES:
      return true;
    case actionTypes.SELECT_TOPIC:
      return false;
    default:
      return state;
  }
}

function topic(state={}, action){
  switch(action.type) {
    case actionTypes.HAS_REPLIES:
      return Object.assign({}, state, {
        hasReplies: hasReplies(state[action.hasReplies], action)
      });
    case actionTypes.RECEIVE_TOPIC:
      return Object.assign({}, state, {
        content: action.topic.content
      });
    case actionTypes.FETCH_TOPIC:
      return Object.assign({}, state, {
        hasReplies: hasReplies(state[action.hasReplies], action),
        content: '',
        count: 0
      });
    case actionTypes.RECEIVE_REPLY:
      return Object.assign({}, state, {
        content: action.reply.content,
        count: action.reply.count
      });
    default:
      return state;
  }
}

function topics(state={}, action){
  switch(action.type) {
    case actionTypes.FETCH_TOPIC:
    case actionTypes.RECEIVE_TOPIC:
    case actionTypes.HAS_REPLIES:
      return Object.assign({}, state, {
        [action.topicId]: topic(state[action.topicId], action)
     });
    case actionTypes.RECEIVE_REPLY:
      return Object.assign({}, state, {
        [action.reply.topicId]: topic({}, action)
      });
    default:
      return state;
  }
}

function reply(state=[], action) {
  switch(action.type){
    case actionTypes.SELECT_TOPIC:
      return [];
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_REPLY_BY_COUNT:
      return [...state, action.reply.topicId ];
    default:
      return state;
  }
}

function replies(state={}, action){
  switch(action.type) {
    case actionTypes.SELECT_TOPIC:
    case actionTypes.RECEIVE_REPLY:
      return Object.assign({}, state, {
        [action.topicId]: reply(state[action.topicId], action)
     });
    default:
      return state;
  }
}

function repliesByCount(state={}, action){
  switch(action.type) {
    case actionTypes.RECEIVE_REPLY_BY_COUNT:
      return Object.assign({}, state, {
      [action.topicId]: reply(state[action.topicId], action)
    });
    default:
      return state;
  }
}

export function votes(state={}, action){
  switch(action.type){
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  route,
  uid,
  selectedTopic,
  selectedOrder,
  topics,
  replies,
  repliesByCount
});

export default rootReducer;
