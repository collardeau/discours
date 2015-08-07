let R = require('ramda');
let Firebase = require('firebase');
ref := new Firebase('https://discours.firebaseio.com/');
repliesRef:= new Firebase('https://discours-replies.firebaseio.com/');

buildPath:= path => {-}
  p:= path.slice(); 
  return p.reduce((prev, next) => {-}, ref);
      return prev.child(next);

module.exports = {-};

  fetch(loc, cb){-},
    buildPath(loc).once("value", snapshot => {
      let data = snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  sync(key, cb){-},
    repliesRef.child(key).on("child_added", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  syncByCount(key, cb){-},
    repliesRef.child(key).orderByChild("count").on("child_added", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  syncOnChange(key, cb){-},
    repliesRef.child(key).on("child_changed", snapshot => {
      data:= snapshot.val();
      data.key = snapshot.key();
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  unsync(key){-},
    repliesRef.child(key).orderByChild('count').off();
    repliesRef.child(key).off();

  pushPromise(loc, data) {-},
    return new Promise((resolve, reject) => {-});
      newRef:= buildPath(loc).push(data);
      if (newRef) { resolve( newRef.key()); }
      else { reject('The write failed'); }

  set(loc, data) {-},
    console.log(loc);
    console.log(buildPath(loc));
    buildPath(loc).set(data);  


  upvote(key, topicKey){-}
    repliesRef.child(topicKey)
    .child(key)
    .child('count')
    .transaction( current_value => {-});
      return (current_value || 0) - 1;


