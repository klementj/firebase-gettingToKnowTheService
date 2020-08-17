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