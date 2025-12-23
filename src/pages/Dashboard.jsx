import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  UserCheck,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const stats = [
    { title: 'Total Devotees', value: '12,847', change: '+12%', icon: Users, color: 'text-blue-500' },
    { title: 'Monthly Donations', value: '₹8,45,230', change: '+18%', icon: Heart, color: 'text-green-500' },
    { title: 'Seva Bookings', value: '234', change: '+8%', icon: Sparkles, color: 'text-purple-500' },
    { title: 'Active Events', value: '12', change: '+3%', icon: Calendar, color: 'text-orange-500' }
  ];

  const handleQuickAction = (action) => {
    toast({
      title: `🚀 ${action}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Dashboard - Mirchi35 Management</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user.name}! Here's what's happening today.</p>
        </div>
        <Button onClick={() => handleQuickAction('Generate Report')}>
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Recent donations will be listed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Upcoming events will be listed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;