import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { z } from "zod";

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
import { feedbackSchema } from "../schema/bookingActions.schema";
import useFeedback from "../hook/useFeedback";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function FeedbackModal({
  open,
  onOpenChange,
  bookingId,
}: FeedbackModalProps) {
  const mutation = useFeedback();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comment: "",
      rating: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onSubmit = (values: FeedbackFormValues) => {
    mutation.mutate(
      {
        bookingId,
        payload: values,
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
          <DialogTitle>Give your feedback</DialogTitle>

          <DialogDescription>
            How was your appointment with the doctor?
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>

                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => {
                        const active = Number(field.value) >= rating;

                        return (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => field.onChange(String(rating))}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              size={30}
                              className={
                                active
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your feedback</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your feedback..."
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
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-app-primary"
              >
                {mutation.isPending ? "Submitting..." : "Submit feedback"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
