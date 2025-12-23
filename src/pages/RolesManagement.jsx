import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Plus, Edit, Trash2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const rolesData = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full access to all system features.',
    userCount: 2,
    permissions: ['all']
  },
  {
    id: 2,
    name: 'Vendor',
    description: 'Access to Booking, Event, and User Management.',
    userCount: 5,
    permissions: ['seva_manage', 'event_manage', 'devotee_view']
  },
  {
    id: 3,
    name: 'Accountant',
    description: 'Access to Donation and Financial reports.',
    userCount: 3,
    permissions: ['donation_manage', 'reports_view']
  },
  {
    id: 4,
    name: 'Partner',
    description: 'Limited access for event and user assistance.',
    userCount: 25,
    permissions: ['event_view', 'devotee_view']
  }
];

const allPermissions = [
  { id: 'dashboard_view', label: 'View Dashboard' },
  { id: 'devotee_manage', label: 'Manage Users' },
  { id: 'devotee_view', label: 'View Users' },
  { id: 'donation_manage', label: 'Manage Donations' },
  { id: 'seva_manage', label: 'Manage Bookings' },
  { id: 'event_manage', label: 'Manage Events' },
  { id: 'event_view', label: 'View Events' },
  { id: 'inventory_manage', label: 'Manage Inventory' },
  { id: 'staff_manage', label: 'Manage Staff' },
  { id: 'reports_view', label: 'View Reports' },
  { id: 'settings_manage', label: 'Manage Settings' },
  { id: 'roles_manage', label: 'Manage Roles' },
];

const RolesManagement = () => {
  const [selectedRole, setSelectedRole] = useState(rolesData[0]);
  const { toast } = useToast();

  const handleAction = (action) => {
    toast({
      title: `🚀 ${action}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Roles & Permissions</h1>
          <p className="text-muted-foreground mt-2">Manage user roles and their access levels across the system.</p>
        </div>
        <Button onClick={() => handleAction('Add New Role')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Users className="mr-2"/> System Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rolesData.map(role => (
                  <div
                    key={role.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${selectedRole.id === role.id ? 'bg-primary/10 border-primary border' : 'hover:bg-muted'}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{role.name}</p>
                      <span className="text-sm text-muted-foreground">{role.userCount} users</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center"><Shield className="mr-2"/> Permissions for {selectedRole.name}</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleAction('Edit Role')}><Edit className="h-4 w-4"/></Button>
                  <Button variant="destructive" size="icon" onClick={() => handleAction('Delete Role')}><Trash2 className="h-4 w-4"/></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">Select permissions for the <span className="font-semibold text-foreground">{selectedRole.name}</span> role.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  {allPermissions.map(permission => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission.id}
                        checked={selectedRole.permissions.includes('all') || selectedRole.permissions.includes(permission.id)}
                        disabled={selectedRole.permissions.includes('all')}
                      />
                      <Label htmlFor={permission.id} className="font-normal">{permission.label}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => handleAction('Save Permissions')}>
                    <Lock className="mr-2 h-4 w-4"/> Save Permissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RolesManagement;