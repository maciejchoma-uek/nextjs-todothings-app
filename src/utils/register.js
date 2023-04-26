import { auth, firestore } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (email, password) => {
  try {
    console.log(auth);

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
    console.log(auth);
  } catch (error) {
    throw error;
  }
};
