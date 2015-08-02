let R = require('ramda');
let Firebase = require('firebase');
ref := new Firebase('https://discours.firebaseio.com/');

toArray := obj => {-};
  arr := [];
  for (var key in obj) {-}
    obj[key].key = key;
    arr.push(obj[key]);
  return arr;

addConvoPromise := (convo) => {-};
  return new Promise((resolve, reject) => {-});
    newRef := ref.child('convo').push(convo);
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
    ref.child(node).child(key).on("value", snapshot => {
      let data = snapshot.val();
      data = toArray(data);
      cb(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  reply(reply){-},
    addConvoPromise(reply).then(newKey => {-});
      ref.child('convo').child(reply.parentKey)
      .child('replies').child(newKey).set(reply);

  upvote(key, parentKey){-},
    ref.child('convo').child(parentKey)
    .child('replies').child(key)
    .child('count')
    .transaction( current_value => {-});
      return (current_value || 0) + 1;

  unsubscribe(key){-}
    ref.child('convo').child(key).off('value');

