import * as React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { BookOpen, User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface-container-low rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/5">
        {/* Left Side: Branding */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-gradient-to-br from-primary to-primary-container text-on-primary relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary">
                <BookOpen size={24} />
              </div>
              <span className="font-headline font-extrabold text-2xl tracking-tight">ScholarFlow</span>
            </div>
            <h1 className="font-headline text-5xl font-bold leading-tight mb-6">The Living Ledger of Academic Excellence.</h1>
            <p className="font-body text-lg text-primary-fixed opacity-90 max-w-md">Streamlining attendance tracking and student management with sophisticated, data-driven insights.</p>
          </div>
          
          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-primary-container object-cover"
                  src={`https://picsum.photos/seed/user${i}/100/100`}
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-on-primary-container flex items-center justify-center text-xs font-bold">+12</div>
            </div>
            <p className="text-sm font-label uppercase tracking-widest text-primary-fixed">Trusted by 500+ Institutions</p>
          </div>
          
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side: Form */}
        <div className="bg-surface-container-lowest p-8 md:p-20 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-10">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-body">Please enter your administrative credentials to access the portal.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Username or Email</label>
                <Input 
                  placeholder="admin@scholarflow.edu" 
                  icon={<User size={20} />}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Password</label>
                <div className="relative">
                  <Input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••••••" 
                    icon={<Lock size={20} />}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 bg-surface-container-high rounded-md border border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-sm font-semibold text-primary hover:underline">Forgot password?</button>
              </div>

              <Button className="w-full py-4 gap-2" size="lg">
                <span>Sign In to Portal</span>
                <ArrowRight size={20} />
              </Button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-sm text-on-surface-variant">Having trouble logging in? <button className="text-primary font-bold hover:underline">Contact IT Support</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
