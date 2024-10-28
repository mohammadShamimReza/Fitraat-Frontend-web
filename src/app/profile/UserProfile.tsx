interface UserProfileProps {
  name: string;
  age: number;
  email: string;
  location: string;
  paid: boolean;
  showProfileModal: () => void;
  showPasswordModal: () => void;
  handleRestart: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  age,
  email,
  location,
  paid,
  showProfileModal,
  showPasswordModal,
  handleRestart,
}) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-medium">Name: {name}</h2>
        <h2 className="text-lg font-medium">Age: {age}</h2>
        <h2 className="text-lg font-medium">Email: {email}</h2>
        <h2 className="text-lg font-medium">Country: {location}</h2>
        <h2 className="text-lg font-medium">
          Membership:{" "}
          <span className="text-blue-500">{paid ? "Pro" : "Free"}</span>
        </h2>
      </div>

      <div className="flex items-center mb-6 gap-2">
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={showProfileModal}
        >
          Edit Profile
        </button>
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={showPasswordModal}
        >
          Change Password
        </button>
        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={handleRestart}
        >
          Restart Journey
        </button>
      </div>
    </>
  );
};

export default UserProfile;
