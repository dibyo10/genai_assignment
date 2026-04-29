"use client";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Mentor } from "@/lib/mentors";
import { Markdown } from "./Markdown";
import { SuggestionChips } from "./SuggestionChips";
import { ChatInput } from "./ChatInput";

interface Props {
  mentor: Mentor;
  visible: boolean;
}

const storageKey = (id: string) => `chat:v1:${id}`;

export function MentorChat({ mentor, visible }: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [initial, setInitial] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(mentor.id));
      if (raw) setInitial(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, [mentor.id]);

  if (!hydrated) return null;
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <Inner mentor={mentor} initial={initial} />
    </div>
  );
}

function Inner({ mentor, initial }: { mentor: Mentor; initial: any[] }) {
  const { messages, input, setInput, handleSubmit, isLoading, append, setMessages } = useChat({
    api: "/api/chat",
    id: mentor.id,
    initialMessages: initial,
    body: { mentorId: mentor.id },
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(mentor.id), JSON.stringify(messages));
    } catch {}
  }, [messages, mentor.id]);

  const onPick = (text: string) => append({ role: "user", content: text });
  const onSubmit = () => {
    const fake = { preventDefault() {} } as any;
    handleSubmit(fake);
  };
  const clear = () => {
    setMessages([]);
    try { localStorage.removeItem(storageKey(mentor.id)); } catch {}
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-10 px-6 lg:px-12 py-10">
      <aside className="space-y-8 lg:sticky lg:top-10 self-start">
        <div className="flex items-start gap-4">
          <div
            className="display text-2xl w-12 h-12 flex items-center justify-center text-paper"
            style={{ background: mentor.accent }}
          >
            {mentor.avatar}
          </div>
          <div>
            <div className="display text-xl leading-tight">{mentor.name}</div>
            <div className="text-xs text-muted mt-1">{mentor.title}</div>
          </div>
        </div>
        <div className="text-xs text-muted leading-relaxed">
          <span className="smallcaps" style={{ color: mentor.accent }}>Beat</span>
          <p className="mt-2">{mentor.domainScope}</p>
        </div>
        {messages.length === 0 ? (
          <SuggestionChips mentor={mentor} onPick={onPick} />
        ) : (
          <button
            onClick={clear}
            className="smallcaps text-muted hover:text-ink"
          >
            Clear conversation →
          </button>
        )}
      </aside>

      <section>
        <div className="max-w-2xl space-y-10">
          {messages.length === 0 && (
            <div className="fade-up">
              <div className="smallcaps text-muted mb-3">An interview with</div>
              <h2 className="display text-5xl lg:text-6xl leading-[0.95]">
                {mentor.name}.
              </h2>
              <p className="mt-6 text-sm text-muted max-w-md">
                Pick a question on the left, or type your own below. Threads are kept separately for each mentor.
              </p>
            </div>
          )}

          {messages.map((m) => (
            <article key={m.id} className="fade-up">
              {m.role === "user" ? (
                <div className="text-sm">
                  <div className="smallcaps text-muted mb-2">You asked</div>
                  <div className="display italic text-xl leading-snug text-ink/80">
                    “{m.content}”
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="smallcaps mb-3 flex items-center gap-2"
                    style={{ color: mentor.accent }}
                  >
                    <span
                      className="inline-block w-6 h-px"
                      style={{ background: mentor.accent }}
                    />
                    {mentor.name} replies
                  </div>
                  <Markdown>{m.content}</Markdown>
                  {isLoading && m === messages[messages.length - 1] && (
                    <span className="caret" style={{ color: mentor.accent }} />
                  )}
                </div>
              )}
            </article>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="smallcaps text-muted fade-up">
              <span
                className="inline-block w-6 h-px mr-2 align-middle"
                style={{ background: mentor.accent }}
              />
              {mentor.name.split(" ")[0]} is thinking…
            </div>
          )}

          <div ref={bottomRef} />

          <div className="pt-4">
            <ChatInput
              mentor={mentor}
              value={input}
              onChange={setInput}
              onSubmit={onSubmit}
              disabled={isLoading}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
