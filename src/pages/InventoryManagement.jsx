import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Plus, Package, Truck, ShoppingCart, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const inventoryItems = [
  { id: 1, name: 'Pooja Oil (1L)', category: 'Pooja Items', stock: 50, unit: 'bottles', status: 'In Stock' },
  { id: 2, name: 'Marigold Flowers', category: 'Flowers', stock: 10, unit: 'kg', status: 'Low Stock' },
  { id: 3, name: 'Prasadam Boxes', category: 'Prasadam', stock: 500, unit: 'boxes', status: 'In Stock' },
  { id: 4, 'name': 'Agarbatti (Sandalwood)', category: 'Pooja Items', stock: 100, unit: 'packs', status: 'In Stock' },
  { id: 5, name: 'Ghee (500g)', category: 'Pooja Items', stock: 5, unit: 'packs', status: 'Out of Stock' },
];

const InventoryManagement = () => {
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
        <title>Inventory Management - Mirchi35 Management</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-2">Track stock levels of pooja items, prasadam, and supplies.</p>
        </div>
        <Button asChild>
          <Link to="/inventory/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Items</CardTitle><Package className="w-5 h-5 text-blue-500"/></CardHeader>
          <CardContent><p className="text-2xl font-bold">124</p></CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Items Low in Stock</CardTitle><AlertCircle className="w-5 h-5 text-yellow-500"/></CardHeader>
          <CardContent><p className="text-2xl font-bold">12</p></CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Suppliers</CardTitle><Truck className="w-5 h-5 text-purple-500"/></CardHeader>
          <CardContent><p className="text-2xl font-bold">15</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Stock</CardTitle>
          <CardDescription>Overview of all inventory items.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">Item Name</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Stock Level</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                    <td className="px-6 py-4 font-semibold">{item.stock} {item.unit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => handleAction(`Re-order ${item.name}`)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Re-order
                      </Button>
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

export default InventoryManagement;