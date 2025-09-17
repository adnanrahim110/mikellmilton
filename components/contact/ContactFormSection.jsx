"use client";

import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const ContactFormSection = ({
  id = "contact-form",
  title = "Send a message",
  eyebrow = "Contact",
  action = "/api/contact",
  method = "POST",
}) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const disabled = sending || !state.name || !state.email || !state.message;

  const onChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(action, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      setDone(true);
      setState({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setDone(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id={id} className="relative bg-black py-[110px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-28 h-[460px] w-[460px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 opacity-15 mix-blend-multiply bg-[url('/imgs/texture2.png')] bg-center bg-no-repeat bg-[length:70%_80%]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>

      <div className="container">
        <div className="mb-8 space-y-3">
          <Subtitle tone="light">{eyebrow}</Subtitle>
          <Title tone="light" className="text-[clamp(28px,5vw,44px)]">
            {title}
          </Title>
        </div>

        <div className="bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[28px]">
          <div className="relative overflow-hidden rounded-[26px] bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-2xl">
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 p-7 md:p-10 lg:grid-cols-2"
            >
              <div className="grid gap-5">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-xl bg-white/10 text-white/80">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    name="name"
                    value={state.name}
                    onChange={onChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-2xl bg-white/10 text-white placeholder:text-white/60 border border-white/15 ring-1 ring-white/10 pl-14 pr-4 py-3.5 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-xl bg-white/10 text-white/80">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={state.email}
                    onChange={onChange}
                    required
                    placeholder="Email"
                    className="w-full rounded-2xl bg-white/10 text-white placeholder:text-white/60 border border-white/15 ring-1 ring-white/10 pl-14 pr-4 py-3.5 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-xl bg-white/10 text-white/80">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    name="phone"
                    value={state.phone}
                    onChange={onChange}
                    placeholder="Phone (optional)"
                    className="w-full rounded-2xl bg-white/10 text-white placeholder:text-white/60 border border-white/15 ring-1 ring-white/10 pl-14 pr-4 py-3.5 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-xl bg-white/10 text-white/80">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <input
                    name="subject"
                    value={state.subject}
                    onChange={onChange}
                    placeholder="Subject"
                    className="w-full rounded-2xl bg-white/10 text-white placeholder:text-white/60 border border-white/15 ring-1 ring-white/10 pl-14 pr-4 py-3.5 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="grid gap-5">
                <textarea
                  name="message"
                  value={state.message}
                  onChange={onChange}
                  required
                  placeholder="Write your message..."
                  rows={9}
                  className="w-full rounded-2xl bg-white/10 text-white placeholder:text-white/60 border border-white/15 ring-1 ring-white/10 px-4 py-4 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30"
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-white/70">
                    By sending, you agree to be contacted about your request.
                  </div>
                  <Button
                    type="submit"
                    tone="light"
                    disabled={disabled}
                    className="rounded-2xl inline-flex items-center"
                  >
                    {sending ? "Sending..." : done ? "Sent" : "Send"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.form>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[30px] opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(255,190,0,.42), rgba(255,190,0,.12) 30%, transparent 60%, rgba(255,190,0,.28) 85%, rgba(255,190,0,.42))",
                filter: "blur(12px)",
              }}
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
