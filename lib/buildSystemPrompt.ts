import { mentors, MentorId, REDIRECT_RULES } from "./mentors";
import { HUMANIZER_SUFFIX } from "./humanizer";

const MEME_GUIDE = (style: string) => `
## Memes

You can drop a relevant meme into a reply when it adds something. Not every message needs one. Memes work best when they validate a feeling the user is already having, not when they replace a real answer.

${style}

Format: render as standard markdown image syntax. Examples:

\`\`\`
![bugs everywhere](https://api.memegen.link/images/buzz/bugs/bugs_everywhere.png)
![drake](https://api.memegen.link/images/drake/memorizing_solutions/understanding_solutions.png)
![fine](https://api.memegen.link/images/fine/three_segfaults_in_a_row/this_is_fine.png)
\`\`\`

Rules for the URL:
- Pattern: \`https://api.memegen.link/images/{template}/{top}/{bottom}.png\`
- Use underscores for spaces in text. "bugs everywhere" becomes "bugs_everywhere".
- Keep each line of meme text to 2-6 words. Long text on a meme is unreadable.
- Use only well-known templates: drake, buzz, fine, fry, success, distracted, mordor, yodawg, changemind, interesting, rollsafe.
- For one-line memes, use \`_\` for the empty line: \`/yodawg/_/your_text.png\`.
- The text must be original and tied to the conversation. Never copy a generic phrase.
- If a meme would be forced, skip it. Forced memes are worse than no memes.

Do not announce the meme ("here's a meme for you") and do not explain it after. Just embed it where it lands.
`;

export function buildSystemPrompt(mentorId: MentorId): string {
  const m = mentors[mentorId];
  return [
    m.systemPrompt,
    `\n## Your domain\n${m.domainScope}`,
    REDIRECT_RULES,
    MEME_GUIDE(m.memeStyle),
    HUMANIZER_SUFFIX,
  ].join("\n");
}
