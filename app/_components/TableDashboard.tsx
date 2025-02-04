import React from "react";
import { MdLocalGasStation } from "react-icons/md";
import { FcElectricity } from "react-icons/fc";
import { CiTrash } from "react-icons/ci";
import DashboardTableRow from "./DashboardTableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const TableDashboard = () => {
  return (
    <div className="sm:px-6 w-full">
      <div className="px-4  py-4 flex items-center justify-between">
        <div className="flex items-center justify-start space-x-3">
          <p className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal ">
            CATEGORY
          </p>
          <button className="py-1 px-3 text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-md transition-all">
            +
          </button>
        </div>
        <div className="flex font-roboto text-slate-gray space-x-2 mr-6">
          <p>Assigned</p>
          <p>Target</p>
        </div>
      </div>
      <div className="bg-white py-4 md:py-3 px-3 md:px-3 xl:px-5">
        <div className="mt-3 overflow-x-auto overflow-y-auto font-roboto">
          <table className="w-full whitespace-nowrap">
            <tbody>
              <tr className="focus:outline-none h-14 border bg-gray-50 border-gray-100 rounded">
                <td>
                  <div className="flex items-center pl-5">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">
                      Bills
                    </p>
                  </div>
                </td>
              </tr>

              <DashboardTableRow
                icon={<MdLocalGasStation size={25} />}
                category="Gas/Heating"
                assigned="50$"
                target="100$"
                progress={50}
              />

              <DashboardTableRow
                icon={<FcElectricity size={25} />}
                category="Electricity"
                assigned="0$"
                target="10$"
                progress={50}
              />

              <DashboardTableRow
                icon={<CiTrash size={25} />}
                category="Garbage"
                assigned="0$"
                target="10$"
                progress={50}
              />

              <tr className="h-3"></tr>
              <tr className="focus:outline-none  h-14 border border-gray-100 rounded">
                <td className="focus:text-indigo-600 ">
                  <div className="flex items-center pl-5">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">
                      Needs
                    </p>
                  </div>
                </td>
              </tr>
              <DashboardTableRow
                icon={<MdLocalGasStation size={25} />}
                category="Gas/Heating"
                assigned="50$"
                target="100$"
                progress={50}
              />
              <tr className="h-3"></tr>
              <tr className="focus:outline-none focus:text-indigo-600 h-14 border border-gray-100 rounded">
                <td className="">
                  <div className="flex items-center pl-5">
                    <p className="text-base font-medium leading-none text-gray-700 mr-2">
                      Wants
                    </p>
                  </div>
                </td>
                <td className="pl-24"></td>
              </tr>
            </tbody>
          </table>
        

        </div>
      </div>
    </div>
  );
};

export default TableDashboard;
