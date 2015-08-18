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
    case actionTypes.REQUEST_TOPIC: 
      return Object.assign({}, state, {
        //hasReplies: hasReplies(state[action.hasReplies], action),
        content: '',
        parentTopic: { content: '', topicId: ''}
      });
    case actionTypes.RECEIVE_TOPIC:
    case actionTypes.RECEIVE_REPLY:
      const { content, parentTopic } = action.topic;
      return Object.assign({}, state, {
        content,
        parentTopic
      });
   default:
      return state;
  }
}

function topics(state={}, action){
  switch(action.type) {
    case actionTypes.REQUEST_TOPIC:
    case actionTypes.RECEIVE_TOPIC:
    case actionTypes.RECEIVE_REPLY:
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
    case actionTypes.RECEIVE_CHANGED_REPLY:
      return action.topic.count;
    default:
      return state;
  }
}

function votes(state={}, action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
    case actionTypes.RECEIVE_CHANGED_REPLY:
      return Object.assign({}, state, {
      [action.topicId]: vote(state[action.topicId], action)
    });
    default:
      return state;
  }
}

function repliesReducer(state=[], action){
  switch(action.type){
    case actionTypes.RECEIVE_REPLY:
      return [action.topicId, ...state ];
    default:
      return state;
  } 
}

function repliesByNew(state={}, action){
  switch(action.type){
    case actionTypes.SELECT_TOPIC:
      return Object.assign({}, state, {
        [action.topicId]: []
    });
    case actionTypes.RECEIVE_REPLY:
      const parentId = action.topic.parentTopic.topicId;
      return Object.assign({}, state, {
        [parentId]: repliesReducer(state[parentId], action)
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
  repliesByNew,
  votes
});

export default rootReducer;
