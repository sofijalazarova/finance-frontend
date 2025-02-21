import React from "react";
import DashboardTableRow from "./DashboardTableRow";
import AddCategory from "../categories/AddCategory";
import { useCategoriesQuery } from "@/lib/queries/useCategoriesQuery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  allocateToCategory,
  fetchBudget,
  getCategoryBudgets,
} from "@/lib/api/data-service";

const TableDashboard = () => {
  const { data: categories, isLoading } = useCategoriesQuery();

  const { data: budget } = useQuery({
    queryKey: ["budget"],
    queryFn: fetchBudget,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: allocateToCategory,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["categoryBudgets"] });

      const previousData = queryClient.getQueryData(["categoryBudgets"]);

      queryClient.setQueryData(["categoryBudgets"], (old: any) => {
        return old.map((budget: any) =>
          budget.category.id === newData.categoryId
            ? {
                ...budget,
                allocatedAmount: newData.amount,
              }
            : budget
        );
      });

      return { previousData };
    },
    onError: (err, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["categoryBudgets"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryBudgets"] });
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });

  const { data: categoryBudgets, isLoading: isBudgetsLoading } = useQuery({
    queryKey: ["categoryBudgets"],
    queryFn: getCategoryBudgets,
  });

  const handleAllocate = async (categoryName: string, amount: string) => {
    const category = categories.find((c: any) => c.name === categoryName);

    if (!category) return;

    const data = {
      budgetId: budget?.id,
      categoryId: category.id,
      amount: amount,
    };

    mutate(data);
  };

  return (
    <div className="sm:px-6 w-full">
      <div className="px-4  py-4 flex items-center justify-between">
        <div className="flex items-center justify-start space-x-3">
          <p className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal">
            CATEGORIES
          </p>
          <AddCategory />
        </div>
        <div className="flex font-roboto text-slate-gray space-x-3 mr-8">
          <p>Assigned</p>
          <p>Available</p>
        </div>
      </div>
      <div className="bg-white py-4 md:py-3 px-3 md:px-3 xl:px-5">
        <div className="mt-3 overflow-auto max-h-[400px] font-roboto">
          <table className="w-full whitespace-nowrap">
            <tbody>
              {isLoading || isBudgetsLoading ? (
                <tr>
                  <td className="text-center p-4">Loading categories...</td>
                </tr>
              ) : categories?.length > 0 ? (
                categories.map((category: any) => {
                  const assigned =
                    categoryBudgets?.find(
                      (budget: any) => budget.category.id === category.id
                    )?.allocatedAmount || 0;

                  const totalSpent =
                    categoryBudgets?.find(
                      (budget: any) => budget.category.id === category.id
                    )?.totalSpent || 0;

                  const available = Number(assigned) - Number(totalSpent);

                  return (
                    <DashboardTableRow
                      key={category.id}
                      icon={category.emoji}
                      category={category.name}
                      onAllocate={handleAllocate}
                      assigned={assigned}
                      available={available}
                      totalSpent={totalSpent}
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
