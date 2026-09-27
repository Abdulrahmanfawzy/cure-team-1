import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useContact } from "../hooks/use-contact";
import type { ContactFormData } from "../types/contact-types";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { mutate, isPending, isSuccess, isError } = useContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:max-w-[530px]"
    >
      <div className="space-y-4">
        {/* Name */}
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="h-[52px] w-full rounded-[10px] border border-neutral outline-none px-4 text-base  transition-colors focus:border-app-primary focus:ring-1 focus:ring-app-primary"
          />

          {errors.name && (
            <p className="mt-1.5 text-sm text-app-error">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="h-[52px] w-full rounded-[10px] border border-neutral outline-none px-4 text-base transition-colors focus:border-app-primary focus:ring-1 focus:ring-app-primary"
          />

          {errors.email && (
            <p className="mt-1.5 text-sm text-app-error">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            {...register("message")}
            placeholder="Message"
            rows={7}
            className="min-h-[185px] w-full resize-none rounded-[10px] border border-neutral px-4 py-4 text-base  outline-none transition-colors focus:border-app-primary focus:ring-1 focus:ring-app-primary"
          />

          {errors.message && (
            <p className="mt-1.5 text-sm text-app-error">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 h-[52px] w-full rounded-[10px] bg-app-primary text-base font-medium text-white shadow-md transition-all hover:bg-app-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Submit"}
      </button>

      {isSuccess && (
        <p className="mt-3 text-sm text-green-600">
          Your message has been sent successfully.
        </p>
      )}

      {isError && (
        <p className="mt-3 text-sm text-app-error">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}