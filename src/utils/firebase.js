import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_q7FfLzqYt1ZW20l7AY2U2z2LjG-S8oE",
  authDomain: "nextjs-todothings-app.firebaseapp.com",
  projectId: "nextjs-todothings-app",
  storageBucket: "nextjs-todothings-app.appspot.com",
  messagingSenderId: "980277790829",
  appId: "1:980277790829:web:9272813671f40c37435764",
  measurementId: "G-4J87P6WGKZ",
};

// Initialize Firebase
const myApp = initializeApp(firebaseConfig);
const auth = getAuth(myApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(myApp);

let currentUser = null;

auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
    const userRef = doc(firestore, "users", user.uid);
    setDoc(userRef, { email: user.email }, { merge: true });
  } else {
    currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
  }
});

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userRef = doc(firestore, "users", userCredential.user.uid);
    await setDoc(
      userRef,
      { email: userCredential.user.email },
      { merge: true }
    );

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUserWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);

    return userCredential.user;
  } catch (error) {
    console.error("Google registration failed:", error);
    // Show an error message
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    throw error;
  }
};
