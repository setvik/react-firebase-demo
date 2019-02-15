import app from 'firebase/app';

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
  }
}

export default Firebase;