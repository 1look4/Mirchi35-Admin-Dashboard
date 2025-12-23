import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AddEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Success!",
      description: "New event has been created.",
    });
    navigate('/events');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Helmet>
        <title>Create Event - Mirchi35 Management</title>
      </Helmet>
      
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/events">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-primary" />
            Create New Event
          </CardTitle>
          <CardDescription>Plan a new festival, cultural, or religious event.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input id="event-name" placeholder="Diwali Celebration" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <select id="event-type" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Festival</option>
                  <option>Religious</option>
                  <option>Cultural</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="volunteers">Required Volunteers</Label>
              <Input id="volunteers" type="number" placeholder="50" />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/events')}>Cancel</Button>
              <Button type="submit">Create Event</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddEvent;