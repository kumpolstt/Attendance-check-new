import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, MoreVertical, Plus, UserPlus, Mail, Shield } from 'lucide-react';
import { MOCK_USERS } from '../data/mock';
import { motion } from 'motion/react';

export default function UserManagement() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-label text-xs font-bold uppercase tracking-widest text-primary">Administration</p>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">User Management</h1>
          <p className="text-on-surface-variant font-medium mt-2">Manage students, teachers, and administrative staff profiles.</p>
        </div>
        <Button className="gap-2 px-8">
          <UserPlus size={20} />
          <span>Add New User</span>
        </Button>
      </header>

      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search by name, email or ID..." 
            icon={<Search size={20} />}
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
                <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {MOCK_USERS.map((user, i) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
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
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-bold text-green-600 uppercase tracking-tighter">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-xl transition-colors text-on-surface-variant">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-surface-container-low/30 flex justify-between items-center border-t border-outline-variant/10">
          <p className="text-sm text-on-surface-variant font-medium">Showing {MOCK_USERS.length} of 1,248 users</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
