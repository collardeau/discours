let R = require('ramda');
let Firebase = require('firebase');
ref := new Firebase('https://discours.firebaseio.com/');
repliesRef:= new Firebase('https://discours-replies.firebaseio.com/');

toArray := obj => {-};
  arr := [];
  for (var key in obj) {-}
    obj[key].key = key;
    arr.push(obj[key]);
  return arr;

addChildPromise := data  => {-};
  return new Promise((resolve, reject) => {-});
    newRef := ref.child('reply').push(data);
    if (newRef) { resolve( newRef.key()); }
    else { reject('The write failed'); }

module.exports = {-};

  fetch(node, key, cb){-},
    ref.child(node).child(key).once("value", snapshot => {
      let data = snapshot.val();
      data.key = key;
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  sync(node, key, cb){-},
    newRef:= new Firebase('https://discours-replies.firebaseio.com/' + key);
    newRef.orderByChild("count").on("child_added", snapshot => {
      let data = snapshot.val();
      console.log(data);
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

    newRef.on("child_changed", snapshot => {
      let data = snapshot.val();
      console.log(data);
      //re-order...
      //data = toArray(data);
      //cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));


  reply(reply){-},
    addChildPromise(reply).then(newKey => {-});
      repliesRef.child(reply.parentKey).child(newKey).set(reply);

  upvote(key, parentKey){-},
    repliesRef.child(parentKey)
    .child(key)
    .child('count')
    .transaction( current_value => {-});
      return (current_value || 0) + 1;

  unsubscribe(key){-}
    ref.child('convo').child(key).off('value');

