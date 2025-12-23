import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { DollarSign, Users, TrendingUp, FileDown, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const donations = [
  { id: 1, devotee: 'Suresh Kumar', amount: '₹5,001', date: '2024-07-01', type: 'UPI', status: 'Completed' },
  { id: 2, devotee: 'Anjali Singh', amount: '₹11,000', date: '2024-07-01', type: 'Credit Card', status: 'Completed' },
  { id: 3, devotee: 'Amit Patel', amount: '₹2,500', date: '2024-06-30', type: 'Net Banking', status: 'Completed' },
  { id: 4, devotee: 'Priya Sharma', amount: '₹1,001', date: '2024-06-29', type: 'Wallet', status: 'Completed' },
  { id: 5, devotee: 'Rajesh Verma', amount: '₹7,500', date: '2024-06-28', type: 'UPI', status: 'Completed' },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card className="card-hover">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`w-5 h-5 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const DonationManagement = () => {
  const { toast } = useToast();

  const handleAction = (action) => {
    toast({
      title: `🚀 ${action}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Helmet>
        <title>Donation Management - Mirchi35 Management</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Donations & Funds</h1>
          <p className="text-muted-foreground mt-2">Track donations, manage funds, and view financial transparency.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleAction('Export Donations')}>
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link to="/donations/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Donation
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Donations (This Month)" value="₹2,34,567" icon={DollarSign} color="text-green-500" />
        <StatCard title="Total Donors (This Month)" value="1,289" icon={Users} color="text-blue-500" />
        <StatCard title="Average Donation" value="₹1,820" icon={TrendingUp} color="text-purple-500" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>A list of the most recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">Devotee</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Payment Method</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <motion.tr 
                    key={donation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{donation.devotee}</td>
                    <td className="px-6 py-4 font-semibold text-green-500">{donation.amount}</td>
                    <td className="px-6 py-4 text-muted-foreground">{donation.date}</td>
                    <td className="px-6 py-4 text-muted-foreground">{donation.type}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleAction(`View Donation #${donation.id}`)}>Details</Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DonationManagement;