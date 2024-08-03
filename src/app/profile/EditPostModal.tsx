import ReactQuilEditor from "@/components/shared/ReactQuilEditor";
import { Modal } from "antd";

interface EditPostModalProps {
  isPostModalVisible: boolean;
  handlePostOk: () => Promise<void>;
  handlePostCancel: () => void;
  valueEditor: string;
  setValueEditor: React.Dispatch<React.SetStateAction<string>>;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  isPostModalVisible,
  handlePostOk,
  handlePostCancel,
  valueEditor,
  setValueEditor,
}) => {
  return (
    <Modal
      title="Edit Post"
      open={isPostModalVisible}
      onOk={handlePostOk}
      closable={false}
      footer={[
        <button
          key={"cancel"}
          className={`px-4 py-2 rounded-xl focus:outline-none border `}
          onClick={() => handlePostCancel()}
        >
          Cancel
        </button>,
        <button
          key={"ok"}
          className={`px-4 py-2 rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white ml-2`}
          onClick={() => handlePostOk()}
        >
          Update
        </button>,
      ]}
    >
      <ReactQuilEditor
        valueEditor={valueEditor}
        setValueEditor={setValueEditor}
      />
    </Modal>
  );
};

export default EditPostModal;
