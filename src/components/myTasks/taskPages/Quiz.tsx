import FancyLoading from "@/app/loading";
import { Quiz as Quizzes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface QuizProps {
  quiz: Quizzes[] | undefined;
}

function Quiz({ quiz }: QuizProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  // Single state object to avoid ESLint warnings
  const [quizState, setQuizState] = useState({
    options: [] as string[],
    selectedAnswer: null as string | null,
    showAnswer: false,
  });

  // Destructure for cleaner use
  const { options, selectedAnswer, showAnswer } = quizState;

  // Load quiz options whenever quiz or index changes
  useEffect(() => {
    if (!quiz || quiz.length === 0) return;

    const currentQuiz = quiz[currentQuizIndex];
    if (!currentQuiz?.options) return;

    const { opiotn1, optoin2, option3, optoin4 } = currentQuiz.options;

    const opts = [opiotn1, optoin2, option3, optoin4];

    const t = setTimeout(() => {
      setQuizState({
        options: opts,
        selectedAnswer: null,
        showAnswer: false,
      });
    }, 0);

    return () => clearTimeout(t);
  }, [quiz, currentQuizIndex]);

  const handleOptionClick = (option: string) => {
    setQuizState((prev) => ({ ...prev, selectedAnswer: option }));
  };

  const handleShowAnswer = () =>
    setQuizState((prev) => ({ ...prev, showAnswer: !prev.showAnswer }));

  const handlePrevious = () => {
    if (currentQuizIndex > 0) setCurrentQuizIndex(currentQuizIndex - 1);
  };

  const handleNext = () => {
    if (quiz && currentQuizIndex < quiz.length - 1)
      setCurrentQuizIndex(currentQuizIndex + 1);
  };

  if (!quiz) return <FancyLoading />;

  return (
    <div>
      <>
        <span className="text-xl font-bold flex justify-center items-center">
          <span className="text-red-500">{currentQuizIndex + 1}</span> /{" "}
          {quiz.length} (serial: {quiz[currentQuizIndex]?.serial})
        </span>

        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md mt-2">
          <h2 className="text-lg font-semibold mb-4">
            {quiz[currentQuizIndex]?.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4">
            {options.map((option, idx) => (
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

          {/* Answer Reveal */}
          {selectedAnswer && (
            <div className="mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleShowAnswer}
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>

              {showAnswer && (
                <p className="mt-4 text-green-900 text-center">
                  <strong>Answer: {quiz[currentQuizIndex].answer}</strong>
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-4 gap-5">
            <button
              className={`px-4 py-2 text-white rounded ${
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
              className={`px-4 py-2 text-white rounded ${
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
    </div>
  );
}

export default Quiz;
