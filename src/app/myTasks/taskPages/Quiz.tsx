import { Quizzes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface QuizProps {
  selectedTask: string;
  quiz: Quizzes[] | undefined;
}

function Quiz({ selectedTask, quiz }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  function getQuizOptions(text: string) {
    const optionsArray = text.split(/,\s*/);
    return optionsArray.map(String);
  }

  const [quizOptions, setQuizOptions] = useState<string[] | null>(null);

  useEffect(() => {
    if (
      quiz &&
      quiz.length > 0 &&
      quiz[currentQuizIndex]?.attributes.quizOptions
    ) {
      const newOptions = getQuizOptions(
        quiz[currentQuizIndex].attributes.quizOptions
      );
      setQuizOptions(newOptions);
      setSelectedAnswer(null); // Reset selected answer on quiz change
      setShowAnswer(false); // Reset show answer on quiz change
    }
  }, [quiz, currentQuizIndex]);

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleShowAnswer = () => {
    setShowAnswer((prevShowAnswer) => !prevShowAnswer); // Toggle showAnswer state
  };

  const handlePrevious = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  const handleNext = () => {
    if (quiz && currentQuizIndex < quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  return (
    <div>
      {selectedTask === "quiz" && (
        <>
          <span className="text-red-500 text-xl font-bold flex justify-center align-middle">
            {currentQuizIndex + 1} / {quiz?.length}
          </span>
          <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md mt-2">
            <h2 className="text-lg font-semibold mb-4">
              {quiz && quiz[currentQuizIndex]?.attributes.question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {quizOptions?.map((option, index) => (
                <button
                  key={index}
                  className={`w-full bg-gray-200 py-2 px-4 rounded-md text-left ${
                    selectedAnswer === option
                      ? "text-white bg-slate-800"
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
                    {quiz && quiz[currentQuizIndex]?.attributes.question} :{" "}
                    <strong>
                      {quiz && quiz[currentQuizIndex]?.attributes.answer}
                    </strong>
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-between mt-4 gap-5">
              <button
                className={`px-4 py-2 text-white rounded focus:outline-none 
                ${
                  currentQuizIndex === 0 || !quiz || quiz.length === 0
                    ? "bg-gray-700 hover:bg-gray-300 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-700"
                }`}
                onClick={handlePrevious}
                disabled={currentQuizIndex === 0 || !quiz || quiz.length === 0}
                title={
                  currentQuizIndex === 0 || !quiz || quiz.length === 0
                    ? "no previous quiz"
                    : "go previous quiz"
                }
              >
                <span style={{ paddingRight: "10px" }}>
                  <ArrowLeftOutlined />
                </span>
                Previous
              </button>
              <button
                className={`px-4 py-2 text-white rounded focus:outline-none 
                ${
                  !quiz || currentQuizIndex === quiz.length - 1
                    ? "bg-gray-700 hover:bg-gray-300 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-700"
                }`}
                onClick={handleNext}
                disabled={!quiz || currentQuizIndex === quiz.length - 1}
                title={
                  !quiz || currentQuizIndex === quiz.length - 1
                    ? "no next quiz"
                    : "go next quiz"
                }
              >
                Next
                <span style={{ paddingLeft: "10px" }}>
                  <ArrowRightOutlined />
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
