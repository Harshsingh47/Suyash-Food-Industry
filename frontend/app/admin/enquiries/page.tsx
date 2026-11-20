'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Calendar,
  User, 
  MapPin, 
  FileText,
  Plus,
  Send,
  X
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Note form state
  const [newNote, setNewNote] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const statuses = [
    'ALL',
    'NEW',
    'CONTACTED',
    'FOLLOW_UP_REQUIRED',
    'QUOTATION_SHARED',
    'CONVERTED',
    'CLOSED',
  ];

  const loadEnquiries = async () => {
    setIsLoading(true);
    try {
      let url = '/enquiries?limit=50';
      if (statusFilter !== 'ALL') url += `&status=${statusFilter}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const res = await fetchApi(url);
      setEnquiries(res?.data || []);
      if (selectedEnquiry) {
        const refreshed = await fetchApi(`/enquiries/${selectedEnquiry.id}`);
        setSelectedEnquiry(refreshed);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, searchQuery]);

  const handleSelectEnquiry = async (enq: any) => {
    try {
      const full = await fetchApi(`/enquiries/${enq.id}`);
      setSelectedEnquiry(full);
    } catch (err) {
      setSelectedEnquiry(enq);
    }
  };

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      await fetchApi(`/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      loadEnquiries();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update enquiry status.');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;
    setIsAddingNote(true);

    try {
      await fetchApi(`/enquiries/${selectedEnquiry.id}/notes`, {
        method: 'POST',
        body: JSON.stringify({
          note: newNote.trim(),
          followUpDate: followUpDate || undefined,
        }),
      });

      setNewNote('');
      setFollowUpDate('');
      const refreshed = await fetchApi(`/enquiries/${selectedEnquiry.id}`);
      setSelectedEnquiry(refreshed);
      loadEnquiries();
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest">
            Customer Enquiry CRM
          </h1>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Manage incoming product requests, quotation pipeline, and direct customer WhatsApp conversations.
          </p>
        </div>
      </div>

      {/* Search & Status Pills Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-beige shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Ref ID, customer name, mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-3.5 py-2 rounded-xl border border-beige bg-cream/20 focus:outline-none focus:border-forest"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-[11px] px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-cream text-charcoal hover:bg-beige/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: Enquiries List & Detail Drawer/Modal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Enquiries Table/List */}
        <div className={`bg-white rounded-2xl border border-beige shadow-card overflow-hidden ${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="p-4 border-b border-beige flex items-center justify-between">
            <span className="text-xs font-bold text-forest">
              {enquiries.length} Enquiries Found
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-xs text-charcoal/50">
              Loading enquiries from PostgreSQL...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-12 text-center text-xs text-charcoal/50">
              No enquiries matching this criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-beige bg-cream/40 text-charcoal/60 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 text-right">Quick WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige/60">
                  {enquiries.map((enq) => {
                    const isSelected = selectedEnquiry?.id === enq.id;
                    const cleanPhone = enq.customerPhone?.replace(/[^0-9]/g, '');
                    const waReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hello ${enq.customerName}, regarding your enquiry ${enq.referenceNumber} with Suyash Food Industries...`
                    )}`;

                    return (
                      <tr
                        key={enq.id}
                        onClick={() => handleSelectEnquiry(enq)}
                        className={`cursor-pointer transition ${
                          isSelected ? 'bg-cream/70 font-medium' : 'hover:bg-cream/30'
                        }`}
                      >
                        <td className="p-3.5 font-mono font-bold text-forest">
                          {enq.referenceNumber}
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-charcoal block">{enq.customerName}</span>
                          <span className="text-[10px] text-charcoal/50">{enq.customerPhone}</span>
                        </td>
                        <td className="p-3.5 text-charcoal/80">
                          {enq.items?.length || enq._count?.items || 1} products
                        </td>
                        <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            className="text-[10px] font-bold rounded-lg border border-beige px-2 py-1 bg-white cursor-pointer"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="FOLLOW_UP_REQUIRED">FOLLOW UP</option>
                            <option value="QUOTATION_SHARED">QUOTED</option>
                            <option value="CONVERTED">CONVERTED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-[11px] text-charcoal/60">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={waReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-whatsapp hover:bg-green-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs transition"
                            title="Chat with customer on WhatsApp"
                          >
                            <MessageCircle className="w-3 h-3 fill-white" />
                            <span>Reply</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Enquiry Detail Panel */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-beige shadow-card p-6 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-beige">
              <div>
                <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider">
                  Enquiry Details
                </span>
                <h3 className="font-mono font-bold text-lg text-forest">
                  {selectedEnquiry.referenceNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-full text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 bg-cream/40 rounded-xl border border-beige space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-forest text-sm">{selectedEnquiry.customerName}</span>
                <span className="text-[10px] font-semibold bg-white border border-beige px-2 py-0.5 rounded">
                  Status: {selectedEnquiry.status}
                </span>
              </div>
              <div className="space-y-1 text-charcoal/70">
                <p>Phone: <a href={`tel:${selectedEnquiry.customerPhone}`} className="text-forest underline">{selectedEnquiry.customerPhone}</a></p>
                {selectedEnquiry.customerEmail && <p>Email: {selectedEnquiry.customerEmail}</p>}
                {selectedEnquiry.customerCity && <p>City: {selectedEnquiry.customerCity}</p>}
                {selectedEnquiry.customerMessage && (
                  <div className="mt-2 pt-2 border-t border-beige/60">
                    <span className="font-semibold text-charcoal block">Customer Note:</span>
                    <p className="italic">{selectedEnquiry.customerMessage}</p>
                  </div>
                )}
              </div>

              {/* 1-Click WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${selectedEnquiry.customerPhone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.customerName}, regarding your Suyash Food Industries enquiry (${selectedEnquiry.referenceNumber}):`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-xs transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-whatsapp" />
                  <span>Open WhatsApp Conversation with Customer</span>
                </a>
              </div>
            </div>

            {/* Products Requested List */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-forest">
                Products Requested ({selectedEnquiry.items?.length || 0})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {selectedEnquiry.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg border border-beige bg-white flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-forest">{item.productName}</div>
                      <div className="text-[10px] text-charcoal/60">
                        {item.variationName || 'Standard Pack'} • Qty: <span className="font-bold">{item.quantity}</span>
                      </div>
                    </div>
                    {item.unitPrice && (
                      <div className="text-right font-bold text-forest">
                        ₹{item.unitPrice * item.quantity}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Follow-Up Notes */}
            <div className="space-y-3 pt-4 border-t border-beige">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-forest">
                Internal Follow-Up Notes & History
              </h4>

              <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar">
                {selectedEnquiry.followUpNotes?.length === 0 ? (
                  <p className="text-[11px] text-charcoal/50 italic">No notes recorded yet.</p>
                ) : (
                  selectedEnquiry.followUpNotes?.map((n: any) => (
                    <div key={n.id} className="p-2 bg-cream/30 rounded-lg text-xs space-y-0.5">
                      <p className="text-charcoal/80">{n.note}</p>
                      <span className="text-[10px] text-charcoal/50 block">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2 pt-2">
                <textarea
                  rows={2}
                  required
                  placeholder="Record call summary, quotation agreed, or next follow-up details..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-beige focus:outline-none focus:border-forest"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="text-xs p-2 rounded-xl border border-beige bg-white"
                  />
                  <button
                    type="submit"
                    disabled={isAddingNote}
                    className="flex-1 bg-forest hover:bg-forest-light text-white font-semibold text-xs py-2 px-3 rounded-xl transition"
                  >
                    {isAddingNote ? 'Saving...' : 'Add Note'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
