import { Button, Form, Input, Modal } from "antd";

interface EditProfileModalProps {
  isProfileModalVisible: boolean;
  handleProfileOk: (values: any) => Promise<void>;
  handleProfileCancel: () => void;
  name: string;
  age: number | null;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isProfileModalVisible,
  handleProfileOk,
  handleProfileCancel,
  name,
  age,
}) => {
  return (
    <Modal
      title="Edit Profile"
      open={isProfileModalVisible}
      onCancel={handleProfileCancel}
      footer={null}
    >
      <Form
        onFinish={handleProfileOk}
        initialValues={{
          username: name,
          age: age,
          country: location,
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input placeholder="Age" type="number" />
        </Form.Item>
        <Form.Item
          name="country"
          rules={[{ required: true, message: "Please input your country!" }]}
        >
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
