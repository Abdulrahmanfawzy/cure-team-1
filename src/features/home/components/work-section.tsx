import { howItWorksSteps } from "../constants/home-data";

export function HowItWorksSection() {
  return (
    <section className="overflow-hidden py-14 md:py-24">
      <div className="main_contaoner">
        <h2
          className="
            mb-8 text-center
            font-noto-serif-georgian
            text-2xl text-app-secondary
            md:mb-12 md:text-3xl
          "
        >
          How it works
        </h2>

        {/* Cards */}
        <div
          className="
            flex gap-4 overflow-x-auto
            pb-5
            snap-x snap-mandatory
            scrollbar-none

            sm:gap-5

            md:grid md:grid-cols-3
            md:gap-6
            md:overflow-visible
            md:pb-0
          "
        >
          {howItWorksSteps.map((step) => (
            <article
              key={step.id}
              className="
                w-[85%]
                shrink-0
                snap-center

                rounded-2xl
                border border-app-primary-lightest
                bg-white
                p-4
                shadow-sm

                sm:w-[70%]

                md:w-auto
                md:shrink
                md:p-5
              "
            >
              {/* Image */}
              <div
                className="
                  mb-5
                  flex
                  h-40
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  bg-app-primary-lightest

                  sm:h-44
                  md:h-48
                "
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>

              {/* Content */}
              <div>
                <h3
                  className="
                    font-noto-serif-georgian
                    text-base
                    text-app-secondary
                    md:text-lg
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-app-neutral-darker
                    md:text-sm
                  "
                >
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile indicators */}
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {howItWorksSteps.map((step, index) => (
            <span
              key={step.id}
              className={`
                h-1.5 rounded-full
                transition-all
                ${
                  index === 0
                    ? "w-5 bg-app-primary"
                    : "w-1.5 bg-app-neutral"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}