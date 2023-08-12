import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

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


/**
 * Creates a new IMC record in the database.
 *
 * @param {Object} data - The data object containing the IMC record properties.
 * @param {string} data.id - The ID of the IMC record.
 * @param {string} data.name - The name associated with the IMC record.
 * @param {number} data.weight - The weight value of the IMC record.
 * @param {number} data.height - The height value of the IMC record.
 * @param {number} data.bmi - The BMI (Body Mass Index) value of the IMC record, rounded to 2 decimal places.
 * @return {Promise<void>} A promise that resolves when the IMC record is successfully added to the database.
 */
export const createIMC = async ({ id, name, weight, height, bmi }) => {
  const imc = {
    id,
    name,
    weight,
    height,
    bmi: bmi.toFixed(2),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await addDoc(collection(db, "imcs"), imc)
    .then((docRef) => {
      console.log("Document added with ID:", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
    });
};

/**
 * Creates a new devise with the given properties.
 *
 * @param {Object} params - The parameters for creating the devise.
 * @param {string} params.id - The ID of the devise.
 * @param {number} params.amount - The amount of the devise.
 * @param {string} params.currency - The currency of the devise.
 * @param {any} params.result - The result of the devise.
 * @return {Promise<void>} A promise that resolves when the devise is created.
 */
export const createDevise = async ({ id, amount, currency, result }) => {
  const device = {
    id,
    amount,
    currency,
    result,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await addDoc(collection(db, "devises"), device)
    .then((docRef) => {
      console.log("Document added with ID:", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
    });
};

/**
 * Creates a new post with the given data.
 *
 * @param {Object} post - The post data.
 * @param {string} post.id - The unique identifier of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.content - The content of the post.
 * @param {number} post.loveIts - The number of likes the post has.
 * @return {Promise<void>} A promise that resolves when the post is successfully created.
 */
export const createPost = async ({ id, title, content, loveIts }) => {
  const post = {
    id,
    title,
    content,
    loveIts,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await addDoc(collection(db, "posts"), post)
    .then((docRef) => {
      console.log("Document added with ID:", docRef);
    })
    .catch((error) => {
      console.error("Error adding document:", error);
    });
};

/**
 * Deletes a post from Firebase based on the given postId.
 *
 * @param {string} postId - The ID of the post to be deleted.
 * @return {Promise<void>} - A promise that resolves when the post is successfully deleted.
 */
export const deletePostFromFirebase = async (postId) => {
  try {
    const q = query(collection(db, "posts"), where("id", "==", postId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const postRef = querySnapshot.docs[0].ref;
      // console.log("Post Reference:", postRef);
      await deleteDoc(doc(db, "posts", postRef.id));
    } else {
      console.log("No matching post found.");
    }
  } catch (error) {
    console.error("Error getting post reference:", error);
  }
};

/**
 * Updates a post from Firebase.
 *
 * @param {string} postsId - The ID of the post to update.
 * @param {number} loveIts - The new value for the "loveIts" field.
 * @return {Promise<void>} - A promise that resolves once the update is complete.
 */
export const updatePostFromFirebase = async (postsId, loveIts) => {
  try {
    const q = query(collection(db, "posts"), where("id", "==", postsId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const postDoc = querySnapshot.docs[0];
      const postRef = querySnapshot.docs[0].ref;

      await updateDoc(postRef, { loveIts: loveIts });
      console.log("Post updated successfully.");
    } else {
      console.log("No matching post found.");
    }
  } catch (error) {
    console.error("Error getting post reference:", error);
  }
};

/**
 * Retrieves posts from the firestore database.
 *
 * @return {Promise<Array>} An array of posts.
 */
export const getPosts = async () => {
  try {
    return await getDocs(collection(db, "posts"));
  } catch (error) {
    console.log("Error when getting posts from firebase:  ", error);
  }
};
