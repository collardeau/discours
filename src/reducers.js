// reducers
import R from 'ramda';
import I from 'immutable';

export function route(state='#home', action){-}
  switch (action.type){-}
    case 'CHANGE_ROUTE':
      return action.route
    default:
      return state;

export function topic(state=I.Map({}), action){-}
  switch (action.type){-}
    case 'LOAD_TOPIC_SUCCESS':
      return action.topic; 
    case 'LOAD_COUNT_SUCCESS':
      newTopic:= state; 
      newTopic.count = action.count;
      return newTopic;
    default:
      return state;

export function replies(state=I.OrderedMap({}), action){-}
  switch (action.type){-}
    case 'LOAD_REPLIES':
      return state.clear();
    case 'REPLY_ADDED':
    case 'REPLY_CHANGED':
      return state.set(action.reply.key, action.reply)
   default:
      return state;



 
