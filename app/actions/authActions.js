import * as db from '../utils/fireUtils.js';
import { allowPostLater, allowVoteLater } from './actions';

export const LOGIN_USER = 'LOGIN_USER';
function loginUser(uid){
  return {
    type: LOGIN_USER,
    uid
  };
}

export const LOGOUT_USER = 'LOGOUT_USER';
function logoutUser(){
  return {
    type: LOGOUT_USER
  };
}


export const REQUEST_LOGIN = 'REQUEST_LOGIN';
function requestLogin(){
  return {
    type: REQUEST_LOGIN
  };
}

function onLoginOrOut(){

  return (dispatch, getState) => {
    db.onLogin(auth => {
      if(auth){ 
        dispatch(allowVoteLater(5 * 1000));
        dispatch(allowPostLater(5 * 1000));
      }else if (getState().uid ){ console.log('log out process');
        const lastUid = getState().uid;
        dispatch(logoutUser());
        dispatch(login());        
      }
 
    });
  };

}

export function login(){
  return (dispatch, getState) => {

    dispatch(requestLogin());
    dispatch(onLoginOrOut());

    const isLoggedIn = db.getAuth();
    let uid;

    if(isLoggedIn){
      uid = isLoggedIn.uid;
      dispatch(loginUser(uid));
   }else{
      db.loginAnonymously().then(auth=> {
        uid = auth.uid;
        dispatch(loginUser(uid));
      });
   }
 
 };
}

