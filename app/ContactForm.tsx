"use client";

import { useState } from "react";
import { CONTACT_EMAIL, topicOptions } from "./content";

const DEFAULT_MSG = "Your email app will open with this message ready to send.";
const INVALID_MSG = "Please add your name, a valid work email and a short message.";

// `font: inherit` from the source is spelled out rather than used as a shorthand,
// so no utility-ordering question decides the final font-size.
const control =
  "w-full font-body font-normal text-[16px] leading-[1.6] text-ink bg-paper " +
  "border border-rule rounded-[4px] px-3 py-[11px]";

export default function ContactForm() {
  const [msg, setMsg] = useState(DEFAULT_MSG);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const email = f.elements.namedItem("email") as HTMLInputElement;

    const name = (f.elements.namedItem("name") as HTMLInputElement).value.trim();
    const org = (f.elements.namedItem("org") as HTMLInputElement).value.trim();
    const topic = (f.elements.namedItem("topic") as HTMLSelectElement).value;
    const message = (f.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    const em = email.value.trim();

    if (!name || !em || !message || !email.checkValidity()) {
      setMsg(INVALID_MSG);
      return;
    }

    const subject = `Inquiry: ${topic}${org ? ` (${org})` : ""}`;
    const body = `${message}\n\n${name}\n${em}${org ? `\n${org}` : ""}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setMsg(`If your email app did not open, write to ${CONTACT_EMAIL} directly.`);
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 bg-surface border border-rule rounded-md p-[clamp(20px,3vw,32px)]"
    >
      <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
        <div className="grid gap-1.5 min-w-0">
          <label htmlFor="f-name" className="text-[14px] font-semibold">
            Name
          </label>
          <input id="f-name" name="name" autoComplete="name" required className={control} />
        </div>
        <div className="grid gap-1.5 min-w-0">
          <label htmlFor="f-org" className="text-[14px] font-semibold">
            Organization
          </label>
          <input
            id="f-org"
            name="org"
            autoComplete="organization"
            className={control}
          />
        </div>
      </div>

      <div className="grid gap-1.5 min-w-0">
        <label htmlFor="f-email" className="text-[14px] font-semibold">
          Work email
        </label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={control}
        />
      </div>

      <div className="grid gap-1.5 min-w-0">
        <label htmlFor="f-topic" className="text-[14px] font-semibold">
          Area of interest
        </label>
        <select id="f-topic" name="topic" className={control}>
          {topicOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-1.5 min-w-0">
        <label htmlFor="f-msg" className="text-[14px] font-semibold">
          How can we help?
        </label>
        <textarea
          id="f-msg"
          name="message"
          required
          className={`${control} min-h-[120px] resize-y`}
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 font-body font-semibold text-[15px] leading-none px-5 py-[13px] rounded-[4px] border border-accent bg-accent text-paper cursor-pointer hover:brightness-110"
        >
          Send inquiry
        </button>
      </div>

      <p className="text-[14.5px] text-muted" aria-live="polite">
        {msg}
      </p>
    </form>
  );
}
