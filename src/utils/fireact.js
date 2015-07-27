let Firebase = require('firebase');
ref := new Firebase('https://tc-react-boilerplate.firebaseio.com/');

toArray := obj => {-};
  arr := [];
  for (var key in obj) {-}
    //obj[key].key = key;
    arr.push(obj[key]);
  return arr;

addConvoPromise := (convo) => {-};
  return new Promise((resolve, reject) => {-});
    newRef := ref.child('convo').push(convo);
    if (newRef) { resolve( newRef.key()); }
    else { reject('The write failed'); }

module.exports = {-};

  subscribe(id, ui){-},
    ref.child('convo').child(id).on("value", snapshot => {
      let data = snapshot.val();
      data.replies = toArray(data.replies);
      ui(data);
    }, errorObject => console.log("The read failed: " + errorObject.code));

  addReply(parentId, reply){-},
    addConvoPromise(reply).then(cId => {-});
      ref.child('convo').child(parentId).child('replies').child(cId).set(reply);

  unsubscribe(options){-}
    //buildPath(options.loc).off('value');

