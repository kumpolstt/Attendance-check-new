import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Users, ClipboardCheck, History, BarChart3, TrendingUp, CheckCircle, UserX, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_CLASSES } from '../data/mock';
import { cn } from '../lib/utils';

const STATS = [
  { label: 'Total Enrolled', value: '1,248', icon: Users, color: 'text-primary', bg: 'bg-primary/10', trend: '+12 from last month' },
  { label: 'Present Today', value: '94%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', trend: '1,173 Students' },
  { label: 'Absent', value: '42', icon: UserX, color: 'text-error', bg: 'bg-error-container/30', trend: 'Requires attention' },
  { label: 'Late', value: '33', icon: Clock, color: 'text-tertiary', bg: 'bg-tertiary-fixed/30', trend: 'Morning session' },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">ScholarFlow Dashboard</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="primary">Morning Session Overview</Badge>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          <span className="text-sm font-body text-on-surface-variant font-medium">October 24, 2023</span>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="lowest" className="h-full flex flex-col justify-between border border-outline-variant/10 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start">
                <div className={cn('p-3 rounded-2xl', stat.bg, stat.color)}>
                  <stat.icon size={24} />
                </div>
                {stat.trend.includes('+') && (
                  <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                    <TrendingUp size={14} />
                    <span>{stat.trend.split(' ')[0]}</span>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">{stat.label}</p>
                <h3 className="text-3xl font-headline font-black text-on-surface mt-1">{stat.value}</h3>
                {!stat.trend.includes('+') && (
                  <p className="text-xs font-medium text-on-surface-variant mt-2">{stat.trend}</p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {MOCK_CLASSES.map((session) => (
              <Card key={session.id} variant="lowest" className="p-5 flex items-center justify-between border border-outline-variant/5 hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <ClipboardCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface">{session.name} - Section {session.section}</h4>
                    <p className="text-xs text-on-surface-variant font-medium">Submitted by {session.teacherName} • {session.time}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={session.status === 'completed' ? 'primary' : 'tertiary'}>
                    {session.status}
                  </Badge>
                  {session.attendanceRate && (
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                      {session.attendanceRate}% Present
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Quick Actions</h2>
          <div className="space-y-4">
            <Button className="w-full justify-start gap-4 h-auto p-5 rounded-3xl" variant="primary">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <ClipboardCheck size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold">Take Attendance</p>
                <p className="text-[10px] font-medium opacity-70 uppercase tracking-widest">Mark students for current block</p>
              </div>
            </Button>
            <Button className="w-full justify-start gap-4 h-auto p-5 rounded-3xl" variant="secondary">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <BarChart3 size={20} />
              </div>
              <div className="text-left text-on-surface">
                <p className="font-bold">Generate Report</p>
                <p className="text-[10px] font-medium opacity-70 uppercase tracking-widest">Export weekly/monthly insights</p>
              </div>
            </Button>
          </div>
          
          <Card variant="primary" className="p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="italic font-body text-sm text-on-primary/80 mb-2">"Education is the most powerful weapon which you can use to change the world."</p>
              <p className="font-headline font-bold text-lg">— Nelson Mandela</p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </Card>
        </section>
      </div>
    </div>
  );
}
