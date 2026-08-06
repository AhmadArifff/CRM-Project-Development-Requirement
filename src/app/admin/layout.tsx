'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Skip layout shell for login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-[#060911] text-slate-100 font-sans">{children}</div>;
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
