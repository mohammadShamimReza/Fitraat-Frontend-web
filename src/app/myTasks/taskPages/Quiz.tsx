import { Quiz as Quizzes } from "@/types/contantType";
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
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  useEffect(() => {
    if (quiz && quiz.length > 0) {
      const currentQuiz = quiz[currentQuizIndex];

      if (currentQuiz && currentQuiz.options) {
        const { opiotn1, optoin2, option3, optoin4 } = currentQuiz.options;

        const opts = [opiotn1, optoin2, option3, optoin4];
        // .filter((o): o is string => !!o && o.trim() !== "")
        // .filter((v, i, a) => a.indexOf(v) === i); // remove duplicates
        setQuizOptions(opts);
        setSelectedAnswer(null);
        setShowAnswer(false);
      }
    }
  }, [quiz, currentQuizIndex]);
  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleShowAnswer = () => setShowAnswer((prev) => !prev);

  const handlePrevious = () => {
    if (currentQuizIndex > 0) setCurrentQuizIndex(currentQuizIndex - 1);
  };

  const handleNext = () => {
    if (quiz && currentQuizIndex < quiz.length - 1)
      setCurrentQuizIndex(currentQuizIndex + 1);
  };

  return (
    <div>
      {selectedTask === "quiz" && quiz && quiz.length > 0 && (
        <>
          <span className="text-red-500 text-xl font-bold flex justify-center align-middle">
            {currentQuizIndex + 1} / {quiz.length} (serial:{" "}
            {quiz[currentQuizIndex].serial})
          </span>

          <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md mt-2">
            <h2 className="text-lg font-semibold mb-4">
              {quiz[currentQuizIndex].question}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {quizOptions.map((option, idx) => (
                <button
                  key={idx}
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
                </button>
                {showAnswer && (
                  <p className="mt-4 text-green-900 text-center">
                    <strong>Answer: {quiz[currentQuizIndex].answer}</strong>
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between mt-4 gap-5">
              <button
                className={`px-4 py-2 text-white rounded focus:outline-none ${
                  currentQuizIndex === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-700"
                }`}
                onClick={handlePrevious}
                disabled={currentQuizIndex === 0}
              >
                <ArrowLeftOutlined /> Previous
              </button>

              <button
                className={`px-4 py-2 text-white rounded focus:outline-none ${
                  currentQuizIndex === quiz.length - 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-700"
                }`}
                onClick={handleNext}
                disabled={currentQuizIndex === quiz.length - 1}
              >
                Next <ArrowRightOutlined />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
