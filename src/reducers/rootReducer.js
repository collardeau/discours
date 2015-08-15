import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actions';

function uid(state=null, action){
  switch(action.type){
    case actionTypes.LOGIN_USER:
    case actionTypes.LOGIN:
      return action.uid;
    default:
      return state;
  }
}

function route(state='home', action){
  switch(action.type){
    case actionTypes.REQUEST_ROUTE:
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
    case actionTypes.FETCH_TOPIC:
      return Object.assign({}, state, {
        hasReplies: hasReplies(state[action.hasReplies], action),
        hasRepliesToday: false,
        inResponseTo: 'some key',
        lastUpdated: 'some day'
      });
    default:
      return state;
  }
}

function topics(state={}, action){
  switch(action.type) {
    case actionTypes.FETCH_TOPIC:
    case actionTypes.HAS_REPLIES:
      return Object.assign({}, state, {
        [action.topicId]: topic(state[action.topicId], action)
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
  votes,
  topics
});

export default rootReducer;
