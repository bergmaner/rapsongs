const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.postComment = functions.https.onCall((data, context) => {
const db = admin.firestore();
return db.collection('profiles').where('userId','==',context.auth.uid)
.limit(1)
.get().then((snapshot) => {
  return db.collection('comments').add({
    content: data.content,
    username: snapshot.docs[0].ref,
    dateCreated: new Date(),
    album: db.collection('albums').doc(data.albumId)
  })
})
});
