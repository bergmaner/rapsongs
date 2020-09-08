const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.postComment = functions.https.onCall(async(data, context) => {
const db = admin.firestore();
const snapshot = await db
.collection('profiles')
.where('userId','==',context.auth.uid)
.limit(1)
.get();
  await db.collection('comments').add({
    content: data.content,
    username: snapshot.docs[0].id,
    dateCreated: new Date(),
    album: db.collection('albums').doc(data.albumId)
})
});
