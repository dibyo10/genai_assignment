"use client";
import { Mentor } from "@/lib/mentors";

interface Props {
  mentor: Mentor;
  onPick: (text: string) => void;
}

export function SuggestionChips({ mentor, onPick }: Props) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {mentor.suggestions.map((s, i) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className={`text-left px-4 py-3 rounded-md border-2 border-navy bg-white hover:bg-lime transition-all hover:-translate-y-0.5 text-sm font-medium shadow-sticker-sm ${
            i % 2 === 0 ? "tilt-l-sm" : "tilt-r-sm"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
