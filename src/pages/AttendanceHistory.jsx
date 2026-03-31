import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Calendar, Filter, ChevronLeft, ChevronRight, Clock, AlertCircle, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { attendanceService } from '../services/attendanceService';
import { format } from 'date-fns';

export default function AttendanceHistory() {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    setHistory(attendanceService.getHistory());
  }, []);

  const handleExportCSV = () => {
    const headers = ['Date', 'Class', 'Subject', 'Attendance Rate (%)', 'Status'];
    const rows = history.map(record => [
      format(new Date(record.date), 'MMM dd, yyyy'),
      record.class,
      record.subject,
      record.rate,
      record.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs font-bold uppercase tracking-widest text-primary">Academic Records</p>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">Attendance History</h1>
          <p className="text-on-surface-variant font-medium mt-2">View and audit past attendance records for all classes.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
            <Download size={20} />
            <span>Export CSV</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar size={20} />
            <span>Select Date</span>
          </Button>
          <Button className="gap-2">
            <Filter size={20} />
            <span>Filter</span>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((record, i) => (
          <motion.div
            key={record.id || i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="lowest" className="p-8 border border-outline-variant/10 hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <Clock size={24} />
                </div>
                <Badge variant="primary">{record.status}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                  {format(new Date(record.date), 'MMM dd, yyyy').toUpperCase()}
                </p>
                <h3 className="text-xl font-headline font-bold text-on-surface">{record.class}</h3>
                <p className="text-sm font-medium text-on-surface-variant">{record.subject}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Attendance Rate</span>
                  <span className="text-lg font-black text-primary">{record.rate}%</span>
                </div>
                <Button variant="ghost" size="sm" className="px-0">View Details</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      <Card variant="lowest" className="p-0 overflow-hidden border border-outline-variant/10">
        <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="font-headline text-xl font-bold">Audit Log</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Page 1 of 12</span>
            <div className="flex gap-2 ml-4">
              <button className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Modified By</th>
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Action</th>
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {history.slice(0, 5).map((log, i) => (
                <tr key={log.id || i} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-8 py-5 text-sm font-semibold text-on-surface">
                    {format(new Date(log.timestamp), 'MMM dd, hh:mm a')}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                        EV
                      </div>
                      <span className="text-sm font-medium text-on-surface">Dr. Eleanor Vance</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <Badge variant="primary">Attendance Submitted</Badge>
                  </td>
                  <td className="px-8 py-5 text-right text-sm font-bold text-on-surface-variant">{log.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
