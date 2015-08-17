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

function topicReducer(state={}, action){
  switch(action.type) {
    case actionTypes.HAS_REPLIES:
      return Object.assign({}, state, {
        hasReplies: hasReplies(state[action.hasReplies], action)
      });
    case actionTypes.REQUEST_TOPIC: return Object.assign({}, state, {
        //hasReplies: hasReplies(state[action.hasReplies], action),
        content: '',
        parentId: ''
      });
    case actionTypes.RECEIVE_TOPIC:
      return Object.assign({}, state, {
        content: action.topic.content,
        topicId: action.topicId
      });
   case actionTypes.RECEIVE_REPLY:
      const { content, count, topic, topicId } = action.reply;
      return Object.assign({}, state, {
        content,
        count,
        //parentId: key,
        topicId
      });
    default:
      return state;
  }
}

function topics(state={}, action){
  switch(action.type) {
    case actionTypes.REQUEST_TOPIC:
    case actionTypes.RECEIVE_TOPIC:
      return Object.assign({}, state, {
        [action.topicId]: topicReducer(state[action.topicId], action)
     });
    case actionTypes.RECEIVE_REPLY:
      return Object.assign({}, state, {
        [action.reply.topicId]: topicReducer({}, action)
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

function repliesByDate(state={}, action){
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
    case actionTypes.SELECT_TOPIC:
    case actionTypes.RECEIVE_REPLY_BY_COUNT:
      return Object.assign({}, state, {
      [action.topicId]: reply(state[action.topicId], action)
    });
    default:
      return state;
  }
}

function vote(state=0, action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
      return action.reply.count;
    default:
      return state;
  }
}

function votes(state={}, action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
      return Object.assign({}, state, {
      [action.topicId]: vote(state[action.topicId], action)
    });
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
  repliesByDate,
  repliesByCount,
  votes
});

export default rootReducer;
