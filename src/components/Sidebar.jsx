import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Calendar, 
  Package, 
  UserCheck, 
  BarChart3, 
  Settings,
  Sparkles,
  Shield,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'User Management', path: '/devotees' },
  { icon: Sparkles, label: 'Bookings', path: '/seva' },
  { icon: Calendar, label: 'Events & Festivals', path: '/events' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: UserCheck, label: 'Staff Management', path: '/staff' },
  { icon: BarChart3, label: 'Financial Reports', path: '/reports' },
  { icon: Shield, label: 'Roles & Permissions', path: '/roles' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-full flex flex-col bg-card text-card-foreground shadow-2xl border-r border-border">
      <div className="flex items-center justify-between p-6 border-b border-border h-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xl om-symbol text-primary-foreground">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Mirchi35</h1>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden text-muted-foreground hover:bg-accent p-2 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 mt-6 px-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-accent rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Link to="/profile" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <span className="text-primary font-semibold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-foreground font-medium">{user.name}</p>
                <p className="text-muted-foreground text-sm">{user.role}</p>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;