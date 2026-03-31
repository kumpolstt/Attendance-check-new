import * as React from 'react';
import { Sidebar } from './Sidebar';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 ml-72 p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
