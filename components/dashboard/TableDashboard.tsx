import React from "react";
import DashboardTableRow from "./DashboardTableRow";
import AddCategory from "../categories/AddCategory";
import { useCategoriesQuery } from "@/lib/queries/useCategoriesQuery";
import httpClient from "@/lib/api/httpClient";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBudgets } from "@/lib/api/data-service";

const TableDashboard = () => {
  const { data: categories, isLoading } = useCategoriesQuery();

  const { data: categoryBudgets, isLoading: isBudgetsLoading } = useQuery({
    queryKey: ["categoryBudgets"],
    queryFn: getCategoryBudgets,
  });

  console.log(categoryBudgets);

  const handleAllocate = async (categoryName: string, amount: string) => {
    const category = categories.find((c: any) => c.name === categoryName);
    console.log(category);

    if (!category) return;

    try {
      await httpClient.post("/api/budget/allocate", {
        budgetId: 1,
        categoryId: category.id,
        amount: amount,
      });
    } catch (error) {
      console.error("Error allocating budget", error);
    }
  };

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
              {isLoading || isBudgetsLoading ? (
                <li>Loading categories...</li>
              ) : categories?.length > 0 ? (
                categories.map((category: any) => {
                  const assigned =
                    categoryBudgets?.find(
                      (budget: any) => budget.category.id === category.id
                    )?.allocatedAmount || 0;

                  return (
                    <DashboardTableRow
                      key={category.id}
                      icon={category.emoji}
                      category={category.name}
                      target="100$"
                      progress={50}
                      onAllocate={handleAllocate}
                      assigned={assigned}
                    />
                  );
                })
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
