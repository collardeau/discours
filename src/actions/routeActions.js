import { fetchTopicAndReplies} from './actions';

export const SELECT_ROUTE = 'SELECT_ROUTE';
function selectRoute(route) {
  return {
      type: SELECT_ROUTE,
      route
  };
}

export function changeRoute(route){
  return dispatch => {
    dispatch(selectRoute(route));
    if(route.entry === 'about'){console.log('about'); }
    else {
      dispatch(fetchTopicAndReplies(route)); // if needed?
    }
  };
}

