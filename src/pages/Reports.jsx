import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Calendar, FileText, Download, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Reports() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs font-bold uppercase tracking-widest text-primary">Academic Insights</p>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">Monthly Performance Review</h1>
          <p className="text-on-surface-variant font-medium mt-2">A comprehensive ledger of student engagement and attendance trends.</p>
        </div>
        <Button className="gap-2 px-8">
          <Download size={20} />
          <span>Export Report</span>
        </Button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="primary" className="p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label text-xs font-bold uppercase tracking-widest opacity-80">Overall Presence</p>
            <h3 className="text-5xl font-headline font-black mt-2">95%</h3>
            <div className="flex items-center gap-2 mt-4 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm text-xs font-bold">
              <TrendingUp size={14} />
              <span>2% from yesterday</span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </Card>

        <Card variant="lowest" className="p-8 border border-outline-variant/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-error-container/30 flex items-center justify-center text-error mb-4">
              <AlertTriangle size={24} />
            </div>
            <p className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">Critical Attendance</p>
            <h3 className="text-3xl font-headline font-black text-on-surface mt-1">5 Students</h3>
          </div>
          <p className="text-xs font-medium text-error mt-4">Attendance below 80% threshold</p>
        </Card>

        <Card variant="lowest" className="p-8 border border-outline-variant/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary mb-4">
              <Calendar size={24} />
            </div>
            <p className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">Academic Period</p>
            <h3 className="text-2xl font-headline font-bold text-on-surface mt-1">November 2023</h3>
          </div>
          <Button variant="ghost" size="sm" className="mt-4 w-fit px-0">Change Period</Button>
        </Card>
      </section>

      <Card variant="lowest" className="p-0 overflow-hidden border border-outline-variant/10">
        <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold">Student Attendance Roster</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Good (&gt;80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error" />
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Critical (&lt;80%)</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Student Identity</th>
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Days Present</th>
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Percentage</th>
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {[
                { name: 'Alex Johnson', id: 'SF-081', present: '21/22', pct: 95.4, status: 'Excellent' },
                { name: 'Marcus Rodriguez', id: 'SF-142', present: '16/22', pct: 72.7, status: 'Low Attendance', critical: true },
                { name: 'Sarah Chen', id: 'SF-019', present: '19/22', pct: 86.3, status: 'Satisfactory' },
              ].map((row, i) => (
                <tr key={row.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface-variant">
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{row.name}</p>
                        <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">ID: {row.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center font-bold text-on-surface">{row.present}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <span className={cn('text-sm font-black', row.critical ? 'text-error' : 'text-primary')}>
                        {row.pct}%
                      </span>
                      <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', row.critical ? 'bg-error' : 'bg-primary')} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Badge variant={row.critical ? 'error' : 'primary'}>{row.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
