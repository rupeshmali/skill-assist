import { COLLECTION_NAME } from "@utils/constants";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvW7PeE-lRhsbe4qHwyXnE4Ps088bzWrc",
  authDomain: "startup-skill-assist.firebaseapp.com",
  projectId: "startup-skill-assist",
  storageBucket: "startup-skill-assist.appspot.com",
  messagingSenderId: "115468154103",
  appId: "1:115468154103:web:501d950787d59ad8ca0ff2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore();

const usersDB = collection(db, COLLECTION_NAME.USERS);

const storage = getStorage();

export { app, auth, db, usersDB, storage };