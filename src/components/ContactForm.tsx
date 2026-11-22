"use client";

import { ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { founders, services } from "@/data/data";

type PreparedLink = {
  id: (typeof founders)[number]["id"];
  name: (typeof founders)[number]["name"];
  href: string;
};

export function ContactForm() {
  const [preparedLinks, setPreparedLinks] = useState<PreparedLink[] | null>(
    null,
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const business = value("business");
    const phone = value("phone");
    const email = value("email");
    const selectedServices = formData
      .getAll("services")
      .map((service) => String(service).trim())
      .filter(Boolean);
    const description = value("description");
    const message = [
      "New project inquiry via the Calystr website",
      `Name: ${value("name")}`,
      ...(business ? [`Business: ${business}`] : []),
      ...(email ? [`Email: ${email}`] : []),
      `Phone: ${phone}`,
      ...(selectedServices.length
        ? [`Services: ${selectedServices.join(", ")}`]
        : []),
      ...(description ? ["", "Project description:", description] : []),
    ].join("\n");

    setPreparedLinks(
      founders.map((founder) => ({
        id: founder.id,
        name: founder.name,
        href: `https://wa.me/${founder.whatsapp}?${new URLSearchParams({ text: message })}`,
      })),
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => setPreparedLinks(null)}
    >
      <div className="field-row">
        <label>
          Name
          <input name="name" required minLength={2} autoComplete="name" />
        </label>
        <label>
          Business name
          <input name="business" autoComplete="organization" />
        </label>
      </div>
      <div className="field-row">
        <label>
          Email
          <input type="email" name="email" autoComplete="email" />
        </label>
        <label>
          Mobile number
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            pattern="[+0-9 ()-]{7,20}"
          />
        </label>
      </div>
      <fieldset className="service-selection">
        <legend>Services</legend>
        <p>Select all that apply. This is optional.</p>
        <div className="service-options">
          {services.map((s) => (
            <label key={s.slug}>
              <input type="checkbox" name="services" value={s.title} />
              <span>{s.title}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        Project description
        <textarea
          name="description"
          maxLength={5000}
          rows={3}
          placeholder="What are you building, who is it for, and what needs to change?"
        />
      </label>
      <button
        className="submit-button"
        type="submit"
      >
        Prepare WhatsApp messages
        <ArrowUpRight size={18} />
      </button>
      {preparedLinks && (
        <div className="whatsapp-result">
          <p className="form-status" role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            Your inquiry is ready. Open both chats below and press Send in each.
            WhatsApp does not let websites send messages automatically.
          </p>
          <div className="whatsapp-actions">
            {preparedLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} aria-hidden="true" />
                <span>Send to {link.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
