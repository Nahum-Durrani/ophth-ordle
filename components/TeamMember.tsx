import { TeamMember as TeamMemberData } from "@/lib/team";

export default function TeamMember({ member }: { member: TeamMemberData }) {
  const { name, role, bio, initials, placeholder } = member;

  return (
    <li className="flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-sm sm:p-6">
      <span
        aria-hidden
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
          placeholder
            ? "border border-dashed border-vitreous/40 text-vitreous/60"
            : "bg-reflex/10 text-reflex"
        }`}
      >
        {initials}
      </span>
      <div>
        <h3 className={`font-display text-base font-bold ${placeholder ? "text-vitreous" : "text-pupil"}`}>
          {name}
        </h3>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-reflex">{role}</p>
        <p className="mt-2 text-sm leading-relaxed text-pupil/80">{bio}</p>
      </div>
    </li>
  );
}
