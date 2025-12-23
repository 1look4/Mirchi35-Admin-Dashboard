import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, Globe, Palette, Database, Key, Users, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

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
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-muted-foreground mt-2">Configure system preferences and settings</p>
        </div>
        <Button 
          onClick={() => handleAction('Save All Settings')}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
        >
          💾 Save Changes
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <Card className="mt-4">
            <CardContent className="p-6">
              <TabsContent value="general">
                <CardTitle className="mb-6 flex items-center"><SettingsIcon className="mr-2"/> General Settings</CardTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div><label className="text-sm font-medium">Org Name</label><Input defaultValue="Mirchi35" /></div>
                    <div><label className="text-sm font-medium">Address</label><Input defaultValue="123 Mirchi35 Street, Sacred City" /></div>
                  </div>
                  <div className="space-y-4">
                    <div><label className="text-sm font-medium">Contact Phone</label><Input defaultValue="+91 12345 43210" /></div>
                    <div><label className="text-sm font-medium">Email</label><Input defaultValue="info@Mirchi35.org" /></div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance">
                <CardTitle className="mb-6 flex items-center"><Palette className="mr-2"/> Appearance</CardTitle>
                <div className="space-y-4">
                  <h3 className="font-medium">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Light</Button>
                    <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Dark</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <CardTitle className="mb-6 flex items-center"><Shield className="mr-2"/> Security</CardTitle>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <p>Change Password</p>
                    <Button variant="outline" onClick={() => handleAction('Change Password')}><Key className="mr-2 h-4 w-4"/> Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <p>Two-Factor Authentication</p>
                    <Button variant="outline" onClick={() => handleAction('Setup 2FA')}>Enable</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="roles">
                <CardTitle className="mb-6 flex items-center"><Users className="mr-2"/> Roles & Permissions</CardTitle>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Define roles and manage permissions for your team.</p>
                  <Button asChild>
                    <Link to="/roles">
                      <Lock className="mr-2 h-4 w-4" /> Manage Roles
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <CardTitle className="mb-6 flex items-center"><Bell className="mr-2"/> Notifications</CardTitle>
                <p className="text-muted-foreground">Notification settings will be available here.</p>
              </TabsContent>

              <TabsContent value="integrations">
                <CardTitle className="mb-6 flex items-center"><Globe className="mr-2"/> Integrations</CardTitle>
                <p className="text-muted-foreground">Third-party integration settings will be available here.</p>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;