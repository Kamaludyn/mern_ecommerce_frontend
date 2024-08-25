import React from "react";

const PlaceholderCard = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded h-60 w-full mb-2">
      <div className="w-full h-40 bg-gray-300 rounded-t-lg"></div>
      <div className="p-2 bg-gray-200 rounded">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-full mx-auto"></div>
      </div>
    </div>
  );
};

export default PlaceholderCard;
