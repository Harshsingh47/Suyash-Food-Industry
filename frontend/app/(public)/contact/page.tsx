'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in required fields (Name, Email, Message).');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetchApi('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          subject: formData.subject.trim() || 'General Inquiry',
          message: formData.message.trim(),
        }),
      });

      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setErrorMsg(err.message || 'Failed to send message. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">
            We’d Love to Hear From You
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest font-bold">
            Let’s Connect
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70">
            Have a question or looking for premium Himalayan food products? Contact Suyash Food Industries for product inquiries, wholesale requirements, or customer support.
          </p>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-beige/80 p-6 sm:p-8 shadow-card space-y-6">
              <h2 className="font-serif font-bold text-xl text-forest">
                Headquarters & Information
              </h2>

              <div className="space-y-5 text-xs text-charcoal/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-forest block mb-0.5">Physical Facility</span>
                    <span>Near Regional Hospital, Solan, Himachal Pradesh, INDIA</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-forest block mb-0.5">Telephone / Mobile</span>
                    <a href="tel:+919805565679" className="hover:text-forest transition">
                      +91 98055 65679
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-forest block mb-0.5">Email Support</span>
                    <a href="mailto:suyashfoodindustries@gmail.com" className="hover:text-forest transition">
                      suyashfoodindustries@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cream flex items-center justify-center text-forest flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-forest block mb-0.5">Working Hours</span>
                    <span>Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="pt-4 border-t border-beige">
                <a
                  href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Sourcing Guarantee Box */}
            <div className="bg-forest text-cream p-6 rounded-2xl border border-forest-light space-y-2">
              <div className="flex items-center gap-2 text-gold font-serif font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Himachal Manufacturer</span>
              </div>
              <p className="text-xs text-cream/80 leading-relaxed">
                All products are processed, packaged, and dispatched directly from our Solan facility with complete traceability.
              </p>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md rounded-3xl border border-beige/80 p-6 sm:p-10 shadow-card">
            <h2 className="font-serif font-bold text-xl text-forest mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-charcoal/60 mb-6">
              Fill in the form below and we will get back to you via phone or email shortly.
            </p>

            {submitted ? (
              <div className="bg-cream/60 border border-beige rounded-2xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-forest mx-auto" />
                <h3 className="font-serif font-bold text-lg text-forest">Thank You!</h3>
                <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
                  Your message has been submitted. Our team will review your enquiry and respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-forest underline font-semibold pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1">
                      First Name <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1">
                      Email Address <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-charcoal block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98055 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Product inquiry, wholesale distribution, etc."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Your Message / Comment <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify product details or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs p-3.5 rounded-xl border border-beige focus:outline-none focus:border-forest transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
