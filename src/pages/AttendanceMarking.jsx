import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, Check, X, Clock, AlertCircle, Save, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { MOCK_CLASSES } from '../data/mock';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { attendanceService } from '../services/attendanceService';
import { userService } from '../services/userService';

export default function AttendanceMarking() {
  const [selectedClassId, setSelectedClassId] = React.useState(MOCK_CLASSES[0].id);
  const selectedClass = MOCK_CLASSES.find(c => c.id === selectedClassId) || MOCK_CLASSES[0];
  
  const [attendance, setAttendance] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const [searchQuery, setSearchQuery] = React.useState('');
  const [students, setStudents] = React.useState([]);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.rollNo && s.rollNo.toString().includes(searchQuery))
  );

  // Load students based on the selected class
  React.useEffect(() => {
    const classStudents = userService.getStudentsByClass(selectedClass.grade, selectedClass.section);
    setStudents(classStudents);
    setAttendance({});
  }, [selectedClassId, selectedClass.grade, selectedClass.section]);

  const mark = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSubmit = async () => {
    const markedCount = Object.keys(attendance).length;
    
    if (markedCount < students.length) {
      toast.error(`Please mark all students. (${markedCount}/${students.length} marked)`);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate attendance rate
    const presentCount = Object.values(attendance).filter(s => s === 'present' || s === 'late').length;
    const rate = Math.round((presentCount / students.length) * 100);

    // Save to history
    attendanceService.saveRecord({
      date: selectedDate,
      class: `Grade ${selectedClass.grade}-${selectedClass.section}`,
      subject: selectedClass.name,
      rate,
      data: attendance
    });
    
    setIsSubmitting(false);
    toast.success(`Attendance for ${selectedClass.name} on ${format(new Date(selectedDate), 'PPP')} submitted successfully!`);
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs font-bold uppercase tracking-widest text-primary">Daily Ledger</p>
          <div className="flex items-center gap-4">
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">
              Grade {selectedClass.grade} - Section {selectedClass.section}
            </h1>
            <select 
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/20 rounded-xl px-3 py-1.5 font-headline font-bold text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {MOCK_CLASSES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <div className="relative group">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <Badge variant="primary" className="gap-2 py-1.5 px-4 cursor-pointer group-hover:bg-primary-container transition-colors">
                <CalendarIcon size={14} />
                {format(new Date(selectedDate), 'MMM dd, yyyy').toUpperCase()}
              </Badge>
            </div>
            <span className="text-sm font-body text-on-surface-variant font-medium border-l border-outline-variant/30 pl-3">
              {students.length} Students Enrolled
            </span>
            <Badge variant="secondary" className="bg-secondary-container/30 text-secondary">
              Room {selectedClass.room}
            </Badge>
          </div>
        </div>
        <Button 
          className="gap-2 px-8 shadow-xl shadow-primary/20"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          <span>{isSubmitting ? 'Submitting...' : 'Submit Attendance'}</span>
        </Button>
      </header>

      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search student by name or roll no..." 
            icon={<Search size={20} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2 text-green-700 border-green-200 hover:bg-green-50"
            onClick={() => {
              const allPresent = {};
              students.forEach(s => allPresent[s.id] = 'present');
              setAttendance(allPresent);
              toast.success('All students marked as present');
            }}
          >
            <Check size={20} />
            <span>Mark All Present</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter size={20} />
            <span>Sort</span>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {filteredStudents.map((student, i) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card variant="lowest" className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-transparent hover:border-primary/20 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-container shadow-inner">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{student.name}</h3>
                  <p className="font-label text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Roll No: #{student.rollNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 md:w-80">
                {[
                  { id: 'present', label: 'P', color: 'bg-green-100 text-green-700 hover:bg-green-200', active: 'bg-green-600 text-white shadow-md shadow-green-200' },
                  { id: 'absent', label: 'A', color: 'bg-error-container/30 text-error hover:bg-error-container/50', active: 'bg-error text-white shadow-md shadow-error/20' },
                  { id: 'late', label: 'L', color: 'bg-tertiary-fixed/30 text-tertiary hover:bg-tertiary-fixed/50', active: 'bg-tertiary text-white shadow-md shadow-tertiary/20' },
                  { id: 'excused', label: 'E', color: 'bg-secondary-container/50 text-secondary hover:bg-secondary-container', active: 'bg-secondary text-white shadow-md shadow-secondary/20' },
                ].map((status) => (
                  <button
                    key={status.id}
                    onClick={() => mark(student.id, status.id)}
                    className={cn(
                      'flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 font-headline font-black text-sm',
                      attendance[student.id] === status.id ? status.active : status.color
                    )}
                  >
                    {status.label}
                    <span className="text-[8px] font-bold uppercase tracking-tighter mt-0.5 opacity-70">
                      {status.id}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
