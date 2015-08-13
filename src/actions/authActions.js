import fireUtils from '../utils/fireact';
import {loginUser, logoutUser} from './actionCreators';

export function login(){

  return dispatch => {

    let isLoggedIn= fireUtils.isLoggedIn();
    let uid;

    let onLogout= uid => {
      return fireUtils.onLogout(() => {-});
        fireUtils.set(['lastVote', uid], null);
        dispatch(logoutUser(uid));
    };
     
    if(!isLoggedIn){
      fireUtils.login().then(auth => {
        uid= auth.uid;
        dispatch(loginUser(uid));
        onLogout(uid);
      });
    }else{
      uid= isLoggedIn.uid;
      dispatch(loginUser(isLoggedIn.uid));
      onLogout(uid);
    }
  }
}

