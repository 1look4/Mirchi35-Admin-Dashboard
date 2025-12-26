import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter, FileDown, Trash2, Edit, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useConfirm } from '@/components/ConfirmDialog';
import { outletService } from '@/services';

const OutletManagement = () => {
  const { toast } = useToast();
  const confirm = useConfirm();
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOutlets, setTotalOutlets] = useState(0);

  useEffect(() => {
    fetchOutlets();
  }, [currentPage, searchQuery]);

  const fetchOutlets = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      console.log('Fetching outlets with params:', params);
      const response = await outletService.getAllOutlets(params);
      console.log('Outlet API response:', response);

      if (response.success) {
        setOutlets(response.data || []);
        setTotalPages(response.pages || 1);
        setTotalOutlets(response.total || 0);
        console.log('Outlets loaded:', response.data?.length || 0);
      } else {
        console.warn('API returned success: false', response);
      }
    } catch (error) {
      console.error('Failed to fetch outlets:', error);
      console.error('Error details:', error.response?.data || error.message);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load outlets",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteOutlet = async (outletId, outletName) => {
    const confirmed = await confirm({
      title: 'Delete Outlet',
      description: `Are you sure you want to delete "${outletName}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (!confirmed) return;

    try {
      await outletService.deleteOutlet(outletId);
      toast({
        title: "Success",
        description: `Outlet ${outletName} has been deleted`,
      });
      fetchOutlets();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete outlet",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    toast({
      title: `Export Outlets`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt!",
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Helmet>
        <title>Outlet Management - Admin Panel</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Outlet Management</h1>
          <p className="text-muted-foreground mt-2">Manage outlets, businesses, and establishments.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search outlets..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
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
                  <th scope="col" className="px-6 py-3">Outlet Name</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Owner</th>
                  <th scope="col" className="px-6 py-3">Outlet Type</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Created Date</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-3 text-muted-foreground">Loading outlets...</span>
                      </div>
                    </td>
                  </tr>
                ) : outlets.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-muted-foreground">
                      No outlets found
                    </td>
                  </tr>
                ) : outlets.map((outlet, index) => (
                  <motion.tr
                    key={outlet.businessId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">{outlet.Name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{outlet.Phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {outlet.userId?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {outlet.outletTypeId?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        outlet.Active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {outlet.Active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(outlet.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOutlet(outlet.businessId, outlet.Name)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default OutletManagement;
