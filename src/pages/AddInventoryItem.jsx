import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Hash, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AddInventoryItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "✅ Success!",
      description: "New item has been added to inventory.",
    });
    navigate('/inventory');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Helmet>
        <title>Add Inventory Item - Mirchi35 Management</title>
      </Helmet>
      
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/inventory">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inventory
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-6 h-6 mr-2 text-primary" />
            Add New Inventory Item
          </CardTitle>
          <CardDescription>Add a new item to the stock management system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input id="item-name" placeholder="Pooja Oil (1L)" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select id="category" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Pooja Items</option>
                  <option>Flowers</option>
                  <option>Prasadam</option>
                  <option>Supplies</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" placeholder="bottles" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Initial Stock Quantity</Label>
              <Input id="stock" type="number" placeholder="50" required />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/inventory')}>Cancel</Button>
              <Button type="submit">Add Item</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddInventoryItem;