"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { cn, EASE_EXPO } from "@/lib/utils";
import { ArrowSwap } from "@/components/ui/button-link";
import { CopyButton } from "@/components/ui/copy-button";

const topics = ["A full-time role", "A freelance project", "Research collaboration", "Just saying hello"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Composes a pre-filled email in the visitor's mail app — no backend, no tracking. */
export function ContactForm() {
  const id = useId();
  const [topic, setTopic] = useState(topics[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const resetOnHide = useRef(false);

  // When Activity hides this route after a send, start fresh next visit: the form
  // remounts with empty fields because it was unmounted while the confirmation showed.
  useLayoutEffect(() => {
    return () => {
      if (resetOnHide.current) {
        resetOnHide.current = false;
        setSent(false);
      }
    };
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That email address doesn't look right.";
    if (message.length < 10) next.message = "A little more detail, please (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `${topic} — from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    resetOnHide.current = true;
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden rounded-4xl border border-line bg-ink-850 p-6 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="flex min-h-[28rem] flex-col justify-center"
            role="status"
          >
            <p className="type-label text-gfp">Draft ready</p>
            <p className="type-h2 mt-4 font-semibold">Your email app should open now.</p>
            <p className="mt-4 max-w-md text-bone-dim">
              If nothing happened, copy my address and write to me directly — I&rsquo;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CopyButton value={site.email} label={site.email} />
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-[14px] text-bone-dim underline-offset-4 hover:text-gfp hover:underline"
              >
                Write another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="grid gap-8"
          >
            <fieldset>
              <legend className="type-label text-mute">I&rsquo;m reaching out about</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <label
                    key={t}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gfp",
                      topic === t ? "border-gfp bg-gfp text-ink-950" : "border-line text-bone-dim hover:border-line-strong hover:text-bone",
                    )}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t}
                      checked={topic === t}
                      onChange={() => setTopic(t)}
                      className="sr-only"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-8 md:grid-cols-2">
              <Field id={`${id}-name`} name="name" label="Your name" autoComplete="name" error={errors.name} />
              <Field id={`${id}-email`} name="email" type="email" label="Email" autoComplete="email" error={errors.email} />
            </div>
            <Field id={`${id}-message`} name="message" label="Message" multiline error={errors.message} />

            <div className="flex flex-wrap items-center justify-between gap-6">
              <p className="max-w-xs text-[13px] text-mute">
                Sending opens your email app with this message ready to go. Nothing is stored here.
              </p>
              <button
                type="submit"
                className="group inline-flex h-14 items-center gap-4 rounded-full bg-gfp pl-7 pr-2 text-[15px] font-semibold text-ink-950 transition-colors duration-500 hover:bg-bone"
              >
                Send message
                <span className="grid size-10 place-items-center rounded-full bg-ink-950 text-gfp">
                  <ArrowSwap />
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  multiline = false,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
}) {
  const shared = cn(
    "block w-full border-b bg-transparent pb-3 pt-2 text-lg text-bone outline-none transition-colors duration-300 placeholder:text-transparent focus:border-gfp",
    error ? "border-cherry" : "border-line-strong",
  );
  const errorId = `${id}-error`;
  return (
    <div className="group relative">
      <label htmlFor={id} className="type-label block text-mute transition-colors group-focus-within:text-gfp">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(shared, "mt-2 resize-none")}
          data-lenis-prevent
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(shared, "mt-2")}
        />
      )}
      <AnimatePresence>
        {error ? (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-[13px] text-cherry"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
