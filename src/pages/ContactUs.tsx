// src/pages/ContactUs.tsx
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";
import { pageSEO } from "../utils/seo";

const ContactUs: React.FC = () => {
  const [formStatus, setFormStatus] = useState<null | "idle" | "sending" | "success" | "error">(null);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick responses via WhatsApp",
      action: "Chat Now",
      href: "https://wa.me/919876543210",
      color: "green",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Follow our design journey",
      action: "Follow Us",
      href: "https://www.instagram.com/studio.younick",
      color: "pink",
    },
    {
      icon: Youtube,
      title: "YouTube",
      description: "Watch our design process",
      action: "Subscribe",
      href: "https://www.youtube.com/@Younickdesignstudio",
      color: "red",
    },
    {
      icon: Facebook,
      title: "Facebook",
      description: "Connect with our community",
      action: "Like Page",
      href: "https://www.facebook.com/studioyounick",
      color: "blue",
    },
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["Orbit Mall, Malviya Nagar", "Jaipur, Rajasthan 302017", "India"],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["info@younickdesign.com", "projects@younickdesign.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 10:00 AM - 6:00 PM",
        "Sunday: Closed",
      ],
    },
  ];

  // Optional: wrapper if ContactForm exposes onSubmit; here we only show a simple status mock
  const handleFormSubmit = async (data?: any) => {
    // If your ContactForm accepts a prop like onSubmit, pass this in. This handler currently
    // just demonstrates UI feedback. Replace with real API call if you have one.
    try {
      setFormStatus("sending");
      // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
      await new Promise((res) => setTimeout(res, 800));
      setFormStatus("success");
    } catch (e) {
      setFormStatus("error");
    } finally {
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

  return (
    <>
      <SEOHead seo={pageSEO.contact} />

      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>

            {/* 5-6 lines / paragraph under Contact Us */}
            <div className="max-w-3xl mx-auto text-left md:text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-2">
                Whether you’re planning a subtle refresh or a full-scale redesign, we’re here to help.
                Tell us about your space, goals and timeline — we’ll propose a tailored approach that balances aesthetics, budget and buildability.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Use the form to send project details or set up a studio visit at Orbit Mall, Jaipur. For quick questions, reach us via phone or WhatsApp — we aim to respond within one business day.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column: Contact Form + Visit Our Studio (map) */}
            <div className="space-y-6">
              {/* Contact Form card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Send us a Message</h2>

                {/* If your ContactForm accepts an onSubmit prop, pass handleFormSubmit.
                    If not, remove the prop — ContactForm will work as it currently does. */}
                <ContactForm />

                {/* Simple UI status messages so user sees form outcome */}
                <div className="mt-4">
                  {formStatus === "sending" && <div className="text-sm text-gray-500">Sending…</div>}
                  {formStatus === "success" && <div className="text-sm text-green-600">Message sent — we will contact you soon.</div>}
                  {formStatus === "error" && <div className="text-sm text-red-600">Something went wrong. Try again or email us.</div>}
                </div>
              </div>

              {/* Visit Our Studio - moved under form and premium-styled */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Visit Our Studio</h3>
                    <p className="text-sm text-gray-500">Orbit Mall, Malviya Nagar — Jaipur</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={18} />
                    <span>By appointment</span>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-100">
                  {/* Map embed pointing to Orbit Mall, Jaipur */}
                  <div className="aspect-video bg-gray-100">
                    <iframe
                      title="Orbit Mall location - Younick"
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Orbit+Mall+Jaipur&output=embed"
                    />
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  We welcome studio visits by appointment. Please fill the form above or email us at{" "}
                  <a href="mailto:info@younickdesign.com" className="text-indigo-600 underline">
                    info@younickdesign.com
                  </a>{" "}
                  to schedule a meeting.
                </p>
              </div>
            </div>

            {/* Right column: Contact information & social */}
            <div className="space-y-6">
              {/* Office Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  {officeInfo.map((info, index) => {
                    const Icon = info.icon as any;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                          <Icon className="text-indigo-600" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Media Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect With Us</h2>
                <div className="grid grid-cols-2 gap-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon as any;
                    const colorClasses: Record<string, string> = {
                      green: "bg-green-50 text-green-600 hover:bg-green-100",
                      pink: "bg-pink-50 text-pink-600 hover:bg-pink-100",
                      red: "bg-red-50 text-red-600 hover:bg-red-100",
                      blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
                    };

                    return (
                      <a
                        key={index}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-lg transition-colors text-center ${colorClasses[method.color]}`}
                      >
                        <Icon className="mx-auto mb-2" size={24} />
                        <h3 className="font-semibold mb-1">{method.title}</h3>
                        <p className="text-sm opacity-75">{method.description}</p>
                        <span className="text-sm font-medium mt-2 block">{method.action}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Small CTA / alternative contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prefer a quick call?</h3>
                <p className="text-sm text-gray-600 mb-4">We're available on phone and WhatsApp during business hours.</p>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm">
                  <Phone size={16} /> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
