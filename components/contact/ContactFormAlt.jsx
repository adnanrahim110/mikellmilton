"use client";

import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import {
  BookOpenText,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

const chipClasses =
  "inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 text-sm py-2 font-semibold text-black/90 hover:bg-white/15 hover:border-white/20 transition";

const topics = [
  { key: "general", label: "General", Icon: Sparkles },
  { key: "speaking", label: "Speaking", Icon: BookOpenText },
  // { key: "partnerships", label: "Partnerships", Icon: Phone },
];

const ContactFormAlt = ({
  id = "contact-form",
  eyebrow = "Contact",
  title = "Your Words Begin The BREAKTHROUGH",
  lead = "One voice matters. One message can open the way. Share what’s on your heart, and together we’ll take the next step toward purpose.",
  email = "hello@yourdomain.com",
  phone = "+1 000 000 0000",
  action = "/api/contact",
  method = "POST",
}) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const requiredCount = 3;
  const complete = useMemo(() => {
    let c = 0;
    if (state.name.trim()) c += 1;
    if (state.email.trim()) c += 1;
    if (state.message.trim()) c += 1;
    return Math.round((c / requiredCount) * 100);
  }, [state.name, state.email, state.message]);

  const disabled = sending || complete < 100;

  const onChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onSelectTopic = (t) => setState((s) => ({ ...s, topic: t }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    setSending(true);
    try {
      await fetch(action, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      setDone(true);
      setState({
        name: "",
        email: "",
        phone: "",
        topic: "general",
        message: "",
      });
    } catch {
      setDone(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id={id} className="relative py-[110px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-28 h-[460px] w-[460px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-amber-500/15 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>

      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6 mt-4">
            <Subtitle tone="dark">{eyebrow}</Subtitle>
            <Title className="text-[clamp(30px,5.6vw,48px)]">{title}</Title>
            <p className="text-lg text-secondary">{lead}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link href={`mailto:${email}`} className={chipClasses}>
                <span className="inline-grid place-items-center size-auto p-2 rounded-lg bg-primary/20 text-primary">
                  <Mail className="size-5" />
                </span>
                {email}
              </Link>
              <Link
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className={chipClasses}
              >
                <span className="inline-grid place-items-center size-auto p-2 rounded-lg bg-primary/20 text-primary">
                  <Phone className="size-5" />
                </span>
                {phone}
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 ring-1 ring-black/5 shadow-inner p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-secondary-900">
                  Form readiness
                </div>
                <div className="text-xs text-secondary-600">{complete}%</div>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-black/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,190,0,0.15) 0%, rgba(255,190,0,0.9) 60%, rgba(255,190,0,1) 100%)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${complete}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[28px] shadow-2xl">
              <div className="relative overflow-hidden rounded-[26px] bg-white/75 backdrop-blur-md ring-1 ring-black/5">
                {!done ? (
                  <form onSubmit={onSubmit} className="grid gap-6 p-7 md:p-9">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="block text-xs font-semibold text-secondary-700 mb-1.5">
                          Name
                        </span>
                        <input
                          name="name"
                          value={state.name}
                          onChange={onChange}
                          placeholder="Your name"
                          className="w-full rounded-xl border border-white/50 bg-white/85 px-3.5 py-3 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner shadow-black/15 focus:outline-none focus:ring-4 focus:ring-primary/25"
                          required
                        />
                      </label>
                      <label className="block">
                        <span className="block text-xs font-semibold text-secondary-700 mb-1.5">
                          Email
                        </span>
                        <input
                          name="email"
                          type="email"
                          value={state.email}
                          onChange={onChange}
                          placeholder="you@email.com"
                          className="w-full rounded-xl border border-white/50 bg-white/85 px-3.5 py-3 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner shadow-black/15 focus:outline-none focus:ring-4 focus:ring-primary/25"
                          required
                        />
                      </label>
                      <label className="block">
                        <span className="block text-xs font-semibold text-secondary-700 mb-1.5">
                          Phone (optional)
                        </span>
                        <input
                          name="phone"
                          value={state.phone}
                          onChange={onChange}
                          placeholder="+1 000 000 0000"
                          className="w-full rounded-xl border border-white bg-white/85 px-3.5 py-3 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner shadow-black/10 focus:outline-none focus:ring-4 focus:ring-primary/25"
                        />
                      </label>
                      <div className="grid gap-1.5">
                        <span className="block text-xs font-semibold text-secondary-700">
                          Topic
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {topics.map(({ key, label, Icon }) => {
                            const active = state.topic === key;
                            return (
                              <button
                                type="button"
                                key={key}
                                onClick={() => onSelectTopic(key)}
                                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-xs font-semibold transition ${
                                  active
                                    ? "bg-primary text-secondary-950 shadow-[inset_0_0_5px] shadow-black/50"
                                    : "bg-white/80 text-secondary-900 border border-white/50 shadow-inner shadow-black/15 hover:bg-white"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <label className="block">
                      <span className="block text-xs font-semibold text-secondary-700 mb-1.5">
                        Message
                      </span>
                      <textarea
                        name="message"
                        value={state.message}
                        onChange={onChange}
                        placeholder="Write your message…"
                        rows={7}
                        className="w-full rounded-xl border border-white/50 bg-white/85 px-3.5 py-3 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner shadow-black/15 focus:outline-none focus:ring-4 focus:ring-primary/25 resize-none"
                        required
                      />
                    </label>

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-secondary-600">
                        You’ll get a confirmation by email.
                      </p>
                      <Button
                        type="submit"
                        tone="dark"
                        disabled={disabled}
                        className="rounded-xl inline-flex items-center"
                      >
                        {sending ? "Sending..." : "Send"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="p-9 text-center">
                    <div className="mx-auto mb-4 size-14 rounded-full bg-primary/15 grid place-items-center text-primary">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <Title className="text-[clamp(22px,3.8vw,30px)]">
                      Message sent
                    </Title>
                    <p className="mt-2 text-secondary">
                      I’ll get back to you soon. If it’s urgent, call the number
                      above.
                    </p>
                    <div className="mt-6">
                      <Button
                        tone="dark"
                        className="rounded-xl"
                        onClick={() => setDone(false)}
                      >
                        Send another
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 justify-center text-center text-xs text-secondary-600">
              <span className="inline-grid place-items-center size-6 rounded-lg bg-black/5 text-secondary-900">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              Clear inputs unlock the button. Progress bar shows how close you
              are.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormAlt;
