/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ExamPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
      correctAnswer: "William Shakespeare",
    },
    {
      id: 4,
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: "Blue Whale",
    },
    {
      id: 5,
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo",
    },
    {
      id: 6,
      question: "In which year did World War II end?",
      options: ["1943", "1945", "1947", "1950"],
      correctAnswer: "1945",
    },
    {
      id: 7,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      id: 8,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Arctic Ocean", "Southern Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      id: 9,
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "India", "Japan", "South Korea"],
      correctAnswer: "Japan",
    },
    {
      id: 10,
      question: "Who developed the theory of relativity?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
      correctAnswer: "Albert Einstein",
    },
    // Add more questions as needed
  ]);
  

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(10); // Increased for testing

  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleOptionDeselect = (questionId) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };

  const handleSubmitExam = () => {
    // Count the number of selected answers
    const selectedCount = Object.keys(selectedAnswers).length;
  
    // Show an alert indicating the number of selected answers
    alert(`Exam successfully submitted!\nTotal Selected Answers: ${selectedCount}`);
  
    // Show toast indicating successful submission
    toast.success("Exam successfully submitted!");
  
    // Create an object to store correct answers dynamically
    const correctAnswers = {};
    
    questions.forEach((question) => {
      correctAnswers[question.id] = question.correctAnswer;
    });
  
    // Calculate the score and wrong answers
    let score = 0;
    const wrongAnswers = {};
  
    Object.keys(selectedAnswers).forEach((questionId) => {
      const selectedOption = selectedAnswers[questionId];
      const correctOption = correctAnswers[questionId];
  
      if (selectedOption === correctOption) {
        score++;
      } else {
        wrongAnswers[questionId] = {
          selected: selectedOption,
          correct: correctOption,
        };
      }
    });
  
    // Navigate to the result page
    navigate("/result", {
      state: {
        selectedAnswers,
        correctAnswers,
        wrongAnswers,
        totalQuestions: questions.length,
        score,
        takenTime: 10 - remainingTime, // Placeholder for the taken time
        questions,
      },
    });
  };
  
  // Effect for handling time
  useEffect(() => {
    // Set the timer interval
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId); // Clear the interval when time is up
          return 0;
        }
      });
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Effect for handling time-up logic
  useEffect(() => {
    if (remainingTime === 0) {
      // // Count the number of selected answers
      // const selectedCount = Object.keys(selectedAnswers).length;

      // // Show an alert indicating the number of selected answers
      // alert(`Time's up!\nTotal Selected Answers: ${selectedCount}`);

      // // Show toast indicating time is up
      // toast.error("Time's up!");

      // // Navigate to the result page
      // navigate("/result", {
      //   state: {
      //     selectedAnswers,
      //     correctAnswers: {}, // Placeholder for correct answers
      //     wrongAnswers: {}, // Placeholder for wrong answers
      //     totalQuestions: questions.length,
      //     score: 0, // Placeholder for the score
      //     takenTime: 10, // Placeholder for the taken time
      //     questions,
      //   },
      // });

      handleSubmitExam()
    }
  }, [remainingTime, selectedAnswers, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="flex justify-center bg-black h-[100%]">
      <div className="container ml-[16.66%] my-8 p-8 bg-[#282828] w-[70%] rounded-md">
        <div className="fixed top-0 right-0 bg-white p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-2">Remaining Time: {formatTime(remainingTime)}</p>
        </div>
        <div className="flex flex-col text-white justify-start space-y-3">
          {questions.map((data) => (
            <div key={data.id} className="flex flex-col items-start ml-2 mb-4">
              <div className="text-lg font-bold mb-2">
                {`${data.id}. ${data.question}`}
              </div>
              <div className="ml-2 flex flex-col items-start">
                {data.options.map((option, i) => (
                  <label key={i} className="flex items-center space-x-2 text-base">
                    <input
                      type="checkbox"
                      checked={selectedAnswers[data.id] === option}
                      onChange={() =>
                        selectedAnswers[data.id] === option
                          ? handleOptionDeselect(data.id)
                          : handleOptionSelect(data.id, option)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {data.id < questions.length && <hr className="mt-3 border-white w-[100%]" />}
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmitExam}
          className="py-2 px-4 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ExamPage;
