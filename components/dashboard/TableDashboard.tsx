import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/data-service";

import DashboardTableRow from "./DashboardTableRow";
import AddCategory from "../categories/AddCategory";

const TableDashboard = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  console.log(categories);

  return (
    <div className="sm:px-6 w-full">
      <div className="px-4  py-4 flex items-center justify-between">
        <div className="flex items-center justify-start space-x-3">
          <p className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal ">
            CATEGORY
          </p>
          <AddCategory />
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
              {categories && categories.length > 0 ? (
                categories.map((category: any) => (
                  <DashboardTableRow
                    key={category.id}
                    icon={category.emoji}
                    category={category.name}
                    assigned="50$"
                    target="100$"
                    progress={50}
                  />
                ))
              ) : (
                <tr>
                  <td className="text-center p-4">No categories available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;
