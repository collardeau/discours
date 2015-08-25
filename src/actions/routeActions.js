import { fetchTopicAndReplies, unsync } from './actions';

export const SELECT_ROUTE = 'SELECT_ROUTE';
function selectRoute(route) {
  return {
      type: SELECT_ROUTE,
      route
  };
}

export function changeRoute(route){
  return (dispatch, getState) => {

    console.log('changing route from this hash: ', route);
    let params = route.split('/'),
      entry = params.shift();

    console.log('entry: ', entry);
    console.log('params: ', entry);

    const prevTopicId = getState().selectedTopic;
    if(prevTopicId && params[0] !== prevTopicId){ // a different topic
      dispatch(unsync(prevTopicId));
    }

    dispatch(selectRoute(entry));
    console.log('changing route to :', entry);

    if(!entry.length){
      console.log('not entry so use new/root');
      dispatch(fetchTopicAndReplies('new', 'root'));
    }
    
    if (entry === 'new' || entry === 'popular') {
      dispatch(fetchTopicAndReplies(entry, params[0]));
    }

  };
}

