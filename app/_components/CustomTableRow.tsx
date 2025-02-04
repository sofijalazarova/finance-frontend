import React from "react";

interface CustomTableRowProps {
  account: string;
  category: string;
  note: string;
  amount: string;
  date: string;
}

const CustomTableRow = ({
  account,
  category,
  note,
  amount,
  date,
  icon,
}: CustomTableRowProps) => {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="font-medium text-gray-800">Wallet</div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left flex items-center gap-1">
          <p>Groceries</p>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium">Supermarket</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-right font-bold text-green-500">$2,890.66</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-right">24.10.2024</div>
      </td>
    </tr>
  );
};

export default CustomTableRow;
