// SearchComponent.jsx

import React, { useState } from 'react';

const SearchComponent = ({ quizzes, onQuizSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Implement search logic based on searchTerm
    const filteredQuizzes = quizzes.filter((quiz) =>
      quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pass the filtered quizzes to the parent component
    onQuizSelect(filteredQuizzes);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for quizzes..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded mr-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>
    </div>
  );
};

export default SearchComponent;
