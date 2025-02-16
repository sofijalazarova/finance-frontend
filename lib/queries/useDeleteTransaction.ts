import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTransaction as deleteTransactionApi } from "../api/data-service";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTransaction } = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: () => {
      toast.success("Transaction successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTransaction };
}
