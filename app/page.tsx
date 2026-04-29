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
    <main className="relative h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="relative z-20 border-b-2 border-navy bg-cream shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg sticker-navy grid place-items-center font-bold tilt-l-sm">
              S
            </div>
            <div>
              <div className="display text-lg leading-none">Scaler Mentor</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-navy/50 mt-0.5">v1.0 · alpha</div>
            </div>
          </div>
          <div className="hidden sm:block sticker-lime rounded-md px-3 py-1.5 tilt-r-sm">
            <span className="serif-italic text-sm">1% better everyday.</span>
          </div>
        </div>
      </header>

      {/* Sub bar with tabs */}
      <div className="relative z-10 border-b-2 border-navy bg-white shrink-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest text-navy/50 shrink-0">
            Pick a mentor →
          </span>
          <MentorTabs active={active} onChange={setActive} />
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        {hydrated &&
          (Object.keys(mentors) as MentorId[]).map((id) => (
            <MentorChat key={id} mentor={mentors[id]} visible={id === active} />
          ))}
      </div>
    </main>
  );
}
