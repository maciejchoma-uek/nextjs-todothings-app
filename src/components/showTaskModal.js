import Modal from "react-modal";
import { useState } from "react";
import { addTask } from "@/utils/firebase";

export default function ShowTaskModal({ task, isModalOpen, handleCloseModal }) {
  return <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}></Modal>;
}
