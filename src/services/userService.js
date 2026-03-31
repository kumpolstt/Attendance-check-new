import { MOCK_USERS } from '../data/mock';

const STORAGE_KEY = 'scholarflow_users';

export const userService = {
  getUsers: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USERS));
      return MOCK_USERS;
    }
    return JSON.parse(stored);
  },

  saveUser: (userData) => {
    const users = userService.getUsers();
    const newUser = {
      id: (Math.max(...users.map(u => parseInt(u.id) || 0)) + 1).toString(),
      ...userData,
      avatar: `https://picsum.photos/seed/${userData.name}/100/100`
    };
    const updatedUsers = [newUser, ...users];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    return newUser;
  },

  deleteUser: (id) => {
    const users = userService.getUsers();
    const updatedUsers = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    return updatedUsers;
  },

  getStudentsByClass: (grade, section) => {
    const users = userService.getUsers();
    return users.filter(u => 
      u.role === 'student' && 
      u.grade === grade && 
      u.section === section
    );
  }
};
