import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const devotees = [
  { id: 1, name: 'Suresh Kumar', email: 'suresh.k@example.com', phone: '+91 9876543210', city: 'Mumbai', joined: '2023-01-15', type: 'Donor' },
  { id: 2, name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 9876543211', city: 'Delhi', joined: '2023-02-20', type: 'Volunteer' },
  { id: 3, name: 'Amit Patel', email: 'amit.p@example.com', phone: '+91 9876543212', city: 'Ahmedabad', joined: '2023-03-10', type: 'Member' },
  { id: 4, name: 'Anjali Singh', email: 'anjali.s@example.com', phone: '+91 9876543213', city: 'Kolkata', joined: '2023-04-05', type: 'Donor' },
  { id: 5, name: 'Rajesh Verma', email: 'rajesh.v@example.com', phone: '+91 9876543214', city: 'Chennai', joined: '2023-05-12', type: 'Member' },
];

const DevoteeManagement = () => {
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
        <title>User Management - Mirchi35 Management</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage devotee profiles, memberships, and engagement.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleAction('Export Devotees')}>
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link to="/devotees/new">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search devotees..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Contact</th>
                  <th scope="col" className="px-6 py-3">Location</th>
                  <th scope="col" className="px-6 py-3">Joined Date</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {devotees.map((devotee, index) => (
                  <motion.tr 
                    key={devotee.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{devotee.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{devotee.email}</td>
                    <td className="px-6 py-4 text-muted-foreground">{devotee.city}</td>
                    <td className="px-6 py-4 text-muted-foreground">{devotee.joined}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        devotee.type === 'Donor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        devotee.type === 'Volunteer' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      }`}>
                        {devotee.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleAction(`View ${devotee.name}`)}>View</Button>
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

export default DevoteeManagement;