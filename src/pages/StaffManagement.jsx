import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Plus, UserCheck, Briefcase, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const staffMembers = [
  { id: 1, name: 'Pandit Sharma', role: 'Head Priest', email: 'sharma.p@mirchi35.org', phone: '+91 9123456780' },
  { id: 2, name: 'Pandit Verma', role: 'Priest', email: 'verma.p@mirchi35.org', phone: '+91 9123456781' },
  { id: 3, name: 'Ramesh Singh', role: 'Manager', email: 'ramesh.s@mirchi35.org', phone: '+91 9123456782' },
  { id: 4, name: 'Sita Devi', role: 'Accountant', email: 'sita.d@mirchi35.org', phone: '+91 9123456783' },
  { id: 5, name: 'Arjun Kumar', role: 'Security Head', email: 'arjun.k@mirchi35.org', phone: '+91 9123456784' },
];

const StaffManagement = () => {
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
        <title>Staff Management - Mirchi35 Management</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Priest & Staff Management</h1>
          <p className="text-muted-foreground mt-2">Manage staff directory, payroll, and performance.</p>
        </div>
        <Button asChild>
          <Link to="/staff/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>A complete list of all mirchi35 staff and priests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{staff.name}</CardTitle>
                        <CardDescription>{staff.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="flex items-center text-muted-foreground">
                      <Briefcase className="w-4 h-4 mr-2" /> {staff.email}
                    </p>
                    <p className="flex items-center text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" /> {staff.phone}
                    </p>
                    <Button variant="link" className="p-0 h-auto" onClick={() => handleAction(`View ${staff.name}'s Profile`)}>View Profile</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StaffManagement;