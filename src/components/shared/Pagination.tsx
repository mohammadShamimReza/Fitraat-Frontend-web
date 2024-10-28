import { Dispatch, SetStateAction } from "react";

function Pagination({
  pageCount,
  setPageCount,
  total,
}: {
  pageCount: number;
  setPageCount: Dispatch<SetStateAction<number>>;
  total: number;
}) {
  // Calculate the total number of pages based on the total number of blogs
  const totalPages = Math.ceil(total / 10); // Assuming 3 blogs per page

  // Function to generate pagination button elements
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5; // Maximum number of buttons to show
    const halfMaxButtonsToShow = Math.floor(maxButtonsToShow / 2);

    // Render buttons dynamically based on the current page and total pages
    if (totalPages <= maxButtonsToShow) {
      // If total pages are less than or equal to maxButtonsToShow, render all buttons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <li key={i}>
            <button
              onClick={() => setPageCount(i)}
              className={
                pageCount === i
                  ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2 gap-3"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
              }
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      // If total pages are greater than maxButtonsToShow, render buttons dynamically
      if (pageCount <= halfMaxButtonsToShow + 1) {
        // Show buttons from 1 to maxButtonsToShow
        for (let i = 1; i <= maxButtonsToShow; i++) {
          buttons.push(
            <li key={i}>
              <button
                onClick={() => setPageCount(i)}
                className={
                  pageCount === i
                    ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2"
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
                }
              >
                {i}
              </button>
            </li>
          );
        }
        buttons.push(
          <li
            key={2}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white text-2xl rounded-lg ml-2"
          >
            <span className="flex items-center justify-center font-bold text-2xl rounded-lg ml-2">
              ...
            </span>
          </li>
        );

        buttons.push(
          <li key={totalPages}>
            <button
              onClick={() => setPageCount(totalPages)}
              className={
                pageCount === totalPages
                  ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
              }
            >
              {totalPages}
            </button>
          </li>
        );
      } else if (pageCount >= totalPages - halfMaxButtonsToShow) {
        // Show buttons from totalPages - maxButtonsToShow to totalPages
        buttons.push(
          <li key={1}>
            <button
              onClick={() => setPageCount(1)}
              className={
                pageCount === 1
                  ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
              }
            >
              1
            </button>
          </li>
        );
        buttons.push(
          <li
            key={2}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white text-2xl rounded-lg ml-2"
          >
            <span className="flex items-center justify-center">...</span>
          </li>
        );
        for (let i = totalPages - maxButtonsToShow + 3; i <= totalPages; i++) {
          buttons.push(
            <li key={i}>
              <button
                onClick={() => setPageCount(i)}
                className={
                  pageCount === i
                    ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2"
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
                }
              >
                {i}
              </button>
            </li>
          );
        }
      } else {
        // Show buttons around the current page
        buttons.push(
          <li key={1}>
            <button
              onClick={() => setPageCount(1)}
              className={
                pageCount === 1
                  ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
              }
            >
              1
            </button>
          </li>
        );
        buttons.push(
          <li
            key={2}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white text-2xl rounded-lg ml-2"
          >
            <span className="flex items-center justify-center">...</span>
          </li>
        );
        for (
          let i = pageCount - halfMaxButtonsToShow;
          i <= pageCount + halfMaxButtonsToShow;
          i++
        ) {
          buttons.push(
            <li key={i}>
              <button
                onClick={() => setPageCount(i)}
                className={
                  pageCount === i
                    ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2"
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
                }
              >
                {i}
              </button>
            </li>
          );
        }
        buttons.push(
          <li
            key={2}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white text-2xl rounded-lg ml-2"
          >
            <span className="flex items-center justify-center">...</span>
          </li>
        );
        buttons.push(
          <li key={totalPages}>
            <button
              onClick={() => setPageCount(totalPages)}
              className={
                pageCount === totalPages
                  ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-200  hover:bg-gray-300 hover:text-gray-700 text-2xl rounded-lg ml-2"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2"
              }
            >
              {totalPages}
            </button>
          </li>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="flex justify-center align-middle">
      <ul className="inline-flex  -space-x-px text-sm">
        <li>
          <button
            onClick={() => setPageCount(pageCount === 1 ? 1 : pageCount - 1)}
            className="flex items-center justify-center px-3 h-8  leading-tight text-gray-500 bg-white   hover:bg-gray-100 hover:text-gray-700 text-2xl rounded-lg ml-2 "
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
        {renderPaginationButtons()}
        <li>
          <button
            onClick={() =>
              setPageCount(
                pageCount === totalPages ? totalPages : pageCount + 1
              )
            }
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white rounded-lg  hover:bg-gray-100 hover:text-gray-700 text-2xl ml-2"
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
