import type { HowItWorksStep } from "../types/home.types";

import searchDoctorImage from "@/assets/search.png";
import calendarImage from "@/assets/calender.png";
import bookingImage from "@/assets/booking.png";

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

export const doctors = [
  {
    id: 1,
    name: "Robert Johnson",
    specialty: "Orthopedic",
    hospital: "El-Nasr Hospital",
    rating: 4.8,
    availability: "9:30am - 8:00pm",
    price: "$350",
    image: "/images/doctors/doctor-1.jpg",
  },
  {
    id: 2,
    name: "Robert Johnson",
    specialty: "Dermatology",
    hospital: "Cure Hospital",
    rating: 4.8,
    availability: "9:30am - 8:00pm",
    price: "$350",
    image: "/images/doctors/doctor-2.jpg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    specialty: "Cardiology",
    hospital: "Cure Hospital",
    rating: 4.8,
    availability: "9:30am - 8:00pm",
    price: "$350",
    image: "/images/doctors/doctor-3.jpg",
  },
  {
    id: 4,
    name: "Robert Johnson",
    specialty: "Orthopedic",
    hospital: "El-Nasr Hospital",
    rating: 4.8,
    availability: "9:30am - 8:00pm",
    price: "$350",
    image: "/images/doctors/doctor-4.jpg",
  },
];

export const reviews = [
  {
    id: 1,
    image: "/images/reviews/review-1.jpg",
  },
  {
    id: 2,
    image: "/images/reviews/review-2.jpg",
  },
  {
    id: 3,
    image: "/images/reviews/review-3.jpg",
  },
  {
    id: 4,
    image: "/images/reviews/review-4.jpg",
  },
  {
    id: 5,
    image: "/images/reviews/review-5.jpg",
  },
];

export const faqItems = [
  {
    id: 1,
    question: "What is this app used for?",
    answer:
      "Cure helps you discover trusted doctors, check their availability, and book appointments online.",
  },
  {
    id: 2,
    question: "Is the app free to use?",
    answer:
      "Browsing doctors and finding available appointments is free. Appointment fees depend on the doctor.",
  },
  {
    id: 3,
    question: "How can I find a doctor?",
    answer:
      "You can search by specialty, location, or doctor name and browse the available doctors.",
  },
  {
    id: 4,
    question: "Can I cancel my appointment?",
    answer:
      "Yes. You can manage and cancel eligible appointments from your account.",
  },
  {
    id: 5,
    question: "What payment are supported?",
    answer:
      "Available payment methods are displayed during the appointment booking process.",
  },
  {
    id: 6,
    question: "How do I edit my profile?",
    answer:
      "Open your profile and select the edit option to update your personal information.",
  },
];