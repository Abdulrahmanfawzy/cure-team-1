import { useQuery } from "@tanstack/react-query";

import { getPaymentMethods } from "../services/payment.service";

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: getPaymentMethods,
  });
};
