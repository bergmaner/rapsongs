import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  getComments({ albumId,onSnapshot }){
    const albumRef = this.db.collection('albums').doc(albumId);
    return this.db.collection('comments').where('album', '==',albumRef).onSnapshot( onSnapshot )
  }

  async getUserProfile({userId}) {
    return this.db.collection('profiles').where('userId','==',userId).get();
  }

  async register({email, password, username}) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection('profiles').doc(username).set({
      userId: newUser.user.uid
    });
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
