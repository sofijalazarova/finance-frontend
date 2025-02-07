import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/data-service";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });
};
