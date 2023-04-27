import Modal from "react-modal";
import { useState } from "react";
import { addTask } from "@/utils/taskManagement";
import { useEffect } from "react";

export default function AddTaskModal({
  isModalOpen,
  handleCloseModal,
  fetchData,
  userCity,
  userLocation,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      setTaskName("");
      setTaskDescription("");
      setError("");
    }
  }, [isModalOpen]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    let errorOccured = false;

    try {
      await addTask({
        taskName,
        taskDescription,
        userLocation,
        userCity,
        isCompleted: false,
      });
    } catch (error) {
      setError(error);
      errorOccured = true;
      if ("vibrate" in navigator) {
        navigator.vibrate([500]);
      }
    }

    if (!errorOccured) {
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 100, 100]);
      }
      handleCloseModal();
    }
  };

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  return (
    <Modal
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-blue-700 bg-opacity-25 backdrop-blur-sm z-0"
      className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 width-10/12 z-1 h-4/6 max-h-10/12 bg-blue-950 flex justify-center align-middle"
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
    >
      <form>
        <label htmlFor="taskName">Task Name</label>
        <input
          onChange={handleTaskName}
          name="taskName"
          placeholder="Task name"
        ></input>
        <label htmlFor="taskDescription">Task Description</label>
        <input
          onChange={handleTaskDescription}
          name="taskDescription"
          placeholder="Task description"
        ></input>
        <input
          onClick={(event) => {
            handleSubmitForm(event);
          }}
          type="submit"
          value="add task"
        ></input>
      </form>
      {error.length != 0 && <div>{error.toString()}</div>}
    </Modal>
  );
}
