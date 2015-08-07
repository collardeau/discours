// reducers
import R from 'ramda';
import I from 'immutable';

export function route(state='#home', action){-}
  //console.log(action);
  switch (action.type){-}
    case 'CHANGE_ROUTE':
      return action.route
    default:
      return state;

export function topic(state={}, action){-}
  switch (action.type){-}
    case 'LOAD_TOPIC_SUCCESS':
      return R.clone(action.topic); 
    default:
      return state;

export function replies(state=I.OrderedMap({}), action){-}
  switch (action.type){-}
    case 'LOAD_REPLIES_REQUEST':
      return state.clear();
    case 'REPLY_ADDED':
    case 'REPLY_CHANGED':
      return state.set(action.reply.key, action.reply)
   default:
      return state;



 
