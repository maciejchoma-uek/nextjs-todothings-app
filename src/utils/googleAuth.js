import { auth, firestore, googleProvider, storage } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const loginUserWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const userRef = doc(firestore, "users", userCredential.user.uid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    if (!userData.avatar && userCredential.user.photoURL) {
      const response = await fetch(userCredential.user.photoURL);
      const blob = await response.blob();
      const avatarRef = ref(storage, `avatars/${userCredential.user.uid}`);
      await uploadBytes(avatarRef, blob);

      const downloadURL = await getDownloadURL(avatarRef);
      const userRef = doc(firestore, "users", userCredential.user.uid);
      await setDoc(userRef, { avatar: downloadURL }, { merge: true });
    }

    await setDoc(
      userRef,
      { email: userCredential.user.email },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
  }
};
