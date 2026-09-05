'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CommandPalette } from '@/components/admin/CommandPalette';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { isAuthenticated, login, setUser, fetchFromSupabase } = useAdminStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Global Ctrl + K / Cmd + K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // On mount: check localStorage for existing token & validate with backend
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('devpulse_token');
      const storedUser = localStorage.getItem('devpulse_user');

      if (token && storedUser) {
        try {
          // Validate token with backend API directly
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
          const res = await fetch(`${apiUrl}/api/v1/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
              // Token valid — restore session from database user
              login(data.user, token);
              // Fetch all admin panel data from database
              await fetchFromSupabase();
              setIsHydrated(true);
              return;
            }
          }
        } catch {
          // Token validation failed — clear stale data
        }

        // If token validation failed, clear localStorage
        localStorage.removeItem('devpulse_token');
        localStorage.removeItem('devpulse_user');
      }

      setIsHydrated(true);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auth guard: redirect to login if not authenticated
  useEffect(() => {
    if (isHydrated && !isAuthenticated && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [isHydrated, isAuthenticated, pathname, router]);

  // Skip layout shell for login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#060911] text-slate-100 font-sans">{children}</div>;
  }

  // Show loading spinner while hydrating auth state or redirecting
  if (!isHydrated || (!isAuthenticated && pathname !== '/admin/login')) {
    return (
      <div className="min-h-screen bg-[#060911] text-slate-100 font-sans flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-semibold">
            {!isHydrated ? "Memvalidasi sesi login..." : "Mengalihkan ke halaman login..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans flex">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <AdminHeader
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}
