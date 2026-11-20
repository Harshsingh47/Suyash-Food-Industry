'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, MessageSquare, Phone, Mail, MapPin, Bell, Clock, Building } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    business_name: 'Suyash Food Industries',
    whatsapp_number: '+919805565679',
    contact_phone: '+91 98055 65679',
    contact_email: 'suyashfoodindustries@gmail.com',
    business_address: 'Near Regional Hospital, Solan, Himachal Pradesh, INDIA',
    announcement_text: '🌿 Authentic Himalayan Produce from Solan, HP • Direct Farm Sourcing • Enquire on WhatsApp for Retail & Wholesale',
    working_hours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
    google_map_embed: 'https://maps.google.com/?q=Solan+Himachal+Pradesh',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi('/settings/public');
      if (data) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await fetchApi('/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Website & Business Settings</h1>
          <p className="text-sm text-stone-500">
            Configure central WhatsApp business routing, contact coordinates, announcement ticker, and company information.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-fade-in shadow-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Website settings have been successfully updated across all public pages and WhatsApp enquiry channels.</span>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl p-8 border border-stone-200 text-center text-stone-500">
          Loading website settings...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: WhatsApp Click-to-Chat & Enquiry Channel */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-charcoal">WhatsApp Click-to-Chat Gateway</h2>
                <p className="text-xs text-stone-500">
                  Primary WhatsApp number receiving catalogue inquiries, quick product questions, and multi-product inquiry orders.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  WhatsApp Number (with Country Code) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+919805565679"
                  value={settings.whatsapp_number || ''}
                  onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Format: +91 followed by 10 digits without spaces or dashes (e.g., +919805565679).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Display Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="+91 98055 65679"
                    value={settings.contact_phone || ''}
                    onChange={(e) => handleChange('contact_phone', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">Human-friendly formatted phone shown on Header and Footer.</p>
              </div>
            </div>
          </div>

          {/* Card 2: Company Coordinates & Solan Location */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-charcoal">Business Details & Himalayan Terroir</h2>
                <p className="text-xs text-stone-500">Official business identity, contact email, and Solan facility address.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Business / Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={settings.business_name || ''}
                  onChange={(e) => handleChange('business_name', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Customer Care Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="suyashfoodindustries@gmail.com"
                    value={settings.contact_email || ''}
                    onChange={(e) => handleChange('contact_email', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Physical / Facility Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={settings.business_address || ''}
                    onChange={(e) => handleChange('business_address', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Customer Support Operating Hours
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={settings.working_hours || ''}
                    onChange={(e) => handleChange('working_hours', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Google Map Link / Embed URL
                </label>
                <input
                  type="text"
                  value={settings.google_map_embed || ''}
                  onChange={(e) => handleChange('google_map_embed', e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Announcement Bar Ticker */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-accent-gold flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-charcoal">Top Announcement Bar</h2>
                <p className="text-xs text-stone-500">Live banner text displayed at the very top of all customer pages.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Announcement Message
              </label>
              <textarea
                rows={2}
                value={settings.announcement_text || ''}
                onChange={(e) => handleChange('announcement_text', e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                Keep it concise with emojis or bullet separators (e.g. 🌿 Authentic Himalayan Produce • Enquire on WhatsApp).
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-green hover:bg-primary-dark text-white rounded-lg text-sm font-semibold shadow-sm transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving Changes...' : 'Save Settings'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
