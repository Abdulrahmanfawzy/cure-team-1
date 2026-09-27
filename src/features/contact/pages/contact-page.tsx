import { ContactForm } from "../components/contact-form";
import { ContactInfo } from "../components/contact-info";

export default function ContactPage() {
  return (
    <main className="w-full bg-white">
      <section className="main_contaoner flex min-h-155 items-center py-20 md:py-24 lg:py-28">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <ContactInfo />

          <div className="flex w-full justify-start lg:justify-end">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}