import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Calendar, FileText, Download, TrendingUp, AlertTriangle, Filter, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { userService } from '../services/userService';
import { attendanceService } from '../services/attendanceService';
import { MOCK_CLASSES } from '../data/mock';

export default function Reports() {
  const [selectedClassId, setSelectedClassId] = React.useState('all');
  const [loading, setLoading] = React.useState(true);
  const [reportData, setReportData] = React.useState([]);
  const [stats, setStats] = React.useState({
    overallRate: 0,
    criticalCount: 0,
    period: 'Current Term'
  });

  React.useEffect(() => {
    const loadData = () => {
      setLoading(true);
      const users = userService.getUsers();
      const students = users.filter(u => u.role === 'student');
      const history = attendanceService.getHistory();

      // Filter history by class if selected
      const filteredHistory = selectedClassId === 'all' 
        ? history 
        : history.filter(h => {
            const cls = MOCK_CLASSES.find(c => c.id === selectedClassId);
            return h.class === `Grade ${cls.grade}-${cls.section}`;
          });

      // Calculate stats per student
      const studentStats = students.map(student => {
        // In a real app, we'd check attendance records for each student
        // For this demo, we'll simulate based on the overall history rate
        // but we'll try to be a bit more realistic if we had student-level data.
        
        // Let's assume each student has a base attendance rate stored or calculated
        // Since we don't have per-student records in localStorage yet (only session-level),
        // we'll generate some consistent mock-like data derived from their ID
        const seed = parseInt(student.id.replace(/\D/g, '')) || 0;
        const basePct = 70 + (seed % 30); // 70-100%
        
        return {
          id: student.id,
          name: student.name,
          rollNo: student.rollNo,
          grade: student.grade,
          section: student.section,
          pct: basePct,
          present: `${Math.round(22 * (basePct/100))}/22`,
          critical: basePct < 80,
          status: basePct > 90 ? 'Excellent' : basePct > 80 ? 'Satisfactory' : 'Low Attendance'
        };
      });

      // Filter students by class if selected
      const filteredStudents = selectedClassId === 'all'
        ? studentStats
        : studentStats.filter(s => {
            const cls = MOCK_CLASSES.find(c => c.id === selectedClassId);
            return s.grade === cls.grade && s.section === cls.section;
          });

      const overallRate = filteredStudents.length > 0
        ? Math.round(filteredStudents.reduce((acc, curr) => acc + curr.pct, 0) / filteredStudents.length)
        : 0;

      const criticalCount = filteredStudents.filter(s => s.critical).length;

      setReportData(filteredStudents);
      setStats({
        overallRate,
        criticalCount,
        period: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
      setLoading(false);
    };

    loadData();
  }, [selectedClassId]);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 size={48} className="text-primary animate-spin" />
        <p className="text-on-surface-variant font-medium animate-pulse">Generating insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs font-bold uppercase tracking-widest text-primary">Academic Insights</p>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">Monthly Performance Review</h1>
          <p className="text-on-surface-variant font-medium mt-2">A comprehensive ledger of student engagement and attendance trends.</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2 font-headline font-bold text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Classes</option>
            {MOCK_CLASSES.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.grade}-{c.section})</option>
            ))}
          </select>
          <Button className="gap-2 px-8">
            <Download size={20} />
            <span>Export Report</span>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="primary" className="p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label text-xs font-bold uppercase tracking-widest opacity-80">Overall Presence</p>
            <h3 className="text-5xl font-headline font-black mt-2">{stats.overallRate}%</h3>
            <div className="flex items-center gap-2 mt-4 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm text-xs font-bold">
              <TrendingUp size={14} />
              <span>Stable trend</span>
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
            <h3 className="text-3xl font-headline font-black text-on-surface mt-1">{stats.criticalCount} Students</h3>
          </div>
          <p className="text-xs font-medium text-error mt-4">Attendance below 80% threshold</p>
        </Card>

        <Card variant="lowest" className="p-8 border border-outline-variant/10 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary mb-4">
              <Calendar size={24} />
            </div>
            <p className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">Academic Period</p>
            <h3 className="text-2xl font-headline font-bold text-on-surface mt-1">{stats.period}</h3>
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
              {reportData.map((row, i) => (
                <tr key={row.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface-variant">
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{row.name}</p>
                        <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">ID: #{row.rollNo || row.id}</p>
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
              {reportData.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-on-surface-variant font-medium">
                    No students found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
