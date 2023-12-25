/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import withAuth from "../Components/withAuth";

const Result = () => {
  const location = useLocation();
  const {
    state: {
      selectedAnswers,
      correctAnswers,
      totalQuestions,
      takenTime,
      questions,
      subject,
      selectedDifficulty,
      sectionId
    },
  } = location;


  const calculateScore = () => {
    let selectedCount = 0;
    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((question) => {
      const selected = selectedAnswers[question.questionId];
      const correct = correctAnswers[question.questionId];

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
    const selected = selectedAnswers[question.questionId]; // Use _id instead of id
    const correct = question.correctOption; // Use correctOption instead of id
    const isCorrect = selected === correct;
    const isWrong = selected && !isCorrect;
    const isSelected = selected;
  
    return (
      <div key={question._id} className={`flex flex-col ml-6 items-start mb-4 mt-8 ${isSelected ? (isCorrect ? "text-green-500" : isWrong ? "text-red-500" : "") : "text-gray-500"}`}>
        <div className="text-lg font-bold mb-2">
          {`${question.questionId}. ${question.questionText}`}
        </div>
        <div className="ml-2 flex flex-col items-start">
          {Object.entries(question.options).map(([optionKey, optionValue], i) => (
            <div key={i} className="flex items-center  space-x-2 text-base">
              <span>{`${optionKey}: ${optionValue}`}</span>
              {!isSelected && correct === optionKey && <span className="ml-2 text-green-500">(Correct Answer)</span>}
              {isCorrect && optionKey === correct && <span className="ml-2 text-green-500">(Correct)</span>}
              {isWrong && selected === optionKey && <span className="ml-2 text-red-500">(Your Answer)</span>}
              {isWrong && correct === optionKey && <span className="ml-2 text-green-500">(Correct Answer)</span>}
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
        <h1 className="text-white text-3xl font-bold ">Total Score : {correctAnswers} / {totalQuestions}</h1>
        <div className=" flex text-white justify-evenly mt-4 mb-4">
            <div className="bg-black p-6 flex rounded-xl flex-col">
                <h1 className="text-sm text-green-400">Correct Answer</h1>
                <h1 className="text-2xl font-bold text-green-400">{correctAnswers}</h1>
            </div>
            <div className="bg-black p-6 flex rounded-xl flex-col">
                <h1 className="text-sm text-red-400">Wrong Answer</h1>
                <h1 className="text-2xl font-bold text-red-400">
  {totalQuestions - correctAnswers - (totalQuestions- Object.keys(selectedAnswers).length)}
</h1>

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

export default withAuth(Result);
