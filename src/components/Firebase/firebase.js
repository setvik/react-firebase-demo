import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC1yfU9BJrplGteTELoBf1qOrQWyz2lCO8",
  authDomain: "ischool-firebase-demo.firebaseapp.com",
  databaseURL: "https://ischool-firebase-demo.firebaseio.com",
  projectId: "ischool-firebase-demo",
  storageBucket: "ischool-firebase-demo.appspot.com",
  messagingSenderId: "429761686855"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();    
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);  
}

export default Firebase;