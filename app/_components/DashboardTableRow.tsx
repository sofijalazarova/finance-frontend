import React from "react";
import ProgressBar from "./ProgressBar";

interface TableRowProps {
  icon: React.ReactNode;
  category: string;
  assigned: string;
  target: string;
  progress: number;
}

const DashboardTableRow: React.FC<TableRowProps> = ({
  icon,
  category,
  assigned,
  target,
  progress,
}) => {
  return (
    <tr className="focus:outline-none  h-12 border border-gray-100 rounded">
      <td>
        <div className="flex items-center pl-5 space-x-1">
          <span>{icon}</span>
          <p className="text-base font-medium leading-none text-gray-700 mr-2">
            {category}
          </p>
        </div>
      </td>

      <td>
        <div className="flex flex-row items-center justify-between">
          <ProgressBar progress={progress} />
          <div className="w-1/4 px-5">
            <input
              className="w-1/2 border border-gray-400 rounded text-center focus:outline-none focus:border-indigo-600"
              type="text"
              value={assigned}
              readOnly
            />
            <input
              className="w-1/2 ml-2 border border-gray-400 rounded text-center focus:outline-none focus:border-indigo-600"
              type="text"
              value={target}
              readOnly
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DashboardTableRow;
