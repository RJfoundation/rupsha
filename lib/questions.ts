import { Question } from "@/types";

export const availableSubjects: Record<string, string[]> = {
  Physics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics"],
  Chemistry: ["Atomic Structure", "Chemical Bonding", "Organic Chemistry"],
  Biology: ["Cell Biology", "Human Physiology", "Genetics", "Ecology"],
  Mathematics: ["Algebra", "Calculus", "Trigonometry", "Coordinate Geometry"],
  "Computer Science": ["Programming Basics", "Data Structures", "Algorithms", "Database"],
};

export const sampleQuestions: Question[] = [
  {
    id: 1,
    subject: "Physics",
    chapter: "Mechanics",
    question: "Newton's first law is also known as?",
    options: ["Law of Inertia", "Law of Acceleration", "Law of Action-Reaction", "None"],
    answer: "Law of Inertia"
  },
  {
    id: 2,
    subject: "Physics",
    chapter: "Mechanics",
    question: "SI unit of force is?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    answer: "Newton"
  },
  // আরও ৫০+ প্রশ্ন যোগ করো (আমি চাইলে আরও দিতে পারি)
];
