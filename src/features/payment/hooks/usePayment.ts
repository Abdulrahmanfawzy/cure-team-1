import { useMutation } from "@tanstack/react-query";

import { makePayment } from "../services/payment.service";

export const usePayment = () => {
  return useMutation({
    mutationFn: makePayment,
  });
};
