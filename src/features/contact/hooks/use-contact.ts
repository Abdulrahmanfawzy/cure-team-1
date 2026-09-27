import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "../services/contact-service";

export const useContact = () => {
  return useMutation({
    mutationFn: sendContactMessage,
  });
};