import { useEffect, useState } from "react";

function Quiz({
  selectedTask,
  quiz,
}: {
  selectedTask: string;
  quiz: {
    question: string | undefined;
    answer: string | undefined;
    quizOptions: string | undefined;
  };
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  function getQuizOptions(text: string) {
    const optionsArray = text.split(/,\s*/);
    return optionsArray.map(String);
  }

  const [quizOptions, setQuizOptions] = useState<string[] | null>(null);

  useEffect(() => {
    if (quiz && quiz?.quizOptions) {
      const newTimes = getQuizOptions(quiz?.quizOptions);
      setQuizOptions(newTimes);
    }
  }, [quiz]);

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleShowAnswer = () => {
    setShowAnswer((prevShowAnswer) => !prevShowAnswer); // Toggle showAnswer state
  };

  return (
    <div>
      {selectedTask === "quiz" && (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md mt-16">
          <h2 className="text-lg font-semibold mb-4">{quiz?.question}</h2>
          <div className="grid grid-cols-1 gap-4">
            {quizOptions?.map((option, index) => (
              <button
                key={index}
                className={`w-full bg-gray-200  py-2 px-4 rounded-md text-left ${
                  selectedAnswer === option
                    ? " text-white bg-slate-800"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div className="mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={handleShowAnswer}
              >
                <span>{showAnswer ? "Hide Answer" : "Show Answer"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-2 ${
                    showAnswer ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {showAnswer && (
                <p className="mt-4 text-green-900 text-center">
                  {quiz?.question} : <strong>{quiz.answer}</strong>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
