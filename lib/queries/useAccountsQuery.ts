import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "../api/data-service";

export const useAccountsQuery = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => await getAccounts(),
  });
};
