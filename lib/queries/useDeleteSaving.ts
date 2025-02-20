import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSaving as deleteSavingApi } from "../api/data-service";

export function useDeleteSaving() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteSaving } = useMutation({
    mutationFn: deleteSavingApi,
    onSuccess: () => {
      toast.success("Saving goal successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["savings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteSaving };
}
