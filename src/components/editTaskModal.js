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
  const [taskDescription, setTaskDescription] = useState("");

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
    console.log(event.target.value);
  };

  const handleTaskDescription = (event) => {
    setTaskDescription(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (isModalOpen) {
      setOriginalData(passedTask);
      setTaskName(passedTask.taskName);
      setTaskDescription(passedTask.taskDescription);
    }
  }, [isModalOpen]);

  return (
    <Modal
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-blue-700 bg-opacity-25 backdrop-blur-sm z-0"
      className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 width-10/12 z-1 h-4/6 max-h-10/12 bg-blue-950 flex justify-center align-middle"
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
    >
      <form>
        <input
          onChange={handleTaskName}
          value={taskName}
          name="taskName"
          placeholder="Task name"
        ></input>
        <input
          onChange={handleTaskDescription}
          value={taskDescription}
          name="taskDescription"
          placeholder="Task description"
        ></input>
        {passedTask && JSON.stringify(passedTask)}
        <input
          onClick={async (event) => {
            event.preventDefault();
            try {
              await editTask(originalData, { taskName, taskDescription });
            } catch (error) {
              console.error(error);
            }
            handleCloseModal();
          }}
          type="submit"
          value="edit task"
        ></input>
        {/* {error && error} */}
      </form>
    </Modal>
  );
}
