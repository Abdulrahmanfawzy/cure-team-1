import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


import { z } from "zod";
import { cancelSchema } from "../schema/bookingActions.schema";
import useCancelBooking from "../hook/useCancelBooking";
import type { CancelPayload } from "../types/book.types";

interface CancelBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}

type CancelFormValues = z.infer<typeof cancelSchema>;

export default function CancelBookingModal({
  open,
  onOpenChange,
  bookingId,
}: CancelBookingModalProps) {
  const mutation = useCancelBooking();

  const form = useForm<CancelFormValues>({
    resolver: zodResolver(cancelSchema),
    defaultValues: {
      cancel_reason: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onSubmit = (values: CancelFormValues) => {
    const payload: CancelPayload = {
      cancel_reason: values.cancel_reason,
    };

    mutation.mutate(
      {
        bookingId,
        payload,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cancel appointment</DialogTitle>

          <DialogDescription>
            Please tell us why you want to cancel this appointment.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="cancel_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cancellation reason</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your reason..."
                      className="min-h-[120px] resize-none"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Keep appointment
              </Button>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-app-primary"
              >
                {mutation.isPending ? "Canceling..." : "Cancel appointment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
