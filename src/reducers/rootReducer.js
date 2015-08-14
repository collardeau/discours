import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actions';

function selectTopic(state='root', action){
  switch(action.type) {
    case actionTypes.SELECT_TOPIC:
      return action.topicKey;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectTopic
});

export default rootReducer;
