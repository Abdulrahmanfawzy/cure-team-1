import searchDoctorImage from "@/assets/search.png";
import calendarImage from "@/assets/calender.png";
import bookingImage from "@/assets/booking.png";

import type { HowItWorksStep } from "../types/home.types";

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 1,
    type: "search",
    title: "Search for a Doctor",
    description:
      "Find the right doctor based on specialty, location, and availability.",
    image: searchDoctorImage,
  },
  {
    id: 2,
    type: "calendar",
    title: "Choose Date & Time",
    description:
      "Select an available appointment time that works best for you.",
    image: calendarImage,
  },
  {
    id: 3,
    type: "booking",
    title: "Book & Pay Online",
    description:
      "Confirm your appointment and pay securely online.",
    image: bookingImage,
  },
];