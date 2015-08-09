import R from 'ramda';
import I from 'immutable';

export function uid(state='', action){-}
  //console.log(action);
  switch (action.type){-}
    case 'LOGIN':
    case 'LOGGED_IN':
      return action.uid;
    default:
      return state;

export function route(state='#home', action){-}
  switch (action.type){-}
    case 'CHANGE_ROUTE':
      return action.route
    default:
      return state;

export function topic(state=I.Map({}), action){-}
  switch (action.type){-}
    case 'LOAD_TOPIC':
      return state.clear();
    case 'LOAD_TOPIC_SUCCESS':
      return I.Map(action.topic);
    case 'LOAD_COUNT_SUCCESS':
      return state.set('count', action.count);
    default:
      return state;

export function replyFilter(state='new', action){-}
  switch (action.type){-}
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;

export function replies(state=I.OrderedMap({}), action){-}
  switch (action.type){-}
    case 'LOAD_REPLIES':
      return state.clear();
    case 'REPLY_JK':
    case 'REPLY_ADDED':
    case 'REPLY_CHANGED':
      return state.set(action.reply.key, action.reply)
   default:
      return state;



 
