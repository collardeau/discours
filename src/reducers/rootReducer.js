import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actions';

function uid(state='zip', action){
  switch(action.type){
    case actionTypes.LOGIN_USER:
    case actionTypes.LOGIN:
      return action.uid;
    default:
      return state;
  }
}

function route(state='', action){
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

function topic(state={}, action){
  switch(action.type) {
    case actionTypes.FETCH_TOPIC:
      return Object.assign({}, state, {
        hasReplies: false,
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
      return Object.assign({}, state, {
        [action.topicKey]: topic(state[action.topickey], action)
     });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  route,
  uid,
  selectedTopic,
  topics
});

export default rootReducer;
