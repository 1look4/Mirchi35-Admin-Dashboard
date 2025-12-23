import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const donationData = [
  { name: 'Jan', donations: 4000 },
  { name: 'Feb', donations: 3000 },
  { name: 'Mar', donations: 5000 },
  { name: 'Apr', donations: 4500 },
  { name: 'May', donations: 6000 },
  { name: 'Jun', donations: 5500 },
];

const expenseData = [
  { name: 'Jan', expenses: 2400 },
  { name: 'Feb', expenses: 1398 },
  { name: 'Mar', expenses: 9800 },
  { name: 'Apr', expenses: 3908 },
  { name: 'May', expenses: 4800 },
  { name: 'Jun', expenses: 3800 },
];

const FinancialReports = () => {
  const { toast } = useToast();

  const handleExport = (reportName) => {
    toast({
      title: `🚀 Exporting ${reportName}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Helmet>
        <title>Financial Reports - Mirchi35 Management</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
          <p className="text-muted-foreground mt-2">Analyze financial performance with detailed reports and charts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Donations</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="donations" fill="var(--chart-primary)" />
              </BarChart>
            </ResponsiveContainer>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => handleExport('Donation Report')}>
              <FileDown className="w-4 h-4 mr-2" /> Export Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expenses" stroke="var(--chart-secondary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => handleExport('Expense Report')}>
              <FileDown className="w-4 h-4 mr-2" /> Export Report
            </Button>
          </CardContent>
        </Card>
      </div>
      <style jsx global>{`
        :root {
          --chart-primary: hsl(142.1 76.2% 36.3%);
          --chart-secondary: hsl(0 84.2% 60.2%);
        }
        .dark {
          --chart-primary: hsl(142.1 70.6% 45.3%);
          --chart-secondary: hsl(0 72.2% 50.6%);
        }
      `}</style>
    </motion.div>
  );
};

export default FinancialReports;