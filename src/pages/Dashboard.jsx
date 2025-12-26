import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Heart,
  Calendar,
  TrendingUp,
  DollarSign,
  UserCheck,
  Sparkles,
  BarChart3,
  Building2,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardService } from '@/services';

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if user is authenticated
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    // Double check authentication before fetching
    const token = localStorage.getItem('authToken');
    if (!token || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await dashboardService.getDashboardStats();

      if (response.success && response.data) {
        const data = response.data;

        // Transform API data to stats format
        const transformedStats = [
          {
            title: 'Total Users',
            value: data.users?.total?.toLocaleString() || '0',
            change: `+${data.users?.last30Days || 0} this month`,
            icon: Users,
            color: 'text-blue-500'
          },
          {
            title: 'Total Businesses',
            value: data.businesses?.total?.toLocaleString() || '0',
            change: `${data.businesses?.active || 0} active`,
            icon: Building2,
            color: 'text-green-500'
          },
          {
            title: 'Categories',
            value: data.categories?.total?.toLocaleString() || '0',
            change: `${data.categories?.active || 0} active`,
            icon: BarChart3,
            color: 'text-purple-500'
          },
          {
            title: 'Sub-Categories',
            value: data.subcategories?.total?.toLocaleString() || '0',
            change: `${data.subcategories?.active || 0} active`,
            icon: Star,
            color: 'text-orange-500'
          }
        ];

        setStats(transformedStats);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      setError(err.message);

      // Only show toast for non-auth errors
      if (err.response?.status !== 401) {
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    toast({
      title: `🚀 ${action}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Dashboard - Admin Panel</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Welcome back, <span className="font-semibold text-foreground">{user.name}</span>! Here's what's happening today.</p>
        </div>
        <Button onClick={() => handleQuickAction('Generate Report')} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all">
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Loading skeletons
          [1, 2, 3, 4].map((i) => (
            <Card key={i} className="card-hover border-border/50 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                <div className="w-12 h-12 bg-muted animate-pulse rounded-xl"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-20 bg-muted animate-pulse rounded mb-2"></div>
                <div className="h-3 w-32 bg-muted animate-pulse rounded"></div>
              </CardContent>
            </Card>
          ))
        ) : stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover border-border/50 bg-gradient-to-br from-card to-card/50 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    stat.color === 'text-blue-500' ? 'from-blue-500/20 to-blue-600/20' :
                    stat.color === 'text-green-500' ? 'from-green-500/20 to-green-600/20' :
                    stat.color === 'text-purple-500' ? 'from-purple-500/20 to-purple-600/20' :
                    'from-orange-500/20 to-orange-600/20'
                  } flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-2 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <UserCheck className="w-5 h-5 mr-2 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Recent activities will be listed here.</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Quick statistics will be listed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;