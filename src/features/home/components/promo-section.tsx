import apple from "@/assets/apple.png";
import play from "@/assets/play.png";
import Iphone from "@/assets/mobile.png";

export function AppPromoSection() {
  return (
    <section
      className="
        relative z-10
        -mb-16
        px-4
        md:-mb-18
      "
    >
      <div className="main_contaoner">
        <div
          className="
            relative overflow-hidden
            rounded-xl bg-[#6292cf]
            px-4 py-5 text-white
            sm:px-5 sm:py-6
            md:px-10 md:py-8
          "
        >
          <div className="max-w-105">
            <h2 className="font-serif text-xl md:text-3xl">
              Your Health, One Tap Away
            </h2>

            <p className="mt-2 max-w-90 text-[9px] leading-4 text-white/90 md:text-xs">
              Book appointments, chat with doctors, and manage your health
              anytime—right from your phone. Download the app now and stay
              connected wherever you are.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <StoreButton icon={play}>
                <small>Get it on</small>
                <strong>Google Play</strong>
              </StoreButton>

              <StoreButton icon={apple}>
                <small>Download on the</small>
                <strong>App Store</strong>
              </StoreButton>
            </div>
          </div>

          <img
            src={Iphone}
            alt="Cure mobile application"
            className="
              mx-auto mt-5
              w-44
              object-contain
              sm:w-48
              md:absolute md:-right-0.5 md:bottom-0
              md:mt-0 md:w-80
            "
          />
        </div>
      </div>
    </section>
  );
}

function StoreButton({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="
        flex h-10 min-w-32
        items-center justify-center
        gap-2 rounded-md
        bg-app-secondary px-2.5
        text-white
        sm:min-w-40
      "
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="size-5 object-contain"
      />

      <span className="flex flex-col items-start leading-none">
        {children}
      </span>
    </button>
  );
}