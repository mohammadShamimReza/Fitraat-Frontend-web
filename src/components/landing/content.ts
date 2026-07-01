import type { StaticImageData } from "next/image";
import childSafetyImage from "@/app/assets/premarriage.png";
import kegelImage from "@/app/assets/kagelIndividual.png";
import recoveryImage from "@/app/assets/recovary.png";

export type ProgramCard = {
  id: string;
  name: string;
  route: string;
  summary: string;
  outcome: string;
  image: StaticImageData;
  sampleDay: string[];
};

export const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Get Started", href: "#get-started" },
  { label: "FAQ", href: "#faq" },
];

export const trustChips = [
  "Privacy-first learning journey",
  "Mobile-friendly daily plans",
  "Actionable guidance, step by step",
];

export const painPoints = [
  {
    title: "Porn Recovery Program",
    description:
      "You feel stuck in cycles that impact focus, confidence, and relationships.",
  },
  {
    title: "Kegel Exercise Program",
    description:
      "You want better control and performance, but need a structured, consistent routine.",
  },
  {
    title: "Parents & Child Digital Safety Course",
    description:
      "You want to protect children online but need practical safeguards for daily life.",
  },
];

export const programs: ProgramCard[] = [
  {
    id: "porn-recovery",
    name: "Porn Recovery Program",
    route: "/programs/porn-recovary",
    summary:
      "A guided path to rebuild clarity, self-control, and healthy habits through daily actions.",
    outcome: "40-day framework with accountability tasks and progress milestones.",
    image: recoveryImage,
    sampleDay: [
      "5-minute reflection prompt",
      "One focused video lesson",
      "Real-world trigger management task",
    ],
  },
  {
    id: "kegel-exercise",
    name: "Kegel Exercise Program",
    route: "/programs/kegel-exercise",
    summary:
      "Progressive pelvic-floor training designed to improve control and confidence.",
    outcome: "Guided squeeze/relax routines with measurable daily improvements.",
    image: kegelImage,
    sampleDay: [
      "Morning guided set",
      "Afternoon technique check",
      "Night recovery routine",
    ],
  },
  {
    id: "child-digital-safety",
    name: "Parents & Child Digital Safety Course",
    route: "/programs/pre-marriage",
    summary:
      "Practical digital-safety education to help families build safe online habits.",
    outcome: "Clear parent playbooks, conversation scripts, and protection checklists.",
    image: childSafetyImage,
    sampleDay: [
      "Family screen-time audit",
      "Device safety settings walkthrough",
      "One trust-building parent-child conversation exercise",
    ],
  },
];

export const steps = [
  {
    title: "Take free assessment",
    description:
      "Answer a short set of questions so we can guide your starting point.",
  },
  {
    title: "Choose your program",
    description:
      "Pick Porn Recovery, Kegel Exercise, or Parents & Child Digital Safety.",
  },
  {
    title: "Follow daily guidance",
    description:
      "Complete practical tasks in small, consistent steps from any device.",
  },
  {
    title: "Track growth",
    description:
      "Review progress and continue your plan with confidence and support.",
  },
];

export const testimonials = [
  {
    name: "A. Rahman",
    quote:
      "The daily structure helped me stop drifting and finally build steady control again.",
  },
  {
    name: "M. Hasan",
    quote:
      "Kegel routines were easy to follow and the progress tracking kept me consistent.",
  },
  {
    name: "S. Karim",
    quote:
      "The child safety lessons were practical and gave us a clear family plan.",
  },
];

export const faqs = [
  {
    question: "Who is this platform for?",
    answer:
      "It is designed for adults who want guided recovery, men building pelvic strength, and parents who want practical digital-safety guidance for children.",
  },
  {
    question: "Can I start for free?",
    answer:
      "Yes. Start with a free assessment first, then choose the right program based on your needs.",
  },
  {
    question: "Will my information stay private?",
    answer:
      "Yes. We use a privacy-first approach and only collect what is needed to personalize your learning and progress.",
  },
  {
    question: "How quickly can I see progress?",
    answer:
      "Most users report momentum in the first week when they follow daily tasks consistently.",
  },
];
