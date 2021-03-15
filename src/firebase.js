import firebase from 'firebase/app';    
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBJkNfXMRMn5yBFiLs0hJ6QuZIhqW9SgfE",
    authDomain: "crud-21b08.firebaseapp.com",
    projectId: "crud-21b08",
    storageBucket: "crud-21b08.appspot.com",
    messagingSenderId: "1003808121275",
    appId: "1:1003808121275:web:a69152cbca87f10202a49e"
  };

  export const fireBaseApp = firebase.initializeApp(firebaseConfig);