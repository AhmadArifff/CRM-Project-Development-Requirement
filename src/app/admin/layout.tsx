'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, login, setUser, fetchFromSupabase } = useAdminStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // On mount: check localStorage for existing token & validate with backend
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('devpulse_token');
      const storedUser = localStorage.getItem('devpulse_user');

      if (token && storedUser) {
        try {
          // Validate token with backend API
          const res = await fetch('/api/v1/auth/me', {
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

  // Skip layout shell for login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#060911] text-slate-100 font-sans">{children}</div>;
  }

  // Show loading spinner while hydrating auth state
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#060911] text-slate-100 font-sans flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-semibold">Memvalidasi sesi login...</p>
        </div>
      </div>
    );
  }

  // Auth guard: redirect to login if not authenticated
  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.replace('/admin/login');
    }
    return (
      <div className="min-h-screen bg-[#060911] text-slate-100 font-sans flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-semibold">Mengalihkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans flex">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <AdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
