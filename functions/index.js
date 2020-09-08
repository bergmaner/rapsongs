const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

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

function checkAuthentication(context) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be signed to comment"
    )
  }
}
