import { Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    value: "080 707 555-321",
  },
  {
    icon: Mail,
    value: "demo@example.com",
  },
  {
    icon: MapPin,
    value: (
      <>
        <span>526 Melrose Street, Water Mill, 11976</span>
        <span>New York</span>
      </>
    ),
  },
];

export function ContactInfo() {
  return (
    <div className="w-full lg:max-w-130">
      <h1 className="font-noto-serif-georgian text-4xl font-medium leading-tight md:text-5xl">
        Contact Us
      </h1>

      <p className="mt-4 max-w-117.5 text-lg leading-[1.35] text-neutral-darker md:text-xl">
        We are committed to processing the information in order to contact you
        and talk about your questions
      </p>

      <div className="mt-10 space-y-7">
        {contactItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 text-base md:text-lg"
            >
              <Icon
                size={21}
                strokeWidth={1.7}
                className="mt-0.5 shrink-0 text-app-primary"
              />

              <div className="flex flex-col leading-[1.35]">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}