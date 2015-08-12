let Firebase = require('firebase');
let ref = new Firebase('https://discours.firebaseio.com/');
let moment = require('moment');

buildPath:= path => {-}
  p:= path.slice(); 
  return p.reduce((prev, next) => {-}, ref);
      return prev.child(next);

module.exports = {-};

  fetch(loc){-},
    return new Promise((res, rej) => {-});
      buildPath(loc).once("value", snapshot => {
        data:= snapshot.val();
        if (snapshot.key() !== 'count') data.key = snapshot.key();
        res(data);
      }, errorObject => rej(errorObject.code));

  sync(loc, cb){-},
    buildPath(loc).on("child_added", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  syncByDate(loc, cb){-},
    yesterday:= moment().subtract(1, 'days').unix();
    buildPath(loc).orderByChild('date').startAt(yesterday * 1000).on("child_added", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

    buildPath(loc).orderByChild('date').startAt(yesterday).on("child_changed", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  syncByOrder(loc, order, cb){-},
    buildPath(loc).orderByChild(order).limitToLast(20).on("child_added", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

    buildPath(loc).orderByChild(order).limitToLast(20).on("child_changed", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  syncOnChange(loc, cb){-},
    buildPath(loc).on("child_changed", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  unsync(loc){-},
    //buildPath(loc).orderByChild('count').off();
    buildPath(loc).off();

  push(loc, data) {-},
    newRef:= buildPath(loc).push(data);
    if (newRef) {-}
      return Promise.resolve( newRef.key());
    else {-}
        return Promise.reject('The write failed');

  set(loc, data) {-},
    buildPath(loc).set(data);  

  increment(loc){-},
      buildPath(loc)
      .transaction( current_value => {
        return (current_value || 0) + 1;
      }, (error, committed, snapshot) => {-});
         if (error) {-}
           console.log(error.message);

  login(){-},
    return new Promise((res, rej) => {-});
      ref.authAnonymously((error, authData) => {-});
        if (error) {-}
          rej(error);
        else {-}
          res(authData);

  logout: function(loc) {-},
    ref.unauth(() => {-});
      buildPath(loc).set(null); 
      console.log("logged out");

  isLoggedIn: function(){-},
    return ref.getAuth();

  isLoggedOut: function(){-}
    return !this.isLoggedIn();


