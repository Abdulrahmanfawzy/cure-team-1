import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useCreateReview from "../hooks/useCreateReview";
import { reviewSchema, type ReviewFormValues } from "../schema/appointment";

const ReviewModal = ({ id }: { id: string }) => {
  const { mutate  } = useCreateReview(id);

  const [open, setOpen] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const rating = form.watch("rating");

  const onSubmit = (data: ReviewFormValues) => {
    mutate(data);

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 p-0 text-lg font-normal text-app-primary hover:bg-transparent hover:text-app-primary"
        >
          <Pencil size={23} />
          add review
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          max-w-112.5
          rounded-4xl
          border-0
          bg-white
          p-6
          shadow-xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-left text-[17px] font-normal text-app-primary">
            Your Rate
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      {/* Stars */}
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.onChange(star)}
                            className="transition-transform hover:scale-110"
                            aria-label={`Rate ${star} out of 5`}
                          >
                            <Star
                              size={31}
                              strokeWidth={3}
                              className={
                                star <= rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-slate-300 text-slate-300"
                              }
                            />
                          </button>
                        ))}
                      </div>

                      {/* Rating number */}
                      <span className="text-[40px] font-light leading-none text-slate-900">
                        {rating || 0}/5
                      </span>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <label className="mb-3 block text-[17px] font-normal text-slate-800">
                    Your review
                  </label>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your review"
                      className="
                        min-h-64
                        resize-none
                        rounded-3xl
                        border-slate-400
                        px-4
                        py-4
                        text-[15px]
                        text-slate-700
                        placeholder:text-slate-500
                        shadow-none
                        focus-visible:border-blue-600
                        focus-visible:ring-1
                        focus-visible:ring-blue-600
                      "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full" size={"xl"}>
              Send your review
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
