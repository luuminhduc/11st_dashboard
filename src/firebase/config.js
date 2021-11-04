

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCERf1NIfmSHdIyX8IYeDggpkYTI2bP7Lc",
  authDomain: "street-22c60.firebaseapp.com",
  projectId: "street-22c60",
  storageBucket: "street-22c60.appspot.com",
  messagingSenderId: "792108034997",
  appId: "1:792108034997:web:601003483639b24788c7fc"
};

firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();

  export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

  export const storage = firebase.storage()

  export default firebase;