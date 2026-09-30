import { Plus } from "lucide-react";

import { useFAQs } from "../hooks/use-home";

export function FAQSection() {
  const {
    data: faqItems = [],
    isLoading,
    isError,
  } = useFAQs();

  if (isLoading) {
    return (
      <section className="pb-12 md:pb-20">
        <div className="main_container">
          <div className="mx-auto max-w-120">
            <div className="mx-auto mb-3 h-6 w-40 animate-pulse rounded-full bg-app-neutral-lightest" />

            <div className="mx-auto mb-6 h-9 w-72 animate-pulse rounded bg-app-neutral-lightest" />

            <div className="space-y-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-11 animate-pulse rounded-md bg-app-neutral-lightest"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || faqItems.length === 0) {
    return null;
  }

  return (
    <section className="pb-12 md:pb-20">
      <div className="main_container">
        <div className="mx-auto max-w-120 text-center">
          <span className="mb-3 inline-flex rounded-full bg-app-primary-lightest px-4 py-1.5 text-[9px] text-app-primary">
            Frequently Asked Questions
          </span>

          <h2 className="mb-6 text-center font-serif text-2xl text-app-secondary md:text-3xl">
            Got Questions ? We've got Answers!
          </h2>

          <div className="space-y-2 text-left">
            {faqItems.map((item) => (
              <details
                key={item.id}
                className="group rounded-md bg-app-neutral-lightest px-3 transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-xs text-app-secondary [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>

                  <Plus
                    size={15}
                    className="shrink-0 transition-transform group-open:rotate-45"
                  />
                </summary>

                <p className="pb-3 pr-8 text-[10px] leading-4 text-app-neutral-darker">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}