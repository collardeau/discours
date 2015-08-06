// reducers
import R from 'ramda';

export function route(state='root', action){-}
  console.log('route reducer called with state', state, 'and action', action)
  switch (action.type){-}
    case 'CHANGE_ROUTE':
      return action.route
    default:
      return state;

export function topic(state={}, action){-}
  console.log('topic reducer called with state', state, 'and action', action)
  switch (action.type){-}
    case 'LOAD_TOPIC_SUCCESS':
      return R.clone(action.topic); 
    default:
      return state;



 
