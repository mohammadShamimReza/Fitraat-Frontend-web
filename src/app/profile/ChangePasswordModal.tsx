import { Button, Form, Input, Modal } from "antd";

interface ChangePasswordModalProps {
  isPasswordModalVisible: boolean;
  handlePasswordOk: (values: any) => Promise<void>;
  handlePasswordCancel: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isPasswordModalVisible,
  handlePasswordOk,
  handlePasswordCancel,
}) => {
  return (
    <Modal
      title="Change Password"
      open={isPasswordModalVisible}
      onOk={handlePasswordOk}
      onCancel={handlePasswordCancel}
      footer={null}
    >
      <Form
        name="password"
        onFinish={handlePasswordOk}
        initialValues={{
          password: "",
        }}
      >
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="passwordConfirmation"
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
