"use client";
import { LikeOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";

function SinglePost() {
  const [expanded, setExpanded] = useState(false);

  const mockData = {
    userImage: "https://via.placeholder.com/150",
    postTime: "1 hour ago",
    postContent: `
      <p>This is a <strong>blog post</strong> with <em>HTML</em> content. It might include various <a href="#">HTML tags</a>.</p>
      <p>More content to show in the preview. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis.</p>
      <p>Here is the third paragraph to ensure the content spans more than six lines.</p>
      <p>Another line of text for the preview.</p>
      <p>Yet another line of text to fill the six-line limit.</p>
      <p>The final line to display in the preview mode before "See More" is shown.More content to show in the preview. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis.</p>
      <p>Here is the third paragraph to ensure the content spans more than six lines.</p>
      <p>Another line of text for the preview.</p>
      <p>Yet another line of text to fill the six-line limit.</p>
      <p>The final line to display in the preview mode before "See More" is shown.More content to show in the preview. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis.</p>
      <p>Here is the third paragraph to ensure the content spans more than six lines.</p>
      <p>Another line of text for the preview.</p>
      <p>Yet another line of text to fill the six-line limit.</p>
      <p>The final line to display in the preview mode before "See More" is shown.</p>
    `,
  };

  return (
    <div className="flex justify-center py-6">
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="border rounded-lg shadow-lg p-4 flex flex-col justify-between leading-normal bg-white">
          <div className="flex items-center mb-4">
            <img
              src={mockData.userImage}
              alt="User image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-gray-600 text-sm">{mockData.postTime}</p>
            </div>
          </div>
          <div className="mb-4">
            <div
              className={`prose overflow-hidden transition-all duration-500 ease-in-out ${
                expanded
                  ? "max-h-screen animate-expand"
                  : "max-h-[7.5rem] line-clamp-7 animate-collapse"
              }`}
              dangerouslySetInnerHTML={{ __html: mockData.postContent }}
            />
            {!expanded ? (
              <button
                className="text-blue-500 mt-2"
                onClick={() => setExpanded(true)}
              >
                See More
              </button>
            ) : (
              <button
                className="text-blue-500 mt-2"
                onClick={() => setExpanded(false)}
              >
                Show Less
              </button>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="flex items-center text-gray-600">
              <LikeOutlined className="mr-1" /> Like
            </button>
            <button className="flex items-center text-gray-600">
              <SaveOutlined className="mr-1" /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
