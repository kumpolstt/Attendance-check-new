import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { User, Mail, Shield, Bell, Settings, MapPin, Phone, Calendar } from 'lucide-react';
import { userService } from '../services/userService';

export default function Profile() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const users = userService.getUsers();
    // For demo purposes, we'll just take the first admin or the first user
    const admin = users.find(u => u.role === 'admin') || users[0];
    setUser(admin);
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-10">
      <header className="relative h-64 rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary to-primary-container">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </header>

      <div className="relative px-12 -mt-32 space-y-10">
        <section className="flex flex-col md:flex-row items-end gap-8">
          <div className="relative">
            <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-8 border-surface bg-surface-container shadow-2xl shadow-primary/10">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-primary text-on-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Settings size={20} />
            </div>
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-3">
              <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">{user.name}</h1>
              <Badge variant="primary">Administrator</Badge>
            </div>
            <p className="text-on-surface-variant font-medium mt-1 uppercase text-xs tracking-widest font-label">Employee ID: #ADM-2024-001</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button className="gap-2">
                <Bell size={18} />
                <span>Notifications</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <Settings size={18} />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card variant="lowest" className="lg:col-span-2 p-10 border border-outline-variant/10 space-y-8">
            <h3 className="font-headline text-2xl font-bold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Full Name</p>
                <p className="font-bold text-on-surface">{user.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Email Address</p>
                <p className="font-bold text-on-surface">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Phone Number</p>
                <p className="font-bold text-on-surface">+1 (555) 123-4567</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Department</p>
                <p className="font-bold text-on-surface">Academic Administration</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-outline-variant/10 space-y-4">
              <h4 className="font-headline font-bold text-lg">Bio</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Dedicated academic administrator with over 12 years of experience in streamlining institutional workflows and fostering student success through data-driven strategies.
              </p>
            </div>
          </Card>

          <div className="space-y-6">
            <Card variant="low" className="p-8 space-y-6">
              <h3 className="font-headline font-bold text-xl">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Classes Managed</span>
                  </div>
                  <span className="font-black text-primary">12</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/30 text-tertiary flex items-center justify-center">
                      <Shield size={16} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Security Level</span>
                  </div>
                  <span className="font-black text-tertiary">L4</span>
                </div>
              </div>
            </Card>

            <Card variant="lowest" className="p-8 border border-outline-variant/10">
              <h3 className="font-headline font-bold text-xl mb-4">Contact Support</h3>
              <p className="text-sm text-on-surface-variant mb-6">Need help with your account or permissions?</p>
              <Button variant="outline" className="w-full">Get Help</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
