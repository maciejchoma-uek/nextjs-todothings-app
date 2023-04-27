import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const myApp = initializeApp(firebaseConfig);
export const auth = getAuth(myApp);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(myApp);
export const storage = getStorage(myApp);

export const getUserData = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const avatarRef = doc(firestore, "avatars", userId);
    const tasksRef = doc(firestore, "tasks", userId);
    const userDoc = await getDoc(userRef);
    const avatarDoc = await getDoc(avatarRef);
    const tasksDoc = await getDoc(tasksRef);
    return {
      email: userDoc.data() ? userDoc.data().email : null,
      avatar: avatarDoc.data() ? avatarDoc.data().avatar : null,
      tasks: tasksDoc.data() ? tasksDoc.data().tasks : null,
    };
  } catch (error) {
    throw error;
  }
};
