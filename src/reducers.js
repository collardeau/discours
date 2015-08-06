// reducers
import R from 'ramda';

export function route(state='root', action){-}
  console.log('reducers called with action', action)
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

export function replies(state=[], action){-}
  switch (action.type){-}
    case 'REPLY_ADDED':
      return [...state, action.replies]
    case 'REPLY_CHANGED':
      return state;
    default:
      return state;



 
