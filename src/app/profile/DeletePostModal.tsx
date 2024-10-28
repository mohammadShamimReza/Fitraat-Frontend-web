import { Modal } from "antd";

interface DeletePostModalProps {
  isDeleteModalVisible: boolean;
  handleDeleteOk: () => Promise<void>;
  handleDeleteCancel: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isDeleteModalVisible,
  handleDeleteOk,
  handleDeleteCancel,
}) => {
  return (
    <Modal
      title="Delete Post"
      open={isDeleteModalVisible}
      onOk={handleDeleteOk} // Call the delete function on confirmation
      onCancel={handleDeleteCancel} // Close the modal on cancel
      closable={false}
      footer={[
        <button
          key={"cancel"}
          className={`px-4 py-2 rounded-xl focus:outline-none border `}
          onClick={() => handleDeleteCancel()}
        >
          Cancel
        </button>,
        <button
          key={"delete"}
          className={`px-4 py-2 rounded-xl focus:outline-none bg-red-400 hover:bg-red-500 text-white ml-2`}
          onClick={() => handleDeleteOk()}
        >
          Delete
        </button>,
      ]}
    >
      <p>Are you sure you want to delete this post?</p>
    </Modal>
  );
};

export default DeletePostModal;
