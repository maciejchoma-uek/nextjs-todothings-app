import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};
