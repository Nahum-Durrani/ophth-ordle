import { TeamMember as TeamMemberData } from "@/lib/team";

export default function TeamMember({ member }: { member: TeamMemberData }) {
  const { name, role, bio, initials, placeholder } = member;

  return (
    <li className="flex gap-4 rounded-card border border-border bg-card p-6 shadow-card">
      <span
        aria-hidden
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
          placeholder
            ? "border border-dashed border-muted/40 text-muted/60"
            : "bg-accent/10 text-accent"
        }`}
      >
        {initials}
      </span>
      <div>
        <h3 className={`font-display text-base font-bold ${placeholder ? "text-muted" : "text-primary"}`}>
          {name}
        </h3>
        <p className="mt-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-accent">
          {role}
        </p>
        <p className="mt-2 text-body leading-relaxed text-secondary">{bio}</p>
      </div>
    </li>
  );
}
