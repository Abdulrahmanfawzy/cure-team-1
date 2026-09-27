import { Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { doctors } from "../constants/home-data";

export function DoctorsSection() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="main_contaoner">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-app-secondary md:text-3xl">
              Top-Rated Doctors Chosen by Patients
            </h2>

            <p className="mt-2 max-w-130 text-xs leading-4 text-app-neutral-darker">
              Explore our highest-rated doctors, trusted by real patients for
              their expertise, care, and service.
            </p>
          </div>

          <Link
            to="/doctors"
            className="
              hidden shrink-0 rounded-md
              border border-app-primary
              px-5 py-2 text-[10px]
              text-app-primary
              sm:block
            "
          >
            View All
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="mt-5 flex justify-center sm:hidden">
          <Link
            to="/doctors"
            className="
              rounded-md border border-app-primary
              px-7 py-2 text-[10px]
              text-app-primary
            "
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

function DoctorCard({
  doctor,
}: {
  doctor: (typeof doctors)[number];
}) {
  return (
    <article
      className="
        min-w-70 flex-1
        rounded-xl border border-app-neutral-lightest
        bg-white p-2
        shadow-sm
        md:min-w-62.5
      "
    >
      <div className="flex gap-3">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="size-12 rounded-lg object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[11px] font-medium text-app-secondary">
            {doctor.name}
          </h3>

          <p className="truncate text-[11px] text-app-neutral-darker">
            {doctor.specialty} | {doctor.hospital}
          </p>

          <div className="mt-1 flex items-center gap-1 text-[8px]">
            <Star
              size={10}
              className="fill-app-gold text-app-gold"
            />
            <span>{doctor.rating}</span>

            <Clock3
              size={9}
              className="ml-1 text-app-neutral"
            />

            <span>{doctor.availability}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-app-neutral-darker">
          Price/hour
        </span>

        <span className="text-[10px] font-medium text-app-error">
          {doctor.price}
        </span>
      </div>

      <Link
        to={`/doctors/${doctor.id}/appointment`}
        className="
          mt-2 flex h-8
          items-center justify-center
          rounded-md bg-app-primary
          text-[10px] font-medium text-white
          transition-colors hover:bg-app-primary-lighter
        "
      >
        Book appointment
      </Link>
    </article>
  );
}