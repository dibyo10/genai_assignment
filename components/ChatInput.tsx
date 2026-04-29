"use client";
import { useEffect, useRef } from "react";
import { Mentor } from "@/lib/mentors";

interface Props {
  mentor: Mentor;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function ChatInput({ mentor, value, onChange, onSubmit, disabled }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    const next = Math.max(56, Math.min(ref.current.scrollHeight, 200));
    ref.current.style.height = next + "px";
  }, [value]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (!disabled && value.trim()) onSubmit(); }}
      className="rounded-lg border-2 border-navy bg-white shadow-sticker"
    >
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && value.trim()) onSubmit();
          }
        }}
        rows={2}
        placeholder={`Ask ${mentor.name.split(" ")[0]}…`}
        className="w-full bg-transparent px-4 pt-3 pb-2 outline-none text-sm placeholder:text-navy/40 min-h-[56px] block"
      />
      <div className="flex items-center justify-between px-3 py-2 border-t-2 border-navy/10">
        <span className="text-[11px] text-navy/50 font-medium">⏎ send · ⇧⏎ newline</span>
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="px-4 py-1.5 rounded-md bg-lime border-2 border-navy text-navy text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 transition-transform shadow-sticker-sm"
        >
          Send →
        </button>
      </div>
    </form>
  );
}
