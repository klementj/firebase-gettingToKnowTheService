import "dotenv/config"
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**
 * AUTHENTICATION
 * 
 * 1. functions
 * 2. eventlistener
 */

// 1. functions
function toggleSignIn() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  if (email.length < 4) {
    alert('Please enter an email address.')
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.')
    return;
  }
  // Sign in with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then( response => {
      alert(response)
    })
    .catch( error => {
      const errorCode = error.code
      const errorMessage = error.message

      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.')
      } else {
        alert(errorMessage)
      }
      console.log(error);
      document.getElementById('sign-in').disabled = false
    })

  document.getElementById('sign-in').disabled = true
}

function signUp() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( response => {
      alert(response)
    })
    .catch( error => {
      const errorCode = error.code
      const errorMessage = error.message

      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.')
      } else {
        alert(errorMessage)
      }
      console.log(error);
    })
}

function sendPasswordReset() {
  const email = document.getElementById('email').value

  firebase.auth().sendPasswordResetEmail(email)
    .then( () => {
      alert('Password reset email sent!')
    })
    .catch( error => {
      const errorCode = error.code
      const errorMessage = error.message

      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage)
      }
      if (errorCode == 'auth/user-not-found') {
        alert(errorMessage)
      }
    })
}

// 2. eventlisteners
document.getElementById('sign-in').addEventListener('click', toggleSignIn, false)
document.getElementById('sign-up').addEventListener('click', signUp, false)
document.getElementById('resetPassword').addEventListener('click', sendPasswordReset, false)


/**
 * WORKOUTS
 * 
 * 1. functions
 * 2. eventlistener
 */

function getWorkouts() {
  const workouts = firebase.firestore().collection('workouts')

  workouts
    .get()
    .then( querySnapshot => {
        querySnapshot.forEach( doc => {
            console.log(doc.id, " => ", doc.data())
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error)
    });
}

document.getElementById('get-workouts').addEventListener('click', getWorkouts, false)