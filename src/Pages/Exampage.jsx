import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ExamPage = () => {
  const { subject, difficulty } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        // Make the API call
        const response = await fetch(`https://quiz-app-pj53.onrender.com/app/v1/getbycategory?category=${capitalizeFirstLetter(subject)}&difficulty=${difficulty}`);
        const data = await response.json();

        // Update the state with the fetched questions
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch questions only if it hasn't been done before
    if (!questions.length && loading) {
      fetchQuestions();
    }
  }, [subject, difficulty, questions.length, loading]);

  useEffect(() => {
    // Start the timer when the questions are loaded
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [questions]);

  useEffect(() => {
    // Check if the remaining time is 0, and trigger handleSubmit if true
    if (remainingTime === 0) {
      handleSubmit();
    }
  }, [remainingTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

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

  const handleSubmit = () => {
    // Example: Calculate correct answers
    const correctAnswers = questions.reduce((acc, question) => {
      return acc + (selectedAnswers[question.questionId] === question.correctOption ? 1 : 0);
    }, 0);

    const totalQuestions = questions.length;
    const takenTime = 600 - remainingTime; // Replace with the actual timer value

    // Display the correct and selected answers
    console.log("Correct Answers:", correctAnswers);
    console.log("Selected Answers:", selectedAnswers);

    // Alert to show that the submission is successful
    alert("Submission successful!");

    // Navigate to the Result page with the required data
    console.log(selectedAnswers);
    navigate('/result', {
      state: {
        selectedAnswers,
        correctAnswers,
        totalQuestions,
        takenTime,
        questions,
        remainingTime, // Include remainingTime in the data sent to the Result page
      },
    });
  };

  return (
    <div className="flex justify-center bg-black h-[100%]">
      <div className="container ml-[16.66%] my-8 p-8 bg-[#282828] w-[70%] rounded-md">
        <div className="fixed top-0 right-0 bg-white p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-2">Remaining Time: {formatTime(remainingTime)}</p>
        </div>
        <div className="flex flex-col text-white justify-start space-y-3">
          {Array.isArray(questions) ? (
            questions.map((data, index) => (
              <div key={data.questionId} className="flex flex-col items-start ml-2 mb-4">
                <div className="text-lg font-bold mb-2">
                  {`${data.questionId}. ${data.questionText}`}
                </div>
                <div className="ml-2 flex flex-col items-start">
                  {Object.entries(data.options).map(([optionKey, optionValue], i) => (
                    <label key={i} className="flex items-center space-x-2 text-base">
                      <input
                        type="checkbox"
                        style={{ minWidth: "20px" }}
                        checked={selectedAnswers[data.questionId] === optionKey}
                        onChange={() => {
                          selectedAnswers[data.questionId] === optionKey
                            ? handleOptionDeselect(data.questionId)
                            : handleOptionSelect(data.questionId, optionKey);
                        }}
                      />
                      <span>{`${optionKey}: ${optionValue}`}</span>
                    </label>
                  ))}
                </div>
                {index < questions.length - 1 && <hr className="mt-3 border-white w-[100%]" />}
              </div>
            ))
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
        <button className="py-2 px-4 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default React.memo(ExamPage);
