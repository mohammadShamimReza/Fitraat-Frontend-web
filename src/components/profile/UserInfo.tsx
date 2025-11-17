import { UserData } from '@/types/contantType';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export default function UserInfo({
  getUserInfoData,
  setIsImageUploadModalVisible,
  name,
  email,
  paid,
  handleRestart,
  compliteDay,
  daysLeft,
}: {
  getUserInfoData: UserData | null;
  setIsImageUploadModalVisible: Dispatch<SetStateAction<boolean>>;
  name: string| undefined;
  email: string| undefined;
  paid: string;
        handleRestart: () => Promise<void>;
  compliteDay: number | null;
  daysLeft: number;
}) {
  return (
    <>
      <div className="flex flex-col items-center text-center mb-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          {getUserInfoData?.profileImage?.url ? (
            <Image
              src={`${getUserInfoData.profileImage.url}`}
              alt="Profile"
              width={220}
              height={220}
              className="border rounded-full shadow-md object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
              No Image
            </div>
          )}

          <button
            className="mt-3 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
            onClick={() => setIsImageUploadModalVisible(true)}
          >
            Upload New Image
          </button>
        </div>

        {/* User Details */}
        <div className="mt-6">
          <h2 className="text-lg font-medium">Name: {name}</h2>
          <h2 className="text-lg font-medium">Email: {email}</h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-800 text-white"
            onClick={handleRestart}
          >
            Restart Journey
          </button>

          {paid !== "Complete" && (
            <Link href="/payment">
              <button className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-800 text-white">
                Become Pro
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
