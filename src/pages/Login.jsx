import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ShieldCheck, UserCog, BookOpen } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = (role) => {
    let userDetails;
    switch (role) {
      case 'Administrator':
        userDetails = { email: 'admin@mirchi35.com', name: 'Mirchi35 Admin', role: 'Administrator' };
        break;
      case 'Priest':
        userDetails = { email: 'priest@mirchi35.com', name: 'Pandit Sharma', role: 'Priest' };
        break;
      case 'Accountant':
        userDetails = { email: 'accountant@mirchi35.com', name: 'Sita Devi', role: 'Accountant' };
        break;
      default:
        return;
    }
    login(userDetails);
    toast({
      title: `🎉 Welcome, ${role}!`,
      description: "You have successfully logged in.",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // This is a generic login, we'll default to an admin role for demo purposes
      login({ email, name: 'Mirchi35 Admin', role: 'Administrator' });
      toast({
        title: "🎉 Welcome Back!",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "⚠️ Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-card p-8 rounded-2xl shadow-2xl border border-border"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <span className="text-5xl om-symbol mirchi35-text-gradient">M</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Mirchi35</h1>
          <p className="text-muted-foreground">Sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full text-lg py-6">
            Login
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or login as
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button variant="outline" onClick={() => handleLogin('Administrator')}>
            <ShieldCheck className="w-4 h-4 mr-2" /> Admin
          </Button>
          <Button variant="outline" onClick={() => handleLogin('Priest')}>
            <UserCog className="w-4 h-4 mr-2" /> Vendor
          </Button>
          <Button variant="outline" onClick={() => handleLogin('Accountant')}>
            <BookOpen className="w-4 h-4 mr-2" /> Accountant
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;