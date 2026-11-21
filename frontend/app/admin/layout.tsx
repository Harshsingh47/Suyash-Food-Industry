'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Mountain, 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  MessageSquare, 
  Boxes, 
  Tag, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Globe, 
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // If on login page, render without admin shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-charcoal/60">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Enquiry CRM', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Products Catalogue', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: Layers },
    { name: 'Inventory & Stock', href: '/admin/inventory', icon: Boxes },
    { name: 'Offers & Promotions', href: '/admin/offers', icon: Tag },
    { name: 'Hero Banners CMS', href: '/admin/banners', icon: ImageIcon },
    { name: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-deep-green text-cream flex flex-col justify-between border-r border-forest">
        <div>
          {/* Brand Logo Header */}
          <div className="p-4 border-b border-forest-light/40">
            <Link href="/admin" className="block bg-white/95 hover:bg-white rounded-2xl p-2.5 shadow-md transition group">
              <Image
                src="/images/logo.png"
                alt="Suyash Food Industries"
                width={180}
                height={62}
                className="h-11 w-auto mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="text-[9px] text-center text-forest-dark uppercase tracking-widest font-semibold mt-1 border-t border-forest/10 pt-1">
                Admin Control Panel
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-forest text-white shadow-sm'
                      : 'text-cream/70 hover:bg-forest/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions Bottom */}
        <div className="p-4 border-t border-forest-light/40 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-forest/40 hover:bg-forest text-cream text-xs font-medium transition"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold" />
              <span>View Live Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <div className="px-3 py-2 rounded-xl bg-forest-dark/70 border border-forest-light/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gold text-forest flex items-center justify-center font-bold text-xs flex-shrink-0">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</div>
                <div className="text-[10px] text-gold-light uppercase tracking-wider">{user?.role || 'SUPER_ADMIN'}</div>
              </div>
            </div>

            <button
              onClick={logout}
              className="text-cream/60 hover:text-terracotta p-1 transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-beige px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-charcoal/60">
            Suyash Food Industries Management Console • Connected to PostgreSQL
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              System Online
            </span>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1">
          {children}
        </main>
      </div>

    </div>
  );
}
