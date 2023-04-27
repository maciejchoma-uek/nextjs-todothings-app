import { auth, firestore } from "./firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";

export const addTask = async (task) => {
  try {
    const tasksRef = doc(firestore, "tasks", auth.currentUser.uid);
    const docSnap = await getDoc(tasksRef);
    const data = docSnap.data();
    let tasks;
    if (data) {
      tasks = data.tasks ? data.tasks : [];
    } else {
      tasks = [];
    }
    if (tasks.some((obj) => obj["taskName"] === task.taskName)) {
      throw new Error("Can't add task with the same name as exists.");
    } else {
      tasks.push(task);
      await setDoc(tasksRef, { tasks }, { merge: true });
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskToDelete) => {
  const taskRef = doc(firestore, "tasks", auth.currentUser.uid);

  const querySnapshot = await getDoc(taskRef);
  const tasks = querySnapshot.data().tasks;

  const updatedTasks = tasks.filter(
    (task) => task.taskName !== taskToDelete.taskName
  );

  await updateDoc(taskRef, { tasks: updatedTasks });
};

export const editTask = async (taskToEdit, editedTask, changeState) => {
  const taskRef = doc(firestore, "tasks", auth.currentUser.uid);
  const docSnapshot = await getDoc(taskRef);
  if (docSnapshot.exists()) {
    const tasks = docSnapshot.data().tasks;
    const indexToUpdate = tasks.findIndex(
      (task) => task.taskName === taskToEdit.taskName
    );

    tasks[indexToUpdate].taskName = editedTask.taskName;
    tasks[indexToUpdate].taskDescription = editedTask.taskDescription;
    if (changeState != undefined && changeState != null) {
      tasks[indexToUpdate].isCompleted = changeState;
    }

    await updateDoc(taskRef, { tasks });
  } else {
    console.error("Document doesn't exist.");
  }
};
