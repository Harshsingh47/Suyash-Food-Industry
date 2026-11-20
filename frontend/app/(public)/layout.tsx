import React from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MessageCircle } from 'lucide-react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/919805565679?text=Hello%20Suyash%20Food%20Industries%2C%20I%20would%20like%20to%20enquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-whatsapp hover:bg-green-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Enquire directly on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-whatsapp" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
