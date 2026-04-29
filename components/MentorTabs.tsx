"use client";
import { Mentor, MentorId, mentorList } from "@/lib/mentors";

interface Props {
  active: MentorId;
  onChange: (id: MentorId) => void;
}

export function MentorTabs({ active, onChange }: Props) {
  return (
    <nav className="grid grid-cols-3 border-y border-rule">
      {mentorList.map((m: Mentor) => {
        const isActive = m.id === active;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`group relative px-4 py-5 text-left transition-colors duration-200 ${
              isActive ? "bg-paper" : "hover:bg-black/[0.02]"
            }`}
            style={{
              borderTop: `3px solid ${isActive ? m.accent : "transparent"}`,
              marginTop: "-1px",
            }}
          >
            <div className="flex items-baseline gap-3">
              <span
                className="smallcaps"
                style={{ color: isActive ? m.accent : "#6b6457" }}
              >
                No. 0{["anshuman", "abhimanyu", "kshitij"].indexOf(m.id) + 1}
              </span>
              {isActive && (
                <span className="smallcaps text-muted">— now reading</span>
              )}
            </div>
            <div className="display text-2xl mt-1 leading-tight">
              {m.name}
            </div>
            <div className="text-xs text-muted mt-1">{m.title}</div>
          </button>
        );
      })}
    </nav>
  );
}
