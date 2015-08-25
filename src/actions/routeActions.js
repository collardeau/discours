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

    let params = route.split('/'),
      entry = params.shift();

    console.log('entry after the split hash: ', entry);
    const prevTopicId = getState().selectedTopic;
    if(prevTopicId && params[0] !== prevTopicId){ // a different topic
      dispatch(unsync(prevTopicId));
    }

    dispatch(selectRoute(entry));

    if(!entry){
      console.log('oh, entry is falsey, route to new/root');
      dispatch(changeRoute('new/root'));
    }
    
    if (entry === 'new' || entry === 'popular') {
      console.log('oh, entry is all about topics (new/popular)');
      if(!params[0]){
        dispatch(changeRoute(entry + '/root'));
      }else {
        dispatch(fetchTopicAndReplies(entry, params[0]));
      }
    }

  };
}

