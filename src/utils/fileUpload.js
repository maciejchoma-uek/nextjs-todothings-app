import { storage, firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadAvatar = async (file, userId) => {
  const storageRef = ref(storage, `avatars/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  const avatarRef = doc(firestore, "avatars", userId);
  await setDoc(avatarRef, { avatar: downloadURL }, { merge: true });
  return downloadURL;
};
