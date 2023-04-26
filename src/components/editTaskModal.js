import Modal from "react-modal";

export default function EditTaskModal({
  passedTask,
  isModalOpen,
  handleCloseModal,
  fetchData,
}) {
  return (
    <Modal
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-blue-700 bg-opacity-25 backdrop-blur-sm z-0"
      className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 width-10/12 z-1 h-4/6 max-h-10/12 bg-blue-950 flex justify-center align-middle"
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
    >
      {passedTask && JSON.stringify(passedTask)}
    </Modal>
  );
}
