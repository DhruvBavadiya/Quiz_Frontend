// DifficultySelectorComponent.jsx

import React from 'react';

const DifficultySelectorComponent = ({ onSelect }) => {
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  const handleDifficultySelect = (difficulty) => {
    onSelect(difficulty);
  };

  return (
    <div className="mb-4">
      <span className="mr-2">Select Difficulty:</span>
      {difficultyLevels.map((difficulty, index) => (
        <button key={index} onClick={() => handleDifficultySelect(difficulty)} className="bg-blue-500 text-white p-2 rounded mr-2">
          {difficulty}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelectorComponent;
