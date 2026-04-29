"use client";
import { Mentor } from "@/lib/mentors";

interface Props {
  mentor: Mentor;
  onPick: (text: string) => void;
}

export function SuggestionChips({ mentor, onPick }: Props) {
  return (
    <div className="space-y-2">
      <div className="smallcaps text-muted">Suggested openings</div>
      <ul className="space-y-2">
        {mentor.suggestions.map((s) => (
          <li key={s}>
            <button
              onClick={() => onPick(s)}
              className="text-left w-full px-4 py-3 border border-rule hover:border-ink transition-colors text-sm"
              style={{ borderLeftWidth: "3px", borderLeftColor: mentor.accent }}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
