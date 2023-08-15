
import { auth, database } from "../firebase"; // Replace with your Firebase configuration imports
import { registrationFailure, registrationStart, registrationSuccess } from "../reducers/userSlice";

export const registerUser = (email, password, userData) => async (dispatch) => {
  try {
    dispatch(registrationStart());

    // Register the user using Firebase authentication
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    // Save additional user data to the Realtime Database
    await database.ref(`users/${userCredential.user.uid}`).set(userData);

    dispatch(registrationSuccess(userCredential.user));
  } catch (error) {
    dispatch(registrationFailure(error.message));
  }
};
