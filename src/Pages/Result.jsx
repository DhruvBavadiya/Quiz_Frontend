/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const {
    state: {
      selectedAnswers,
      correctAnswers,
      totalQuestions,
      takenTime,
      questions,
    },
  } = location;

  const calculateScore = () => {
    let selectedCount = 0;
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((question) => {
      const selected = selectedAnswers[question.id];
      const correct = correctAnswers[question.id];

      if (selected) {
        selectedCount++;

        if (selected === correct) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    return { selectedCount, correctCount, wrongCount };
  };

  const renderQuestionStatus = (question, index) => {
    const selected = selectedAnswers[question.id];
    const correct = correctAnswers[question.id];
    const isCorrect = selected === correct;
    const isWrong = selected && !isCorrect;
    const isSelected = selected;
  
    return (
      <div key={question.id} className={`flex flex-col ml-6 items-start mb-4 mt-8 ${isSelected ? (isCorrect ? "text-green-500" : isWrong ? "text-red-500" : "") : "text-gray-500"}`}>
        <div className="text-lg font-bold mb-2">
          {`${question.id}. ${question.question}`}
        </div>
        <div className="ml-2 flex flex-col items-start">
          {question.options.map((option, i) => (
            <div key={i} className="flex items-center  space-x-2 text-base">
              <span>{option}</span>
              {!isSelected && correct === option && <span className="ml-2 text-green-500">(Correct Answer)</span>}
              {isCorrect && option === correct && <span className="ml-2 text-green-500">(Correct)</span>}
              {isWrong && selected === option && <span className="ml-2 text-red-500">(Your Answer)</span>}
              {isWrong && correct === option && <span className="ml-2 text-green-500">(Correct Answer)</span>}
            </div>
          ))}
        </div>
        {index < questions.length - 1 && <hr className="mt-3 border-white w-[100%]" />}
      </div>
    );
  };
  
  

  const { selectedCount, correctCount, wrongCount } = calculateScore();

  return (
    <div className="flex flex-col justify-center items-center ml-[16.66%] bg-black h-[100%]">
      <div className="container my-8 p-8 bg-[#282828] w-[80%] rounded-md">
        <h1 className="text-5xl font-bold text-white mb-8">Result Page</h1>
        <hr className="w-[100%] bg-white mb-2"></hr>
        <h1 className="text-white text-3xl font-bold ">Total Score : {correctCount} / {totalQuestions}</h1>
        <div className=" flex text-white justify-evenly mt-4 mb-4">
            <div className="bg-black p-6 flex rounded-xl flex-col">
                <h1 className="text-sm text-green-400">Correct Answer</h1>
                <h1 className="text-2xl font-bold text-green-400">{correctCount}</h1>
            </div>
            <div className="bg-black p-6 flex rounded-xl flex-col">
                <h1 className="text-sm text-red-400">Wrong Answer</h1>
                <h1 className="text-2xl font-bold text-red-400">{wrongCount}</h1>
            </div>
            <div className="bg-black p-6 flex rounded-xl flex-col">
                <h1 className="text-sm text-white">Total Answered</h1>
                <h1 className="text-2xl font-bold text-white">{selectedCount}/{totalQuestions}</h1>
            </div>
            <div className="bg-black p-6 flex rounded-xl flex-col">
                <h1 className="text-sm text-white">Time Taken</h1>
                <h1 className="text-2xl font-bold text-white">{Math.floor(takenTime / 60)}:{(takenTime % 60).toString().padStart(2, '0')} minutes</h1>

            </div>

        </div>
        
      </div>

      <div className="flex flex-col rounded-lg mx-4 mb-8 bg-[#282828] w-[80%] text-white justify-start space-y-3">
      <h1 className="text-white text-2xl">Questions:</h1>
          {questions.map(renderQuestionStatus)}
        </div>
    </div>
  );
};

export default Result;
