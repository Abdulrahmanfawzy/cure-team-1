export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  availability: string;
  price: string;
  image: string;
}

export interface Review {
  id: number;
  image: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export type HowItWorksStepType =
  | "search"
  | "calendar"
  | "booking";

export interface HowItWorksStep {
  id: number;
  type: HowItWorksStepType;
  title: string;
  description: string;
  image: string;
}