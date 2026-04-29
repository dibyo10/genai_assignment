"use client";
import { Mentor, MentorId, mentorList } from "@/lib/mentors";

interface Props {
  active: MentorId;
  onChange: (id: MentorId) => void;
}

export function MentorTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-1">
      {mentorList.map((m: Mentor, i) => {
        const isActive = m.id === active;
        const tilt = i === 0 ? "tilt-l-sm" : i === 2 ? "tilt-r-sm" : "";
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`shrink-0 px-4 py-2 text-sm font-bold flex items-center gap-2 transition-all rounded-md border-2 border-navy ${tilt} ${
              isActive
                ? "bg-navy text-white shadow-sticker-lime translate-y-0"
                : "bg-white text-navy shadow-sticker-sm hover:-translate-y-0.5"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold border-2 border-navy ${
                isActive ? "bg-lime text-navy" : "bg-navy text-white"
              }`}
            >
              {m.avatar}
            </span>
            <span>{m.name.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
