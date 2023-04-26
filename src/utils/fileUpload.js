import { storage, firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadAvatar = async (file, userId) => {
  const storageRef = ref(storage, `avatars/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  const userRef = doc(firestore, "users", userId);
  await setDoc(userRef, { avatar: downloadURL }, { merge: true });
  return downloadURL;
};
