import {fetch} from '../utils/fireUtils.js';

export const LOGIN_USER = 'LOGIN_USER';

function loginUser(uid){
  return {
    type: LOGIN_USER,
    uid
  };
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
function requestLogin(){
  return {
    type: REQUEST_LOGIN
  };
}


export function login(){
  return dispatch => {
    dispatch(requestLogin());
    dispatch(loginUser('obelix'));
  };
}

