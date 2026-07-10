export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  placeholder?: boolean;
}

export const TEAM: TeamMember[] = [
  {
    name: "Nahum Durrani",
    role: "Lead Developer",
    bio: "Software engineering student at York University. Built and maintains Ophth-ordle.",
    initials: "ND",
  },
  {
    name: "Add name",
    role: "Add role",
    bio: "Add a short bio here.",
    initials: "?",
    placeholder: true,
  },
  {
    name: "Add name",
    role: "Add role",
    bio: "Add a short bio here.",
    initials: "?",
    placeholder: true,
  },
];
