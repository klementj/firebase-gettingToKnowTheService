'use strict';
import "dotenv/config"
import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "process.env.API_KEY",
  authDomain: "process.env.AUTH_DOMAIN",
  databaseURL: "process.env.DB_URL",
  projectId: "process.env.PROJECT_ID",
  storageBucket: "process.env.STORAGE_BUCKET",
  messagingSenderId: "process.env.SENDER_ID",
  appId: "process.env.APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

// Authentication
const auth = firebase.auth()

auth.createUserWithEmailAndPassword(email, password)

// Elements
const result = document.getElementById('result')


db.collection("workouts").get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  });
});

const videos = []
db.collection('workouts').get()
  .then( querySnapshot => {
    querySnapshot.forEach( doc => {
      const workout = doc.data()
      workout.userRef.get()
        .then( video => {
          video = video.data()
          videos.push(video)
        })
    })
  })
  .catch( error => {
    console.error(error)
})

const comments = []
db.collection('/comments').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    const comment = doc.data()
    comment.userRef.get().then(snap => {
      comment.user = snap.data()
      comments.push(comment)
    })
  })
})

// Event listeners
document.getElementById('workoutBtn').addEventListener('click', () => {
  // getWorkouts()
})




var docRef = db.collection("workouts").doc("workout001");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});