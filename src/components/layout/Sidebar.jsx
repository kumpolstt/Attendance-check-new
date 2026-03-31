import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardCheck, History, BarChart3, UserCircle, LogOut, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'User Management', path: '/users' },
  { icon: ClipboardCheck, label: 'Mark Attendance', path: '/attendance' },
  { icon: History, label: 'History', path: '/history' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col z-50 transition-all">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary">
          <BookOpen size={24} />
        </div>
        <span className="font-headline font-extrabold text-2xl tracking-tight text-primary">ScholarFlow</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 group',
                isActive
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/10'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              )
            }
          >
            <item.icon size={20} className="shrink-0" />
            <span className="font-body font-semibold text-sm tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-error hover:bg-error-container/20 transition-all font-body font-semibold text-sm">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
