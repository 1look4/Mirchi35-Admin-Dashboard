import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Users, Mic, Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const events = [
  { id: 1, name: 'Diwali Celebration', date: '2024-11-01', type: 'Festival', volunteers: 50, status: 'Upcoming' },
  { id: 2, name: 'Gita Jayanti', date: '2024-12-03', type: 'Religious', volunteers: 20, status: 'Upcoming' },
  { id: 3, name: 'New Year Bhajan Sandhya', date: '2024-12-31', type: 'Cultural', volunteers: 30, status: 'Planning' },
  { id: 4, name: 'Holi Festival of Colors', date: '2025-03-14', type: 'Festival', volunteers: 70, status: 'Planning' },
];

const EventManagement = () => {
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
        <title>Event Management - Mirchi35 Management</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events & Festivals</h1>
          <p className="text-muted-foreground mt-2">Plan, promote, and manage all mirchi35 events.</p>
        </div>
        <Button asChild>
          <Link to="/events/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader><CardTitle>Total Events</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">18</p></CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">4</p></CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader><CardTitle>Total Volunteers</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">170</p></CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader><CardTitle>Tickets Sold</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">1,250</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Schedule</CardTitle>
          <CardDescription>Manage all upcoming and planned events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/50"
              >
                <div className="flex-1">
                  <p className="font-semibold text-primary text-lg">{event.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {event.date}</span>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> {event.volunteers} Volunteers</span>
                    <span className="flex items-center"><Mic className="w-4 h-4 mr-1.5" /> {event.type}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {event.status}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleAction(`Manage ${event.name}`)}>Manage</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventManagement;