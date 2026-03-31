const STORAGE_KEY = 'scholarflow_attendance_history';

export const attendanceService = {
  getHistory: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const localData = stored ? JSON.parse(stored) : [];
    
    // Combine with some initial mock data if empty
    if (localData.length === 0) {
      const initialData = [
        { id: 'h1', date: '2023-10-24', class: 'Grade 10-A', subject: 'Mathematics', rate: 94, status: 'Completed', timestamp: new Date('2023-10-24T10:15:00').toISOString() },
        { id: 'h2', date: '2023-10-23', class: 'Grade 11-B', subject: 'Physics', rate: 88, status: 'Completed', timestamp: new Date('2023-10-23T09:45:00').toISOString() },
        { id: 'h3', date: '2023-10-22', class: 'Grade 12-C', subject: 'History', rate: 91, status: 'Completed', timestamp: new Date('2023-10-22T15:30:00').toISOString() },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    
    return localData.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  saveRecord: (record) => {
    const history = attendanceService.getHistory();
    const newRecord = {
      id: Date.now().toString(),
      ...record,
      timestamp: new Date().toISOString(),
      status: 'Completed'
    };
    
    const updatedHistory = [newRecord, ...history];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    return newRecord;
  }
};
