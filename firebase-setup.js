var firebaseConfig = {
    apiKey: "AIzaSyDKq0FDkA_EzmxSat8tWkLzQoQXbVOQVCI",
    authDomain: "learn-624fd.firebaseapp.com",
    databaseURL: "https://learn-624fd.firebaseio.com",
    projectId: "learn-624fd",
    storageBucket: "learn-624fd.appspot.com",
    messagingSenderId: "550401756866",
    appId: "1:550401756866:web:a96461b41cc3b79fc4355b",
    measurementId: "G-EW34NZ6VRC"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db=firebase.firestore();
const auth=firebase.auth();