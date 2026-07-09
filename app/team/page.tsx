import type { Metadata } from "next";
import { TEAM } from "@/lib/team";
import TeamMember from "@/components/TeamMember";

export const metadata: Metadata = {
  title: "Meet the Team — Ophth-ordle",
};

export default function TeamPage() {
  return (
    <div className="w-full max-w-2xl">
      <h1 className="mb-6 text-center font-display text-2xl font-bold text-pupil">
        Meet the Team
      </h1>
      <ul className="flex flex-col gap-4">
        {TEAM.map((member, i) => (
          <TeamMember key={i} member={member} />
        ))}
      </ul>
    </div>
  );
}
