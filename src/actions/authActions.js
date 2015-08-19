import * as db from '../utils/fireUtils.js';

export const LOGIN_USER = 'LOGIN_USER';
function loginUser(uid){
  return {
    type: LOGIN_USER,
    uid
  };
}

export const LOGOUT_USER = 'LOGOUT_USER';
function logoutUser(uid){
  return {
    type: LOGOUT_USER,
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

    let onLogout = uid => {
      return db.onLogout(() => {
        db.set(['lastVote', uid], null);
        dispatch(logoutUser(uid));
      });
    };

    const isLoggedIn = db.getAuth();
    let uid;

    if(!isLoggedIn){
      db.loginAnonymously().then(auth=> {
        uid = auth.uid;
        dispatch(loginUser(uid));
        onLogout(uid);
      });
    }else{
      uid = isLoggedIn.uid;
      dispatch(loginUser(uid));
      onLogout(uid);
    }
 
 };
}

