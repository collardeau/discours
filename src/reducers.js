import I from 'immutable';

export function uid(state=null, action){-}
  switch (action.type){-}
    case 'LOGIN':
      return action.uid;
    case 'LOGOUT':
      return null;
    default:
      return state;

export function route(state=I.Map({entry: 'new', params:['root']}), action){-}
  switch (action.type){-}
    case 'CHANGE_ROUTE':
      return action.route
    default:
      return state;

export function canVote(state=false, action){-}
  switch (action.type){-}
    case 'UPVOTE':
    case 'LOGOUT':
      return false;
    case 'ALLOW_VOTE':
    case 'LOGIN':
      return true;
    default:
      return state;

export function topic(state=I.Map({}), action){-}
  switch (action.type){-}
    case 'LOAD_TOPIC_REQUEST':
      return state.clear();
    case 'LOAD_TOPIC_SUCCESS':
      return I.Map(action.topic);
    case 'LOAD_COUNT_SUCCESS':
      return state.set('count', action.count);
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

export function formIsOpen(state=false, action){-}
  switch (action.type){-}
    case 'TOGGLE_FORM':
      return !state;
    default:
      return state;


