import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwQS48Vo4t4I3qVQG3xsOaXeAEJ7Q_mzA",
  authDomain: "identityaccessmanagement-8e27f.firebaseapp.com",
  projectId: "identityaccessmanagement-8e27f",
  storageBucket: "identityaccessmanagement-8e27f.appspot.com",
  messagingSenderId: "342739624678",
  appId: "1:342739624678:web:cd388c4fde362fcca59127",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
