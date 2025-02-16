import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

interface TableRowProps {
  icon: React.ReactNode;
  category: string;
  target: string;
  assigned: string;
  totalSpent: string;
  onAllocate: (category: string, amount: string) => void;
}

const DashboardTableRow: React.FC<TableRowProps> = ({
  icon,
  category,
  target,
  assigned,
  onAllocate,
  totalSpent,
}) => {
  const [inputValue, setInputValue] = useState(assigned);

  useEffect(() => {
    setInputValue(assigned);
  }, [assigned]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    onAllocate(category, inputValue);
  };

  const progress =
    Number(assigned) > 0 ? (Number(totalSpent) / Number(assigned)) * 100 : 0;

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
          <div className="flex flex-col w-full">
            {Number(assigned) >= 0 ? (
              <span className="font-thin">
                You spent {totalSpent}$ out of {assigned}$
              </span>
            ) : (
              <span className="text-red-500 font-bold">OVERSPENT!!!</span>
            )}
            <ProgressBar progress={progress} />
          </div>

          <div className="w-1/4 px-5">
            <input
              className={`${
                Number(assigned) < 0 ? "bg-red-500" : ""
              }  w-1/2 border border-gray-300 rounded text-center focus:outline-none focus:border-indigo-600`}
              type="text"
              value={inputValue}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              className="w-1/2 ml-2 border border-gray-300 rounded text-center focus:outline-none focus:border-indigo-600"
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
