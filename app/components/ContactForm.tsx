"use client";

import { useRef, useState } from "react";
import { CONTACT_EMAIL, topicOptions } from "../content";
import { Button } from "./Button";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full min-h-[48px] font-body text-[16px] leading-[1.5] text-ink bg-surface " +
  "border border-rule px-3.5 py-3 outline-none transition-colors " +
  "focus:border-accent hover:border-ink";

const fieldBad = "border-accent bg-accent-wash";

/**
 * The site is a static export with no backend, so the real available mechanism
 * is the visitor's own mail client. A mailto: handoff cannot report delivery —
 * so this never claims the message was sent. It says what actually happened:
 * the mail client was asked to open, and here is the address if it did not.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [handedOff, setHandedOff] = useState(false);
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name) e.name = "Enter your name so we know who is writing.";
    if (!email) e.email = "Enter a work email so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      e.email = "That email address does not look complete.";
    if (!message) e.message = "Tell us briefly what you need.";
    else if (message.length < 10) e.message = "Add a little more detail — at least a sentence.";

    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const e = validate(fd);
    setErrors(e);

    const firstBad = Object.keys(e)[0];
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setBusy(true);
    const name = String(fd.get("name")).trim();
    const org = String(fd.get("org") ?? "").trim();
    const email = String(fd.get("email")).trim();
    const topic = String(fd.get("topic"));
    const message = String(fd.get("message")).trim();

    const subject = `Inquiry: ${topic}${org ? ` (${org})` : ""}`;
    const body = `${message}\n\n${name}\n${email}${org ? `\n${org}` : ""}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setBusy(false);
    setHandedOff(true);
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} role="alert" className="font-mono text-[12px] text-accent-ink">
        {errors[k]}
      </p>
    ) : null;

  const aria = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    className: `${field} ${errors[k] ? fieldBad : ""}`,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="c-name" className="font-mono text-[11px] tracking-[.14em] uppercase">
            Name <span className="text-accent-ink">*</span>
          </label>
          <input id="c-name" name="name" autoComplete="name" {...aria("name")} />
          {err("name")}
        </div>
        <div className="grid gap-2">
          <label htmlFor="c-org" className="font-mono text-[11px] tracking-[.14em] uppercase">
            Organization
          </label>
          <input id="c-org" name="org" autoComplete="organization" className={field} />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="c-email" className="font-mono text-[11px] tracking-[.14em] uppercase">
          Work email <span className="text-accent-ink">*</span>
        </label>
        <input id="c-email" name="email" type="email" autoComplete="email" {...aria("email")} />
        {err("email")}
      </div>

      <div className="grid gap-2">
        <label htmlFor="c-topic" className="font-mono text-[11px] tracking-[.14em] uppercase">
          Area of interest
        </label>
        <select id="c-topic" name="topic" className={field}>
          {topicOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="c-msg" className="font-mono text-[11px] tracking-[.14em] uppercase">
          How can we help? <span className="text-accent-ink">*</span>
        </label>
        <textarea id="c-msg" name="message" rows={6} {...aria("message")} />
        {err("message")}
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-1">
        <Button type="submit" variant="primary" loading={busy}>
          {busy ? "Opening your mail app…" : "Compose this enquiry"}
        </Button>
        <p className="font-mono text-[11px] tracking-[.1em] uppercase text-muted">
          Reply within two business days
        </p>
      </div>

      <div aria-live="polite" className="min-h-[1.5rem]">
        {handedOff && (
          <p className="text-[15px] leading-[1.6] border-t border-rule pt-5">
            <span className="font-semibold">Your mail app should now be open</span> with this
            enquiry drafted. Nothing has been sent yet — review it and press send. If no app
            opened, write to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="link-ul text-accent-ink font-semibold">
              {CONTACT_EMAIL}
            </a>{" "}
            directly.
          </p>
        )}
      </div>
    </form>
  );
}
