import { auth, firestore, googleProvider, storage } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const loginUserWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const avatarRef = doc(firestore, "avatars", userCredential.user.uid);
    const userRef = doc(firestore, "users", userCredential.user.uid);
    const avatarSnapshot = await getDoc(avatarRef);
    const userData = avatarSnapshot.data()
      ? avatarSnapshot.data()
      : { avatar: null };

    if (!userData.avatar && userCredential.user.photoURL) {
      const response = await fetch(userCredential.user.photoURL);
      const blob = await response.blob();
      const storageAvatarRef = ref(
        storage,
        `avatars/${userCredential.user.uid}`
      );
      await uploadBytes(storageAvatarRef, blob);

      const downloadURL = await getDownloadURL(storageAvatarRef);
      const avatarRef = doc(firestore, "avatars", userCredential.user.uid);
      await setDoc(avatarRef, { avatar: downloadURL }, { merge: true });
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
