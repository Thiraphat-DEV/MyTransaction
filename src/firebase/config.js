// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAOldy3ekhsQcBKr6Hbt4qVu4ZdCWmu0rQ",
  authDomain: "moneytracker-92d0b.firebaseapp.com",
  projectId: "moneytracker-92d0b",
  storageBucket: "moneytracker-92d0b.appspot.com",
  messagingSenderId: "272602218836",
  appId: "1:272602218836:web:d21bcce165acfe4d9e88c1",
  measurementId: "G-J04S696H1R"
};

firebase.initializeApp(firebaseConfig)

//init firestore service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.Timestamp
export {projectFirestore, projectAuth, timestamp}