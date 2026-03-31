import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, MoreVertical, Plus, UserPlus, Mail, Shield, Trash2, X, Loader2, Check } from 'lucide-react';
import { userService } from '../services/userService';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export default function UserManagement() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  React.useEffect(() => {
    const loadUsers = () => {
      const data = userService.getUsers();
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, []);
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    role: 'student',
    grade: '',
    section: ''
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.includes(searchQuery)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const newUser = userService.saveUser(formData);
      setUsers(prev => [newUser, ...prev]);
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', role: 'student', grade: '', section: '' });
      toast.success(`${formData.name} added successfully!`);
    } catch (error) {
      toast.error('Failed to add user');
      setIsSubmitting(false);
    }
  };

  const [deleteConfirmation, setDeleteConfirmation] = React.useState(null);

  const handleDeleteUser = (id, name) => {
    setDeleteConfirmation({ id, name });
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      const updatedUsers = userService.deleteUser(deleteConfirmation.id);
      setUsers(updatedUsers);
      toast.success(`${deleteConfirmation.name} removed from the system`);
      setDeleteConfirmation(null);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 size={48} className="text-primary animate-spin" />
        <p className="text-on-surface-variant font-medium animate-pulse">Loading user database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs font-bold uppercase tracking-widest text-primary">Administration</p>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">User Management</h1>
          <p className="text-on-surface-variant font-medium mt-2">Manage students, teachers, and administrative staff profiles.</p>
        </div>
        <Button className="gap-2 px-8" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={20} />
          <span>Add New User</span>
        </Button>
      </header>

      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search by name, email or ID..." 
            icon={<Search size={20} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={20} />
          <span>Filters</span>
        </Button>
      </section>

      <Card variant="lowest" className="p-0 overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/10">
                <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">User Identity</th>
                <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Grade/Section</th>
                <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user, i) => (
                  <motion.tr 
                    key={user.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-surface-container-low/50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-surface-container shadow-inner">
                          <img 
                            src={user.avatar || `https://picsum.photos/seed/${user.id}/100/100`} 
                            alt={user.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-headline font-bold text-on-surface">{user.name}</p>
                          <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                            <Mail size={12} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge variant={user.role === 'admin' ? 'primary' : user.role === 'teacher' ? 'tertiary' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-semibold text-on-surface">
                        {user.grade ? `Grade ${user.grade}-${user.section}` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="p-2 hover:bg-error-container/20 hover:text-error rounded-xl transition-colors text-on-surface-variant"
                        >
                          <Trash2 size={20} />
                        </button>
                        <button className="p-2 hover:bg-surface-container rounded-xl transition-colors text-on-surface-variant">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-surface-container-low/30 flex justify-between items-center border-t border-outline-variant/10">
          <p className="text-sm text-on-surface-variant font-medium">Showing {filteredUsers.length} users</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* Add User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 overflow-hidden"
            >
              <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/30">
                <h2 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight">Add New User</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Full Name</label>
                    <Input 
                      name="name"
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                    <Input 
                      name="email"
                      type="email"
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Role</label>
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Grade</label>
                      <Input 
                        name="grade"
                        placeholder="10" 
                        value={formData.grade}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Section</label>
                    <Input 
                      name="section"
                      placeholder="A" 
                      value={formData.section}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 gap-2" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
                    <span>{isSubmitting ? 'Adding...' : 'Create User'}</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 p-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-error-container/30 text-error flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="font-headline text-2xl font-extrabold text-on-surface mb-2">Delete User?</h3>
              <p className="text-on-surface-variant font-medium mb-8">
                Are you sure you want to remove <span className="font-bold text-on-surface">{deleteConfirmation.name}</span> from the system? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setDeleteConfirmation(null)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1 bg-error hover:bg-error/90 text-white border-none" 
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
