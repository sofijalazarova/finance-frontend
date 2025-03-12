import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addAccount as addAccountApi } from "../api/data-service";

export function useCreateAccount() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: addAccount } = useMutation({
    mutationFn: addAccountApi,
    onSuccess: () => {
      toast.success("New account successfully added");

      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addAccount };
}
