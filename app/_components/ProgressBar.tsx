import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className="bg-green-500 h-2.5 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;
