import { fetchTopicAndReplies, unsync } from './actions';

export const SELECT_ROUTE = 'SELECT_ROUTE';
function selectRoute(route) {
  return {
      type: SELECT_ROUTE,
      route
  };
}

export function changeRoute(route){

    let params = route.split('/'),
        entry = params.shift();

  return (dispatch, getState) => {

    const prevTopicId = getState().selectedTopic;
    if(prevTopicId && params[0] !== prevTopicId){ // a different topic
      dispatch(unsync(prevTopicId));
    }

    dispatch(selectRoute(entry));
    if(entry === 'about'){console.log('about'); }
    else {
      dispatch(fetchTopicAndReplies(entry, params[0]));
    }
  };
}

