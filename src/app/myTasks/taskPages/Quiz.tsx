import { useState } from "react";

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

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
  };
  return (
    <div>
      {selectedTask === "quiz" && (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">{quiz.question}</h2>
          <div className="grid grid-cols-1 gap-4">
            {["Paris", "London", "Berlin", "Madrid"].map((option, index) => (
              <button
                key={index}
                className={`w-full bg-gray-200  py-2 px-4 rounded-md text-left ${
                  selectedAnswer === option
                    ? "bg-black text-white hover:bg-slate-800"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <p className="mt-4">
              You selected: <strong>{selectedAnswer}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
