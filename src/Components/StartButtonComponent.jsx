// StartButtonComponent.jsx

import React from 'react';

const StartButtonComponent = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-green-500 text-white p-2 rounded">
      Start Quiz
    </button>
  );
};

export default StartButtonComponent;
