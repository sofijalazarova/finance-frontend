import React from "react";

interface ProgressBarProps {
  progress: number;
  isOverspent: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isOverspent }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className={`h-2.5 rounded-full ${
        isOverspent ? "bg-red-500" : "bg-green-500"
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;
