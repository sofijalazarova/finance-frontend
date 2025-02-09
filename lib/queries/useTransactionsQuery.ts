import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/data-service";

export const useTransactionsQuery = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => await getTransactions(),
  });
};
