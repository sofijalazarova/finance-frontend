import { useQuery } from "@tanstack/react-query";
import { getSavingGoals } from "../api/data-service";

export const useSavingsQuery = () => {
  return useQuery({
    queryKey: ["savings"],
    queryFn: async () => await getSavingGoals(),
  });
};
