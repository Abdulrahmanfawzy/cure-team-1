import { useMutation, useQueryClient } from "@tanstack/react-query";

import { storePaymentMethod } from "../services/payment.service";

export const useStorePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storePaymentMethod,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payment-methods"],
      });
    },
  });
};