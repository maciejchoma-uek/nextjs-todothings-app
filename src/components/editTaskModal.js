import Modal from "react-modal";
import { editTask } from "@/utils/taskManagement";
import { useEffect, useState } from "react";
export default function EditTaskModal({
  passedTask,
  isModalOpen,
  handleCloseModal,
  fetchData,
}) {
  const [originalData, setOriginalData] = useState({});
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  };

  useEffect(() => {
    if (isModalOpen) {
      setOriginalData(passedTask);
      setTaskName(passedTask.taskName);
      setTaskDescription(passedTask.taskDescription);
      setError("");
    }
  }, [isModalOpen]);

  return (
    <Modal
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 backdrop-blur-sm z-0"
      className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-10/12 sm:w-5/12 z-1 h-2/6 rounded-2xl max-h-10/12 bg-neutral-800"
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
    >
      <div className="flex flex-col h-full justify-center items-center">
        <h1 className="text-2xl font-bold mb-5">Edit a task</h1>
        <form className="flex flex-col gap-2 items-center">
          <label htmlFor="taskName" className="font-bold text-sm text-center">
            Task Name
          </label>
          <input
            required
            onChange={handleTaskName}
            value={taskName}
            name="taskName"
            placeholder="Task name"
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
            value={taskDescription}
            name="taskDescription"
            placeholder="Task description"
            className="!outline-none text-sm placeholder:leading-normal transition-all placeholder:text-xs pb-1.5 placeholder:text-neutral-200 px-3 py-1 rounded-2xl bg-neutral-700 focus:bg-neutral-600 hover:bg-neutral-600"
          ></input>
          {/* {passedTask && JSON.stringify(passedTask)} */}
          {error.length != 0 && (
            <div className="text-xs font-light text-red-600">{error}</div>
          )}
          <input
            onClick={async (event) => {
              event.preventDefault();
              if (taskName.length == 0 || taskDescription.length == 0) {
                setError("Please fill in both fields.");
              } else {
                try {
                  await editTask(originalData, { taskName, taskDescription });
                } catch (error) {
                  console.error(error);
                }
                handleCloseModal();
              }
            }}
            type="submit"
            value="Save"
            className="text-sm py-1 px-4 m-1 rounded-3xl bg-neutral-700 transition-all hover:bg-neutral-600 cursor-pointer"
          ></input>
        </form>
      </div>
    </Modal>
  );
}
