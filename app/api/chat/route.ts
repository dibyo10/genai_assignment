import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import { buildSystemPrompt } from "@/lib/buildSystemPrompt";
import { MentorId, mentors } from "@/lib/mentors";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, mentorId } = await req.json();

  if (!mentorId || !(mentorId in mentors)) {
    return new Response(
      JSON.stringify({ error: "Invalid mentorId" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const system = buildSystemPrompt(mentorId as MentorId);
  const model = process.env.OPENAI_MODEL || "gpt-5.2";

  const result = streamText({
    model: openai(model),
    system,
    messages: convertToCoreMessages(messages),
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
