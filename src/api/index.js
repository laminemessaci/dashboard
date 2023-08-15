// import { Alert } from 'react-native';
// import { firebase, usersCollection,articlesCollection,videosCollection } from '../../firebase';

// export const registerUser = async({ email,password }) =>{
//     try{
//         const response = await firebase.auth()
//         .createUserWithEmailAndPassword(email,password);

//         const {user} = response;
//         const userProfile = {
//             uid: user.uid,
//             email: email
//         };
//         await usersCollection.doc(user.uid).set(userProfile);
//         return { isAuth: true, user:userProfile }
//     }catch(error){
//         return { error:error.message }
//     }
// }

// export const loginUser = async({ email,password }) =>{
//     try{
//         const response =await firebase.auth()
//         .signInWithEmailAndPassword(email,password);

//         const userProfile = await usersCollection.doc(response.user.uid).get();
//         const data = userProfile.data();

//         return { isAuth: true, user:data }
//     }catch(error){
//         return { error:error.message }
//     }
// }

// export const autoSignIn = () => (
//     new Promise((resolve,reject)=>{
//         firebase.auth().onAuthStateChanged( user => {
//             if(user){
//                 usersCollection.doc(user.uid).get().then( snapshot =>{
//                     resolve({ isAuth: true, user: snapshot.data() })
//                 })
//             } else {
//                 resolve({ isAuth: false, user:[] })
//             }
//         })
//     })
// )

// export const logoutUser = () => (
//     firebase.auth().signOut()
// )

// export const updateUserData = async(values,user) => {
//     try{
//         const collection = usersCollection.doc(user.uid);
//         const update = await collection.update(values);

//         const newUser = {
//             ...user,
//             ...values
//         }
//         return { user: newUser, error: null }
//     }catch(error){
//         return { user: user, error: error }
//     }
// }

// /// articles

// export const getArticles = async() => {
//     try{
//         const response = await articlesCollection
//         .where('public','==',1)
//         .orderBy('createdAt')
//         .limit(3)
//         .get();

//         const lastPostVisible = response.docs[response.docs.length-1];
//         const articles = response.docs.map( doc => ({
//             id: doc.id,...doc.data()
//         }));
//         return { posts: articles,lastPostVisible: lastPostVisible }
//     }catch(error){
//         console.log(error);
//         return error
//     }
// }

// export const getMoreArticles = async(articles) => {
//     let posts = [...articles.posts];
//     let lastPostVisible = articles.lastPostVisible

//     try {
//         if(lastPostVisible){
//             const response = await articlesCollection
//             .where('public','==',1)
//             .orderBy('createdAt')
//             .startAfter(lastPostVisible)
//             .limit(2)
//             .get();

//             lastPostVisible = response.docs[response.docs.length-1];
//             const newArticles = response.docs.map( doc => ({
//                 id: doc.id,...doc.data()
//             }));
//             return { posts:[...articles.posts,...newArticles], lastPostVisible}
//         }
//         return { posts,lastPostVisible}
//     } catch(error){
//         alert(error)
//         return { posts,lastPostVisible}
//     }
// }

// export const getVideos = async() => {
//     try{
//         const response = await videosCollection
//         .where('public','==',1)
//         .orderBy('createdAt')
//         .limit(3)
//         .get();

//         const lastVideoVisible = response.docs[response.docs.length-1];
//         const videos = response.docs.map( doc => ({
//             id: doc.id,...doc.data()
//         }));
//         return { videos: videos,lastVideoVisible: lastVideoVisible }
//     }catch(error){
//         console.log(error);
//         return error
//     }
// }

// export const getMoreVideos = async(articles) => {
//     let videos = [...articles.videos];
//     let lastVideoVisible = articles.lastVideoVisible

//     try {
//         if(lastVideoVisible){
//             const response = await videosCollection
//             .where('public','==',1)
//             .orderBy('createdAt')
//             .startAfter(lastVideoVisible)
//             .limit(2)
//             .get();

//             lastVideoVisible = response.docs[response.docs.length-1];
//             const newArticles = response.docs.map( doc => ({
//                 id: doc.id,...doc.data()
//             }));
//             return { videos:[...articles.videos,...newArticles], lastVideoVisible}
//         }
//         return { videos,lastVideoVisible}
//     } catch(error){
//         alert(error)
//         return { videos,lastVideoVisible}
//     }
// }
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { timestamp } from "../utils/formatter";
import { db } from "../firebase/index.js";
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
    // return await getDocs(collection(db, "posts"));
  } catch (error) {
    console.log("Error when getting posts from firebase:  ", error);
  }
};

/**
 * Retrieves all users from the Firebase collection.
 *
 * @return {Promise<QuerySnapshot<DocumentData>>} A promise that resolves to a QuerySnapshot containing the users.
 */
export const getUsers = async () => {
  try {
    return await getDocs(collection(db, "users"));
  } catch (error) {
    console.log("Error when getting users from firebase:  ", error);
  }
};


/**
 * Retrieves the documents from the "devises" collection in Firebase.
 *
 * @return {Promise<Array>} A promise that resolves to an array of documents.
 */
export const getDevises = async () => {
  try {
    return await getDocs(collection(db, "devises"));
  } catch (error) {
    console.log("Error when getting devises from firebase:  ", error);
  }
};

