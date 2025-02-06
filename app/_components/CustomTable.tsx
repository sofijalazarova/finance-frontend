import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const CustomTable = () => {
  return (
   
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-200 shadow">
          <tr>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Account</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Category</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Note</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-right">Amount</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-right">Date</div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-right">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y text-md divide-gray-100">
          <tr className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="font-medium text-gray-800">Wallet</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left flex items-center gap-1">
                <FaCartShopping className="text-blue-500" />
                <p>Groceries</p>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div
                className="text-left font-medium truncate"
                title="Supermarket"
              >
                Supermarket
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-right font-bold text-green-500">
                $2,890.66
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-right">24.10.2024</div>
            </td>
            <td className="p-2 whitespace-nowrap text-right">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-2">
                Delete
              </button>
            </td>
          </tr>
          <tr className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="font-medium text-gray-800">Wallet</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left flex items-center gap-1">
                <FaCartShopping className="text-blue-500" />
                <p>Groceries</p>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div
                className="text-left font-medium truncate"
                title="Supermarket"
              >
                Supermarket
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-right font-bold text-green-500">
                $2,890.66
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-right">24.10.2024</div>
            </td>
            <td className="p-2 whitespace-nowrap text-right">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-2">
                Delete
              </button>
            </td>
          </tr>
          <tr className="bg-white even:bg-gray-50 hover:bg-gray-100 transition">
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="font-medium text-gray-800">Wallet</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left flex items-center gap-1">
                <FaCartShopping className="text-blue-500" />
                <p>Groceries</p>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div
                className="text-left font-medium truncate"
                title="Supermarket"
              >
                Supermarket
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-right font-bold text-green-500">
                $2,890.66
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-right">24.10.2024</div>
            </td>
            <td className="p-2 whitespace-nowrap text-right">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
