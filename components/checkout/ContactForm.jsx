"use client";
import { Mail, Phone } from "lucide-react";
import React from "react";
import Field from "./Field";
import SectionCard from "./SectionCard";

export default function ContactForm({ contact, setContact, error }) {
  return (
    <SectionCard>
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-secondary-900">Contact</h4>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <Field
          icon={Mail}
          type="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <Field
          icon={Phone}
          type="tel"
          placeholder="Phone (optional)"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
      </div>
      {error ? <p className="text-xs text-red-600 mt-2">{error}</p> : null}
    </SectionCard>
  );
}
