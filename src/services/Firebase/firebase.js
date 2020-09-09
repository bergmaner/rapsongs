import firebaseConfig from "./config"

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig)

      this.auth = app.auth()
      this.db = app.firestore()
      this.functions = app.functions()
      this.storage = app.storage()
    }
  }

  getComments({ albumId, onSnapshot }) {
    const albumRef = this.db.collection("albums").doc(albumId)
    return this.db
      .collection("comments")
      .where("album", "==", albumRef)
      .orderBy("dateCreated", "desc")
      .onSnapshot(onSnapshot)
  }

  async postComment({ content, albumId }) {
    const postCommentCallable = this.functions.httpsCallable("postComment")
    return postCommentCallable({
      content,
      albumId,
    })
  }

  getUserProfile({ userId, onSnapshot }) {
    
    return this.db
    .collection("profiles")
    .where("userId", "==", userId)
    .limit(1)
    .onSnapshot(onSnapshot)
  }

  async register({ email, password, username }) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )
    const createProfileCallable =  this.functions.httpsCallable('createProfile');
    return createProfileCallable({
      username
    })
  }

  async createArtist({artistName}){
    const createArtistCallable = this.functions.httpsCallable('createArtist');
    return createArtistCallable({
      artistName
    })
  }

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut()
  }
}

let firebaseInstance

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app)
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance
