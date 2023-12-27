/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
// Import statements
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import withAuth from "../Components/withAuth";



const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ExamPage = () => {
  const { subject, difficulty } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [unloadConfirmed, setUnloadConfirmed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  // Check if location.state is present and has the required properties
  const { selectedSubject, selectedDifficulty, sectionId } = location.state || {};

  if (!selectedSubject || !selectedDifficulty || !sectionId) {
    // Navigate to the home page if data is missing
    navigate("/");
    return null; // Don't render anything
  }

  useEffect(() => {
    // Update the remaining time every second
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the timer when the component is unmounted or when the exam is submitted
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        let apiUrl = `https://quiz-app-pj53.onrender.com/app/v1/getbycategory?category=${capitalizeFirstLetter(
          selectedSubject
        )}`;

        if (difficulty && difficulty.toLowerCase() !== 'random') {
          apiUrl += `&difficulty=${difficulty}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update the state with the fetched questions
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        // Set loading to false here to ensure it happens regardless of success or error
        setLoading(false);
      }
    };

    // Fetch questions only if it hasn't been done before
    if (!questions.length && loading) {
      fetchQuestions();
    }
  }, [subject, difficulty, questions.length, loading, navigate]); // Include navigate in the dependencies array



  useEffect(() => {
    // Check if the remaining time is 0, and trigger handleSubmit if true
    if (remainingTime === 0) {
      handleSubmit();
    }
  }, [remainingTime]);

  useEffect(() => {
    // Use the beforeunload event to navigate to the home page when the page is reloaded
    const handleBeforeUnload = (event) => {
      // Check if the exam has started
      if (examStarted) {
        // Navigate to the home page
        navigate("/");
      }
    };

    // Add a listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [examStarted, navigate]);

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
      return (
        acc +
        (selectedAnswers[question.questionId] === question.correctOption
          ? 1
          : 0)
      );
    }, 0);

    const totalQuestions = questions.length;
    const takenTime = 600 - remainingTime;

    // Display the correct and selected answers
    console.log("Correct Answers:", correctAnswers);
    console.log("Selected Answers:", selectedAnswers);

    // Alert to show that the submission is successful
    alert("Submission successful!");

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const submitResult = async () => {
      try {
        // Make the API call to submit the result
        const response = await fetch("https://quiz-app-pj53.onrender.com/app/v1/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            score: correctAnswers,
            sectionId: sectionId,
            sectionName: subject,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Result submitted successfully:", data);
        } else {
          console.error("Failed to submit result:", data);
        }
      } catch (error) {
        console.error("Error submitting result:", error);
      }
    };

    // Call the submitResult function when the component mounts
    submitResult();

    // Navigate to the Result page with the required data
    navigate("/result", {
      state: {
        subject,
        selectedDifficulty,
        sectionId,
        selectedAnswers,
        correctAnswers,
        totalQuestions,
        takenTime,
        questions,
        remainingTime,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ml-[16.66%] bg-[#282828]">
        <InfinitySpin color="#4fa94d" loading={loading} css={override} />
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-black h-[100%]">
      <div className="container ml-[16.66%] my-8 p-8 bg-[#282828] w-[70%] rounded-md">
      <div className="flex justify-center mb-4">
      <h2 className="text-2xl font-bold text-white">
        {capitalizeFirstLetter(selectedSubject)} - {capitalizeFirstLetter(selectedDifficulty)}
      </h2>
      
      </div>
      <hr className="mt-3 border-blue-700 mb-3 w-[100%]" />
        <div className="fixed top-0 right-0 bg-white p-4 rounded-md shadow-md">
        
          <p className="text-lg font-semibold mb-2">
            Remaining Time: {formatTime(remainingTime)}
          </p>
        </div>
        <div className="flex flex-col text-white justify-start space-y-3">
          {Array.isArray(questions) ? (
            questions.slice(0,10).map((data, index) => (
              <div
                key={data.questionId}
                className="flex flex-col items-start ml-2 mb-4"
              >
                <div className="text-lg font-bold mb-2">
                {`${index + 1}. ${data.questionText}`}
                </div>
                <div className="ml-2 flex flex-col items-start">
                  {Object.entries(data.options).map(
                    ([optionKey, optionValue], i) => (
                      <label
                        key={i}
                        className="flex items-center space-x-2 text-base"
                      >
                        <input
                          type="checkbox"
                          style={{ minWidth: "20px" }}
                          checked={
                            selectedAnswers[data.questionId] === optionKey
                          }
                          onChange={() => {
                            selectedAnswers[data.questionId] === optionKey
                              ? handleOptionDeselect(data.questionId)
                              : handleOptionSelect(data.questionId, optionKey);
                          }}
                        />
                        <span>{`${optionKey}: ${optionValue}`}</span>
                      </label>
                    )
                  )}
                </div>
                {index < questions.length - 1 && (
                  <hr className="mt-3 border-white w-[100%]" />
                )}
              </div>
            ))
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
        <button
          className="py-2 px-4 mt-5  bg-blue-900 text-white rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default withAuth(React.memo(ExamPage));
