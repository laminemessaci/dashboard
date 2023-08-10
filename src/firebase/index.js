import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import firebase from "firebase/app";

import { timestamp, dateFormat } from "../utils/formatter";
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_SECRET_KEY as secretKey,
} from "@env";

// Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



/**
 * Creates a new user with the provided information.
 *
 * @param {Object} user - The user object.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {string} user.email - The email address of the user.
 * @param {string} user.password - The password of the user.
 * @param {Date} user.birthDate - The birth date of the user.
 * @param {string} user.address - The address of the user.
 * @param {string} user.country - The country of the user.
 * @param {string} user.postalCode - The postal code of the user.
 * @return {Promise<void>} - A promise that resolves when the user is created successfully.
 */
export const createNewUser = async ({
  firstName,
  lastName,
  email,
  password,
  birthDate,
  address,
  country,
  postalCode,
}) => {
  const user = {
    firstName,
    lastName,
    email,
    password,
    birthDate,
    address,
    country: country,
    postalCode: postalCode,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await addDoc(collection(db, "users"), user)
    .then((docRef) => {
      console.log("Document added with ID:", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
    });
};


 
