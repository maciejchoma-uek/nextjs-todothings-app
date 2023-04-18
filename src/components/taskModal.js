import Modal from "react-modal";
import { useState } from "react";
import { addTask } from "@/utils/firebase";

export default function TaskModal({ isModalOpen, handleCloseModal }) {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleSubmitForm = (event) => {
        event.preventDefault();
        console.log(event.target);
        console.log(taskName, taskDescription);

        addTask({taskName, taskDescription});
    }

    const handleTaskName = (event) => {
        setTaskName(event.target.value);
    }

    const handleTaskDescription = (event) => {
        setTaskDescription(event.target.value);
    }


    return (
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
            <form>
                <label htmlFor="taskName">Task Name</label>
                <input onChange={handleTaskName} name="taskName" placeholder="Task name"></input>
                <label htmlFor="taskDescription" >Task Description</label>
                <input onChange={handleTaskDescription} name="taskDescription" placeholder="Task description"></input>
                <input onClick={handleSubmitForm} type="submit" value="add task"></input> 
            </form>
        </Modal>
    )
}
