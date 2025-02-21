import { useQuery } from "@tanstack/react-query";
import { getCategoryBudgets } from "../api/data-service";

export const useCategoryBudgetsQuery = () => {
  return useQuery({
    queryKey: ["categoryBudgets"],
    queryFn: async () => await getCategoryBudgets(),
  });
};
