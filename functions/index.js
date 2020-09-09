const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

exports.createArtist = functions.https.onCall(async (data,context) => {
  checkAuthentication(context);
  dataValidate(data, {
    artistName: "string",
  })

  const artist = await admin.firestore().collection('artists').where("name","==",data.artistName).limit(1).get()

  if(!artist.empty){
    throw new functions.https.HttpsError(
      "already-exists",
      "This artist already exists"
    )
  }

  return admin.firestore().collection("artists").add({
    name: data.artistName
  })

})

exports.createProfile = functions.https.onCall(async (data, context) => {
  checkAuthentication(context)
  dataValidate(data, {
    username: "string",
  })

  const userProfile = await admin
    .firestore()
    .collection("profiles")
    .where("userId", "==", context.auth.uid)
    .limit(1)
    .get()

    if(!userProfile.empty){
      throw new functions.https.HttpsError(
        "already-exists",
        "This user already has a profile"
      )
    }

  const profile = await admin
    .firestore()
    .collection("profiles")
    .doc(data.username)
    .get()
  if (profile.exists) {
    throw new functions.https.HttpsError(
      "already-exists",
      "This username already exists"
    )
  }

  const user = await admin.auth().getUser(context.auth.uid);
  if(user.email === functions.config().accounts.admin){
    console.log('kk')
    await admin.auth().setCustomUserClaims(context.auth.uid, {admin: true});
  }

  return admin.firestore().collection('profiles').doc(data.username).set({
    userId: context.auth.uid
  })

})

exports.postComment = functions.https.onCall(async (data, context) => {
  checkAuthentication(context)
  dataValidate(data, {
    albumId: "string",
    content: "string",
  })

  const db = admin.firestore()
  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", context.auth.uid)
    .limit(1)
    .get()
  await db.collection("comments").add({
    content: data.content,
    username: snapshot.docs[0].id,
    dateCreated: new Date(),
    album: db.collection("albums").doc(data.albumId),
  })
})

function dataValidate(data, validKeys) {
  if (Object.keys(data).length !== Object.keys(validKeys).length) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid number of properties"
    )
  } else {
    for (let key in data) {
      if (!validKeys[key] || typeof data[key] !== validKeys[key])
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Invalid type of data"
        )
    }
  }
}

function checkAuthentication(context, admin) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be signed to comment"
    )
  }
  else if(!context.auth.token.admin && admin){
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be admin to use this feature"
    )
  }
}
