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
    <div className="absolute inset-0" style={{ display: visible ? "flex" : "none" }}>
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
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
    <div className="flex flex-col w-full h-full">
      {/* Scrollable message area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {messages.length === 0 ? (
            <div className="fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl sticker-navy grid place-items-center text-lg font-bold tilt-l-sm">
                  {mentor.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-navy/60">Now talking to</div>
                  <div className="display text-2xl leading-none">{mentor.name}</div>
                  <div className="text-xs text-navy/60 mt-1">{mentor.title}</div>
                </div>
              </div>

              <h1 className="display text-4xl sm:text-5xl leading-[0.95] mb-3">
                What do you wanna ask{" "}
                <span className="bg-lime px-2 inline-block tilt-r-sm">{mentor.name.split(" ")[0]}?</span>
              </h1>
              <p className="text-sm text-navy/70 mb-8 max-w-md">{mentor.domainScope}</p>

              <SuggestionChips mentor={mentor} onPick={onPick} />

              <div className="mt-12 grid sm:grid-cols-[1fr_auto] gap-6 items-end">
                <div className="sticker rounded-lg p-5 max-w-md tilt-l-sm">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy/50 mb-2">About this</div>
                  <p className="text-sm leading-relaxed">
                    Three Scaler mentors, three lanes. Each one stays in their domain and hands you off when a question is not theirs to answer. Threads stay separate per mentor and only live on this device.
                  </p>
                </div>
                <div className="sticker-lime rounded-lg p-5 tilt-r text-center min-w-[180px]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Mantra</div>
                  <div className="serif-italic text-2xl leading-tight mt-1">
                    1% better<br />everyday.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end fade-in">
                    <div className="max-w-[85%] bg-navy text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm whitespace-pre-wrap border-2 border-navy shadow-sticker-sm">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex gap-3 fade-in">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-navy text-white grid place-items-center text-xs font-bold border-2 border-navy shadow-sticker-sm">
                      {mentor.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-navy mb-1">{mentor.name.split(" ")[0]}</div>
                      <div className="bg-white border-2 border-navy rounded-2xl rounded-tl-md px-4 py-3 shadow-sticker-sm">
                        <Markdown>{m.content}</Markdown>
                      </div>
                    </div>
                  </div>
                ),
              )}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 fade-in">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-navy text-white grid place-items-center text-xs font-bold border-2 border-navy">
                    {mentor.avatar}
                  </div>
                  <div className="bg-white border-2 border-navy px-4 py-3 rounded-2xl rounded-tl-md text-navy/60 shadow-sticker-sm">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed input row at bottom */}
      <div className="shrink-0 border-t-2 border-navy bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <ChatInput
            mentor={mentor}
            value={input}
            onChange={setInput}
            onSubmit={onSubmit}
            disabled={isLoading}
          />
          {messages.length > 0 && (
            <div className="flex justify-end mt-2">
              <button
                onClick={clear}
                className="text-xs font-bold text-navy/60 hover:text-navy underline underline-offset-2"
              >
                clear chat →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
