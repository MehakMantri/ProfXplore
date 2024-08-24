// ProfessorPreview.js
import React from "react";

const ProfessorPreview = ({ professor, onAddReview }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-md shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold">{professor.name}</h2>
        <p className="text-gray-400">{professor.department}</p>
        <p className="text-yellow-400 font-semibold mt-2">Rating: {professor.rating}/5.0</p>
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => onAddReview(professor)}
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default ProfessorPreview;
