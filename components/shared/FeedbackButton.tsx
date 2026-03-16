"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquarePlus, Send, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Feedback Widget",
          email,
          message,
          type: "feedback",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong.");
        return;
      }
      setSent(true);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setSent(false);
    setEmail("");
    setMessage("");
  }

  function toggle() {
    if (!open) {
      reset();
    }
    setOpen((o) => !o);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      <div
        ref={panelRef}
        className={`origin-bottom-right transition-all duration-200 ${
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-80 rounded-2xl border bg-background shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-sm font-semibold">Send us feedback</span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 hover:bg-accent transition-colors"
              aria-label="Close feedback"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {sent ? (
            <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <p className="text-sm font-medium">Thanks for your feedback!</p>
              <p className="text-xs text-muted-foreground">We read every message.</p>
              <button
                onClick={reset}
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="What's on your mind? Bug reports, feature requests, or just say hi..."
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-3.5 w-3.5" />
                {sending ? "Sending..." : "Send feedback"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Floating trigger */}
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-label={open ? "Close feedback" : "Send feedback"}
        aria-expanded={open}
        className={`group flex items-center gap-2 rounded-full shadow-lg transition-all duration-200 ${
          open
            ? "bg-muted text-foreground px-3 py-3"
            : "bg-primary text-primary-foreground pl-4 pr-5 py-3 hover:bg-primary/90 hover:shadow-xl hover:scale-105"
        }`}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageSquarePlus className="h-5 w-5" />
            <span className="text-sm font-medium">Feedback</span>
          </>
        )}
      </button>
    </div>
  );
}
