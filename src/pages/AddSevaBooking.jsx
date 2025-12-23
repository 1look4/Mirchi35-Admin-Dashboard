import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, User, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AddSevaBooking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Success!",
      description: "New Seva booking has been created.",
    });
    navigate('/seva');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Helmet>
        <title>New Seva Booking - Mirchi35 Management</title>
      </Helmet>
      
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/seva">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Seva Bookings
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-primary" />
            Create New Seva Booking
          </CardTitle>
          <CardDescription>Fill in the details to schedule a new seva or pooja.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="seva-name">Seva/Pooja Name</Label>
              <select id="seva-name" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>Abhishekam</option>
                <option>Archana</option>
                <option>Homam</option>
                <option>Kalyanam</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="devotee-name">Devotee Name</Label>
              <Input id="devotee-name" placeholder="Search for a devotee..." required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priest">Assigned Priest</Label>
              <select id="priest" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>Pandit Sharma</option>
                <option>Pandit Verma</option>
                <option>Pandit Joshi</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/seva')}>Cancel</Button>
              <Button type="submit">Create Booking</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddSevaBooking;