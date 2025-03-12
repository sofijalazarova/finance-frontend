import React from "react";
import { useCategoriesQuery } from "@/lib/queries/useCategoriesQuery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignToCategory,
  fetchBudget,
  getCategoryBudgets,
  getCategoryBudgetsByUser,
} from "@/lib/api/data-service";
import ReusableModal from "../ui/ReusableModal";
import CreateCategoryForm from "./CreateCategoryForm";
import CategoryRow from "./CategoryRow";

const CategoryTable = () => {
  const { data: categories, isLoading } = useCategoriesQuery();

  const { data: budget } = useQuery({
    queryKey: ["budget"],
    queryFn: fetchBudget,
  });

  const activeCategories = categories?.filter(
    (category) => !category.isArchived
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: assignToCategory,
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
    queryFn: getCategoryBudgetsByUser,
  });

  const handleAllocate = async (categoryName: string, amount: string) => {
    const category = activeCategories.find((c: any) => c.name === categoryName);

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
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center justify-start space-x-3">
          <p className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal">
            CATEGORIES
          </p>
          <ReusableModal
            title="Add Category"
            triggerText="+"
            buttonClass="py-1 px-3 text-white bg-dark-teal-green hover:bg-emerald-green rounded-xl shadow-md transition-all"
          >
            <CreateCategoryForm />
          </ReusableModal>
        </div>
        <div className="flex font-roboto text-slate-gray space-x-3 mr-6">
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
              ) : activeCategories?.length > 0 ? (
                activeCategories.map((category: any) => {
                  const assigned =
                    categoryBudgets?.find(
                      (budget: any) => budget.category.id === category.id
                    )?.allocatedAmount || 0;

                  const totalSpent =
                    categoryBudgets?.find(
                      (budget: any) => budget.category.id === category.id
                    )?.totalSpent || 0;

                  const available =
                    categoryBudgets?.find(
                      (budget: any) => budget.category.id === category.id
                    )?.availableAmount || 0;

                  return (
                    <CategoryRow
                      key={category.id}
                      id={category.id}
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
                  <td className="text-center p-4">No categories added yet!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
