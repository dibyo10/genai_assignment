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
    <main className="relative min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="relative z-20 border-b-2 border-navy bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
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
      <div className="relative z-10 border-b-2 border-navy bg-white sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest text-navy/50 shrink-0">
            Pick a mentor →
          </span>
          <MentorTabs active={active} onChange={setActive} />
        </div>
      </div>

      <div className="flex-1">
        {hydrated &&
          (Object.keys(mentors) as MentorId[]).map((id) => (
            <MentorChat key={id} mentor={mentors[id]} visible={id === active} />
          ))}
      </div>

      <footer className="relative z-10 border-t-2 border-navy bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="font-bold">Scaler Mentor — a chat with three voices.</div>
          <div className="text-navy/60">Built with Next.js · GPT-5.2 · chats live only on this device</div>
        </div>
      </footer>
    </main>
  );
}
