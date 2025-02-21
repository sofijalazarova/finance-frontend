import React from "react";

const ProgressBar: React.FC<{
  progress: number;
  isOverspent: boolean;
  fullySpend: boolean;
}> = ({ progress, isOverspent, fullySpend }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className={`h-4 rounded-full transition-all duration-300 ${
          isOverspent
            ? "bg-red-500"
            : fullySpend
            ? "bg-green-600"
            : "bg-gradient-to-r from-teal-400 to-amber-400"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
