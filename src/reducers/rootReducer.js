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

function selectTopic(state='top', action){
  switch(action.type) {
    case actionTypes.SELECT_TOPIC:
      return action.topicKey;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectTopic,
  route
});

export default rootReducer;
