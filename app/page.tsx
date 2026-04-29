"use client";
import { useEffect, useState } from "react";
import { MentorId, mentors } from "@/lib/mentors";
import { MentorTabs } from "@/components/MentorTabs";
import { MentorChat } from "@/components/MentorChat";

const ACTIVE_KEY = "chat:v1:active";

export default function Home() {
  const [active, setActive] = useState<MentorId>("anshuman");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(ACTIVE_KEY) as MentorId | null;
      if (v && v in mentors) setActive(v);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(ACTIVE_KEY, active);
  }, [active, hydrated]);

  return (
    <main className="relative z-10 min-h-screen">
      <header className="px-6 lg:px-12 pt-10 pb-6">
        <div className="flex items-baseline justify-between">
          <div className="smallcaps text-muted">Vol. 1 · No. 01 · Issued today</div>
          <div className="smallcaps text-muted hidden sm:block">A chat with three Scaler voices</div>
        </div>
        <h1 className="display text-6xl lg:text-8xl leading-[0.9] mt-4">
          Mentor.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Three columnists, three beats. Strategy, engineering, algorithms. Each one
          stays in their lane and will hand you off when a question is not theirs to answer.
        </p>
      </header>

      <MentorTabs active={active} onChange={setActive} />

      {hydrated &&
        (Object.keys(mentors) as MentorId[]).map((id) => (
          <MentorChat key={id} mentor={mentors[id]} visible={id === active} />
        ))}

      <footer className="px-6 lg:px-12 py-10 border-t border-rule mt-10 text-xs text-muted flex justify-between">
        <span>Threads kept locally on this device.</span>
        <span>Set in Fraunces & JetBrains Mono.</span>
      </footer>
    </main>
  );
}
