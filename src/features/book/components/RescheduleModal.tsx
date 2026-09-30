import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ReschedulePayload } from "../types/book.types";
import { rescheduleSchema } from "../schema/bookingActions.schema";
import useRescheduleBooking from "../hook/useRescheduleBooking";


interface RescheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}

const RescheduleModal = ({
  open,
  onOpenChange,
  bookingId,
}: RescheduleModalProps) => {
  const form = useForm<ReschedulePayload>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: {
      slot_id: "",
    },
  });

  const { mutate, isPending } = useRescheduleBooking();

  const onSubmit = (values: ReschedulePayload) => {
    mutate(
      {
        bookingId,
        payload: values,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>

          <DialogDescription>
            Select a new available time for your appointment.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="slot_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Slot</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a slot" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {/* الـ slots هتتحط هنا بعد ما نربط endpoint بتاع availability */}
                      <SelectItem value="slot-id-example">
                        10:00 AM
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Rescheduling..." : "Confirm Reschedule"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;