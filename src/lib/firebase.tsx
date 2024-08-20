// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: configure rules below.
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfxRosnKVA5Og6vus90xxeWEATLUsMC7E",
  authDomain: "minerva-lib.firebaseapp.com",
  projectId: "minerva-lib",
  storageBucket: "minerva-lib.appspot.com",
  messagingSenderId: "247998929045",
  appId: "1:247998929045:web:709c4dcba43b462772e39c",
  measurementId: "G-2ZZC3KRHMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);