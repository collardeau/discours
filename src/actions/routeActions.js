import { fetchDiscour, unsync } from './actions';

export const SELECT_ROUTE = 'SELECT_ROUTE';
function selectRoute(route) {
  return {
      type: SELECT_ROUTE,
      route
  };
}

export function changeRoute(route){
  return (dispatch, getState) => {

    //console.log('changing route with: ', route);

    let params = route.split('/'),
        entry = params.shift();

    const prevTopicId = getState().selectedTopic;
    if(prevTopicId && params[0] !== prevTopicId){ // a different topic
      dispatch(unsync(prevTopicId));
    }

    //dispatch(selectRoute(entry));

    if(!entry){
      //console.log('oh, entry is falsey, route to new/root');
      dispatch(changeRoute('new/root'));
    }
    
    if (entry === 'new' || entry === 'popular') {
      //console.log('oh, entry is all about topics (new/popular)');
      if(!params[0]){
        dispatch(changeRoute(entry + '/root'));
      }else {
        dispatch(selectRoute(entry));
        dispatch(fetchDiscour(params[0], entry));
      }
    }

    if (entry === 'about'){
      dispatch(selectRoute(entry));
    }

  };
}

