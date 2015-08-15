import { fetchTopicAndReplies} from './actions';

export const REQUEST_ROUTE = 'REQUEST_ROUTE';
function requestRoute(route) {
  return {
      type: REQUEST_ROUTE,
      route
  };
}

export function changeRoute(route){
  return dispatch => {
    dispatch(requestRoute(route));
    if(route.entry === 'about'){console.log('about'); }
    else {
      dispatch(fetchTopicAndReplies(route)); // if needed?
    }
  };
}

