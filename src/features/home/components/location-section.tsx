import { MapPin, Search } from "lucide-react";

const mapUrl =
  "https://www.google.com/maps/embed?pb=YOUR_REAL_MAP_URL";

export function LocationSection() {
  return (
    <section className="pb-18 md:pb-24">
      <div className="main_contaoner">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="max-w-100">
            <h2 className="font-serif text-2xl leading-tight text-app-secondary md:text-3xl">
              Find Care Near You
              <br />
              in Seconds
            </h2>

            <p className="mt-4 text-xs leading-5 text-app-neutral-darker md:text-sm">
              Allow location access or choose your city to instantly discover
              trusted doctors and clinics around you—quick, easy, and local.
            </p>

            <button
              type="button"
              className="
                mt-5 inline-flex h-9
                items-center gap-2
                rounded-md border border-app-primary
                px-4 text-[10px]
                text-app-primary
                transition-colors
                hover:bg-app-primary-lightest
              "
            >
              <Search size={13} />
              Search by location
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            {/* Google Map */}
            <iframe
              title="Cure location"
              src={mapUrl}
              className="aspect-[1.4] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Doctor map pins */}
            <MapDoctorPin className="left-[35%] top-[35%]" />
            <MapDoctorPin className="left-[62%] top-[18%]" />
            <MapDoctorPin className="left-[68%] top-[65%]" />

            <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs text-red-500">
              <MapPin size={18} fill="currentColor" />
              <span className="sr-only">Current location</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapDoctorPin({ className }: { className: string }) {
  return (
    <div
      className={`absolute flex size-9 items-center justify-center rounded-full border-2 border-white bg-app-secondary shadow-lg ${className}`}
    >
      <img
        src="/images/doctors/doctor-1.jpg"
        alt=""
        className="size-7 rounded-full object-cover"
      />
    </div>
  );
}