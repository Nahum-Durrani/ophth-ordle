"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadStats } from "@/lib/storage";
import Modal from "./Modal";
import StatsBlock from "./StatsBlock";

type Panel = "menu" | "how-to-play" | "stats" | null;

export default function SiteMenu() {
  const [panel, setPanel] = useState<Panel>(null);
  const stats = loadStats();

  useEffect(() => {
    if (panel !== "menu") return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPanel(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panel]);

  return (
    <>
      <button
        type="button"
        onClick={() => setPanel("menu")}
        aria-label="Open menu"
        className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-md hover:bg-white/10"
      >
        <span aria-hidden className="h-[2px] w-5 rounded-full bg-white" />
        <span aria-hidden className="h-[2px] w-5 rounded-full bg-white" />
        <span aria-hidden className="h-[2px] w-5 rounded-full bg-white" />
      </button>

      {panel === "menu" && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setPanel(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-64 flex-col gap-1 bg-pupil p-6"
          >
            <button
              type="button"
              onClick={() => setPanel(null)}
              aria-label="Close menu"
              className="mb-4 self-start text-lg text-white/60 hover:text-white"
            >
              ✕
            </button>
            <MenuLink href="/" onClick={() => setPanel(null)}>
              Home
            </MenuLink>
            <MenuItem onClick={() => setPanel("how-to-play")}>How to Play</MenuItem>
            <MenuItem onClick={() => setPanel("stats")}>Stats</MenuItem>
            <MenuLink href="/team" onClick={() => setPanel(null)}>
              Meet the Team
            </MenuLink>
          </div>
          <div className="flex-1 bg-pupil/40" />
        </div>
      )}

      <Modal open={panel === "how-to-play"} onClose={() => setPanel(null)} title="How to Play">
        <ul className="flex flex-col gap-3 text-sm leading-relaxed text-pupil/90">
          <li>Each case reveals one clue on load, ordered generic to specific.</li>
          <li>Type a diagnosis into the box — full names and common abbreviations both count.</li>
          <li>A wrong guess reveals the next clue. You get 5 guesses total.</li>
          <li>Win or lose, you'll see the diagnosis, its aliases, and four teaching points.</li>
          <li>One case a day, the same for everyone. Come back tomorrow for the next one.</li>
        </ul>
      </Modal>

      <Modal open={panel === "stats"} onClose={() => setPanel(null)} title="Your Stats">
        <StatsBlock stats={stats} />
      </Modal>
    </>
  );
}

function MenuItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-left font-display text-sm font-semibold text-white hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function MenuLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-2.5 text-left font-display text-sm font-semibold text-white hover:bg-white/10"
    >
      {children}
    </Link>
  );
}
