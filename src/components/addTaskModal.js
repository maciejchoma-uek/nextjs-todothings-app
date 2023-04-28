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
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 backdrop-blur-sm z-0"
      className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-10/12 sm:w-5/12 z-1 h-4/6 rounded-2xl max-h-10/12 bg-neutral-800"
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
    >
      <div className="flex flex-col h-full justify-center items-center">
        <h1 className="text-2xl font-bold mb-5">Add a new task</h1>
        <form className="flex flex-col gap-2 items-center">
          <label htmlFor="taskName" className="font-bold text-sm text-center">
            Task Name
          </label>
          <input
            required
            onChange={handleTaskName}
            name="taskName"
            placeholder="Enter a task name..."
            className="!outline-none text-sm placeholder:leading-normal transition-all placeholder:text-xs pb-1.5 placeholder:text-neutral-200 px-3 py-1 rounded-2xl bg-neutral-700 focus:bg-neutral-600 hover:bg-neutral-600"
          ></input>
          <label
            htmlFor="taskDescription"
            className="font-bold text-sm text-center"
          >
            Task Description
          </label>
          <input
            required
            onChange={handleTaskDescription}
            name="taskDescription"
            placeholder="Enter a description..."
            className="!outline-none text-sm placeholder:leading-normal transition-all placeholder:text-xs pb-1.5 placeholder:text-neutral-200 px-3 py-1 rounded-2xl bg-neutral-700 focus:bg-neutral-600 hover:bg-neutral-600"
          ></input>
          {error.length != 0 && (
            <div className="text-xs font-light text-red-600">
              {error.toString()}
            </div>
          )}
          <input
            onClick={(event) => {
              if (taskName.length == 0 || taskDescription.length == 0) {
                setError("Please fill in both fields.");
              } else {
                handleSubmitForm(event);
              }
            }}
            type="submit"
            className="text-sm py-1 px-4 m-1 rounded-3xl bg-neutral-700 transition-all hover:bg-neutral-600 cursor-pointer"
            value="Add a new task"
          ></input>
        </form>
      </div>
    </Modal>
  );
}
