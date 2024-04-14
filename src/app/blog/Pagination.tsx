import { Dispatch, SetStateAction } from "react";

function Pagination({
  pageCount,
  setPageCount,
}: {
  pageCount: number;
  setPageCount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex justify-center align-middle">
      <ul className="inline-flex  -space-x-px text-sm">
        <li>
          <button
            onClick={() => setPageCount(pageCount === 1 ? 1 : pageCount - 1)}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700     "
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
          </button>
        </li>
        <li>
          <button
            onClick={() => setPageCount(1)}
            className={
              pageCount === 1
                ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-700     "
                : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            }
          >
            1
          </button>
        </li>
        <li>
          <button
            onClick={() => setPageCount(2)}
            className={
              pageCount === 2
                ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-700     "
                : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            }
          >
            2
          </button>
        </li>
        <li>
          <button
            onClick={() => setPageCount(3)}
            className={
              pageCount === 3
                ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-700     "
                : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            }
          >
            3
          </button>
        </li>
        <li>
          <button
            onClick={() => setPageCount(4)}
            className={
              pageCount === 4
                ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-700     "
                : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            }
          >
            4
          </button>
        </li>
        <li>
          <button
            onClick={() => setPageCount(5)}
            className={
              pageCount === 5
                ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-700     "
                : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            }
          >
            5
          </button>
        </li>
        <li>
          <button
            onClick={() => setPageCount(pageCount === 5 ? 5 : pageCount + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700     "
          >
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
