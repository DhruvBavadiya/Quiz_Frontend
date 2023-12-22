import React from 'react';

const Categories = (props) => {
  const isSelected = props.selectedSubject === props.category;
  return (
    <div
      className={`transition border rounded-3xl bg-[#3f3f3f] ${
        isSelected ? 'bg-red-600' : 'hover:bg-gray-900'
      } text-white hover:text-white hover:cursor-pointer px-4 py-3 font-bold text-xl hover:scale-105 duration-200 ease-out`}
    >
      <span className=''>{props.category}</span>
    </div>
  );
};

export default Categories;
