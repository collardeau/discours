import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actions';

function route(state='', action){
  switch(action.type){
    case actionTypes.ROUTE_REQUEST:
      return action.route;
    default:
      return state;
  }
}

function selectedTopic(state={}, action){
  switch(action.type) {
    case actionTypes.SELECT_TOPIC:
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

function topic(state={}, action){
  switch(action.type) {
    case actionTypes.SELECT_TOPIC:
      return Object.assign({}, state, {
        [action.topicKey]: selectedTopic(state[action.topickey], action)
     });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  route,
  topic
});

export default rootReducer;
