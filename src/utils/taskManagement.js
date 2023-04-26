import { auth, firestore } from "./firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";

export const addTask = async (task) => {
  try {
    const userRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const tasks = data.tasks ? data.tasks : [];
      if (tasks.some((obj) => obj["taskName"] === task.taskName)) {
        throw new Error("Can't add task with the same name as exists.");
      } else {
        tasks.push(task);
        await setDoc(userRef, { tasks }, { merge: true });
      }
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskToDelete) => {
  const taskRef = doc(firestore, "users", auth.currentUser.uid);

  const querySnapshot = await getDoc(taskRef);
  const tasks = querySnapshot.data().tasks;

  const updatedTasks = tasks.filter(
    (task) => task.taskName !== taskToDelete.taskName
  );

  await updateDoc(taskRef, { tasks: updatedTasks });
};