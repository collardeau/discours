import { fetchDiscour, unsync } from './actions';

export const SELECT_ROUTE = 'SELECT_ROUTE';
function selectRoute(route) {
  return {
      type: SELECT_ROUTE,
      route
  };
}

export function changeRoute(nextRoute){
  return (dispatch, getState) => {

    nextRoute = nextRoute ? nextRoute : 'new/root'; 
    let parts = nextRoute.split('/');
    let route = {
      entry: parts.shift(),
      params: parts 
    };

    dispatch(selectRoute(route));

  };
}

