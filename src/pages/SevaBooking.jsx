import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const sevas = [
  { id: 1, name: 'Abhishekam', priest: 'Pandit Sharma', date: '2024-07-10', time: '08:00 AM', devotee: 'Suresh Kumar' },
  { id: 2, name: 'Archana', priest: 'Pandit Verma', date: '2024-07-10', time: '09:30 AM', devotee: 'Priya Sharma' },
  { id: 3, name: 'Homam', priest: 'Pandit Joshi', date: '2024-07-11', time: '10:00 AM', devotee: 'Amit Patel' },
  { id: 4, name: 'Kalyanam', priest: 'Pandit Sharma', date: '2024-07-12', time: '11:00 AM', devotee: 'Anjali Singh' },
];

const SevaBooking = () => {
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
        <title>Booking - Mirchi35 Management</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Booking</h1>
          <p className="text-muted-foreground mt-2">Manage online bookings for rituals and schedule priests.</p>
        </div>
        <Button asChild>
          <Link to="/seva/new">
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>List of scheduled poojas and rituals.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sevas.map((seva, index) => (
                  <motion.div
                    key={seva.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg flex items-center justify-between hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-semibold text-primary">{seva.name}</p>
                      <p className="text-sm text-muted-foreground">For {seva.devotee} with {seva.priest}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{seva.date}</p>
                      <p className="text-sm text-muted-foreground">{seva.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Seva Calendar</CardTitle>
              <CardDescription>Monthly view of bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-secondary rounded-lg">
                <p className="text-muted-foreground text-center">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2" />
                  Calendar view will be implemented here.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default SevaBooking;