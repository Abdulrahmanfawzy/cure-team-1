import { Plus } from "lucide-react";
import { faqItems } from "../constants/home-data";

export function FAQSection() {
  return (
    <section className="pb-12 md:pb-20">
      <div className="main_contaoner">
        <div className="mx-auto max-w-120 text-center">
            <span
            className="
               inline-flex rounded-full
              bg-app-primary-lightest
              px-4 py-1.5 mb-3
              text-[9px] text-app-primary
            "
          >
            Frequently Asked Questions
          </span>
          <h2 className="mb-6 text-center font-serif text-2xl text-app-secondary md:text-3xl">
            Got Questions ? We've got Answers!
          </h2>

          <div className="space-y-2">
            {faqItems.map((item) => (
              <details
                key={item.id}
                className="
                  group
                  rounded-md
                  bg-app-neutral-lightest
                  px-3
                  transition-colors
                "
              >
                <summary
                  className="
                    flex cursor-pointer
                    list-none items-center
                    justify-between
                    gap-4 py-3
                    text-xs
                    text-app-secondary
                    [&::-webkit-details-marker]:hidden
                  "
                >
                  <span>{item.question}</span>

                  <Plus
                    size={15}
                    className="
                      shrink-0
                      transition-transform
                      group-open:rotate-45
                    "
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