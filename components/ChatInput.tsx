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
    ref.current.style.height = Math.min(ref.current.scrollHeight, 200) + "px";
  }, [value]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (!disabled && value.trim()) onSubmit(); }}
      className="border border-rule bg-paper"
      style={{ borderLeftWidth: "3px", borderLeftColor: mentor.accent }}
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
        className="w-full bg-transparent px-4 py-3 outline-none text-sm placeholder:text-muted"
      />
      <div className="flex items-center justify-between px-4 py-2 border-t border-rule/60">
        <span className="smallcaps text-muted">Enter to send · Shift+Enter for newline</span>
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="smallcaps px-3 py-1.5 disabled:opacity-30"
          style={{ color: mentor.accent }}
        >
          Send →
        </button>
      </div>
    </form>
  );
}
