// Driver types and classification logic

export interface DriverProfile {
  id?: string;
  // Step 1: Personal
  fullName: string;
  email: string;
  phone: string;
  nationalId: string;
  dateOfBirth: string;
  location: string;
  password: string;
  // Step 2: License
  licenseNumber: string;
  licenseCategory: string; // A, B, C, D, E
  licenseExpiry: string;
  yearsExperience: number;
  // Step 3: Experience & Skills
  vehicleTypes: string[]; // manual, automatic, suv, van, bus, truck
  accidentHistory: boolean;
  accidentDetails?: string;
  hasDefensiveDriving: boolean;
  hasFirstAid: boolean;
  languages: string[];
  // Step 4: Goals
  employmentStatus: string; // employed, self-employed, unemployed, seeking
  desiredTraining: string[];
  // Computed
  classification?: DriverClass;
  recommendedTrainings?: TrainingProgram[];
  nextSteps?: string[];
  createdAt?: string;
}

export type DriverClass = "entry" | "intermediate" | "advanced" | "expert";

export interface TrainingProgram {
  id: string;
  code: string;
  name: string;
  description: string;
  duration: string;
  level: DriverClass;
  prerequisites: string[];
  skills: string[];
}

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "eccd",
    code: "ECCD",
    name: "Entry Level Certified Driver",
    description:
      "Foundation course covering basic defensive driving, vehicle maintenance, road safety regulations, and professional conduct. Designed for drivers with 0-2 years experience.",
    duration: "5 Days",
    level: "entry",
    prerequisites: ["Valid driving license", "Clean medical record"],
    skills: [
      "Defensive Driving Basics",
      "Vehicle Pre-Inspection",
      "Road Safety Laws",
      "Professional Etiquette",
      "Basic First Aid",
    ],
  },
  {
    id: "eecc",
    code: "EECC",
    name: "Executive Certified Chauffeur",
    description:
      "Advanced training for professional chauffeurs. Covers VIP protocol, luxury vehicle handling, discretion, route planning, and premium client service. For drivers with 2-5 years experience.",
    duration: "5 Days",
    level: "intermediate",
    prerequisites: [
      "Valid driving license (2+ years)",
      "ECCD or equivalent",
      "Clean driving record",
    ],
    skills: [
      "VIP & Diplomatic Protocol",
      "Luxury Vehicle Operations",
      "Route Optimization",
      "Crisis Management",
      "Discretion & Confidentiality",
      "Advanced Defensive Driving",
    ],
  },
  {
    id: "etms",
    code: "ETMS",
    name: "Executive Transport & Mobility Specialist",
    description:
      "Elite certification for senior transport professionals. Covers fleet coordination, security awareness, multi-vehicle operations, and transport management. For drivers with 5+ years.",
    duration: "5 Days",
    level: "advanced",
    prerequisites: [
      "Valid driving license (5+ years)",
      "EECC or equivalent",
      "Proven professional record",
    ],
    skills: [
      "Fleet Coordination",
      "Security Awareness",
      "Multi-Vehicle Operations",
      "Transport Logistics",
      "Emergency Response",
      "Client Management",
      "Team Leadership",
    ],
  },
  {
    id: "refresher",
    code: "REF",
    name: "Professional Refresher & Upskill",
    description:
      "Short refresher modules for certified drivers to maintain and upgrade skills. Includes latest regulations, technology updates, and specialized vehicle training.",
    duration: "2-3 Days",
    level: "expert",
    prerequisites: ["Any prior certification"],
    skills: [
      "Regulation Updates",
      "Tech Integration (GPS, Apps)",
      "Specialized Vehicle Training",
      "Customer Service Excellence",
    ],
  },
];

export function classifyDriver(driver: Partial<DriverProfile>): {
  classification: DriverClass;
  recommendedTrainings: TrainingProgram[];
  nextSteps: string[];
} {
  const years = driver.yearsExperience || 0;
  const hasDefensive = driver.hasDefensiveDriving || false;
  const hasFirstAid = driver.hasFirstAid || false;
  const categories = driver.licenseCategory || "B";
  const accidentFree = !driver.accidentHistory;
  const vehicleCount = driver.vehicleTypes?.length || 0;

  let classification: DriverClass = "entry";
  const recommendedTrainings: TrainingProgram[] = [];
  const nextSteps: string[] = [];

  // Classification logic
  if (years >= 5 && hasDefensive && accidentFree && vehicleCount >= 3) {
    classification = "expert";
  } else if (years >= 5 && hasDefensive) {
    classification = "advanced";
  } else if (years >= 2 && (hasDefensive || vehicleCount >= 2)) {
    classification = "intermediate";
  } else {
    classification = "entry";
  }

  // Recommend trainings based on classification and gaps
  switch (classification) {
    case "entry":
      recommendedTrainings.push(TRAINING_PROGRAMS[0]); // ECCD
      nextSteps.push("Complete ECCD foundation training");
      nextSteps.push("Obtain first aid certification");
      nextSteps.push("Gain 2+ years of professional experience");
      break;

    case "intermediate":
      recommendedTrainings.push(TRAINING_PROGRAMS[1]); // EECC
      if (!hasFirstAid) {
        nextSteps.push("Obtain first aid certification to advance");
      }
      nextSteps.push("Complete EECC for executive opportunities");
      nextSteps.push("Build experience with luxury/SUV vehicles");
      break;

    case "advanced":
      recommendedTrainings.push(TRAINING_PROGRAMS[2]); // ETMS
      nextSteps.push("Complete ETMS for management roles");
      nextSteps.push("Consider fleet coordination opportunities");
      break;

    case "expert":
      recommendedTrainings.push(TRAINING_PROGRAMS[3]); // Refresher
      nextSteps.push("Maintain certifications with refresher courses");
      nextSteps.push("Mentor junior drivers");
      nextSteps.push("Pursue transport management roles");
      break;
  }

  // Always suggest refresher if they have prior certs but gaps
  if (hasDefensive && classification !== "entry") {
    const hasRefresher = recommendedTrainings.some((t) => t.id === "refresher");
    if (!hasRefresher && classification === "expert") {
      recommendedTrainings.push(TRAINING_PROGRAMS[3]);
    }
  }

  return { classification, recommendedTrainings, nextSteps };
}

export function getClassificationLabel(c: DriverClass): string {
  const labels: Record<DriverClass, string> = {
    entry: "Entry Level Driver",
    intermediate: "Intermediate Professional",
    advanced: "Advanced Specialist",
    expert: "Expert Transport Professional",
  };
  return labels[c];
}

export function getClassificationColor(c: DriverClass): string {
  const colors: Record<DriverClass, string> = {
    entry: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    intermediate: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    advanced: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    expert: "text-gold-400 bg-gold-400/10 border-gold-400/30",
  };
  return colors[c];
}

export function getClassificationBadge(c: DriverClass): string {
  const badges: Record<DriverClass, string> = {
    entry: "ECCD Track",
    intermediate: "EECC Ready",
    advanced: "ETMS Eligible",
    expert: "Master Class",
  };
  return badges[c];
}
