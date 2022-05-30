import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";
import {db} from './firestore-sync'

const firebaseConfig = {
  apiKey: "AIzaSyA-9chYdnRAg-92Pf-fYakzv7-pAhp03Yo",
  authDomain: "freshcatch-700a3.firebaseapp.com",
  projectId: "freshcatch-700a3",
  storageBucket: "freshcatch-700a3.appspot.com",
  messagingSenderId: "995836996592",
  appId: "1:995836996592:web:9ffda8b37f48806d550b35",
  measurementId: "G-GTMS72C6C5",
  databaseURL:
    "https://freshcatch-700a3-default-rtdb.asia-southeast1.firebasedatabase.app",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

window.CasualSeller = {
  db: db()
}

ReactDOM.render(
  <React.StrictMode>
    <App merchantPhone="14082194490" orderId="3EB0228C23AACDFFA313" amt={10.00} onSendCart={() => {
      alert(1)
    }} />
  </React.StrictMode>,
  document.getElementById("root")
);
