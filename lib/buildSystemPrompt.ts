import { mentors, MentorId, REDIRECT_RULES } from "./mentors";
import { HUMANIZER_SUFFIX } from "./humanizer";

export function buildSystemPrompt(mentorId: MentorId): string {
  const m = mentors[mentorId];
  return [
    m.systemPrompt,
    `\n## Your domain\n${m.domainScope}`,
    REDIRECT_RULES,
    HUMANIZER_SUFFIX,
  ].join("\n");
}
