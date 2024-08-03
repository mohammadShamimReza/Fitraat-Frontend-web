import { useState } from "react";

function BlogType() {
  const [type, setType] = useState<undefined | string>(undefined);

  return (
    <div className="sm:w-1/5 sm:pt-28 pt-0 flex flex-row sm:flex-col flex-wrap order-1">
      <div key={1} className="  ">
        <div className="p-3">
          <button
            onDoubleClick={() => setType(undefined)}
            className={
              "light:bg-transparent  hover:light:bg-gray-300  light:text-gray-700  p-1 border border-gray-500 rounded-lg  hover:light:shadow-md  transition duration-300 hover:scale-110  w-full"
            }
          >
            Lorem ipsum .
          </button>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}

export default BlogType;
