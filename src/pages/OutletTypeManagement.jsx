import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Edit2, Trash2, Save, X, Filter, Store } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useConfirm } from '@/components/ConfirmDialog';
import { outletTypeService, categoryService } from '@/services';

const OutletTypeManagement = () => {
  const { toast } = useToast();
  const confirm = useConfirm();

  const [outletTypes, setOutletTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOutletType, setEditingOutletType] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    displayOrder: 1,
    active: true
  });

  useEffect(() => {
    fetchCategories();
    fetchOutletTypes();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchOutletTypes = async () => {
    try {
      setLoading(true);
      const params = selectedCategory !== 'all' ? { categoryId: selectedCategory } : {};
      const response = await outletTypeService.getAllOutletTypes(params);

      if (response.success && response.data) {
        setOutletTypes(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch outlet types:', error);
      toast({
        title: "Error",
        description: "Failed to load outlet types",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      categoryId: '',
      description: '',
      displayOrder: 1,
      active: true
    });
    setShowAddForm(false);
    setEditingOutletType(null);
  };

  const handleAddOutletType = async () => {
    if (!formData.name.trim() || !formData.categoryId) {
      toast({
        title: "Validation Error",
        description: "Name and Category are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await outletTypeService.createOutletType(formData);

      if (response.success) {
        toast({
          title: "Outlet Type Added",
          description: `"${formData.name}" has been added successfully`,
        });
        resetForm();
        fetchOutletTypes();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add outlet type",
        variant: "destructive"
      });
    }
  };

  const handleEditOutletType = (outletType) => {
    setEditingOutletType(outletType.outletTypeId);
    setFormData({
      name: outletType.name,
      categoryId: outletType.categoryId?._id || outletType.categoryId,
      description: outletType.description || '',
      displayOrder: outletType.displayOrder || 1,
      active: outletType.active !== undefined ? outletType.active : true
    });
    setShowAddForm(false);
  };

  const handleSaveOutletType = async () => {
    if (!formData.name.trim() || !formData.categoryId) {
      toast({
        title: "Validation Error",
        description: "Name and Category are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await outletTypeService.updateOutletType(editingOutletType, formData);

      if (response.success) {
        toast({
          title: "Outlet Type Updated",
          description: "Outlet type has been updated successfully",
        });
        resetForm();
        fetchOutletTypes();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update outlet type",
        variant: "destructive"
      });
    }
  };

  const handleDeleteOutletType = async (outletTypeId, outletTypeName) => {
    const confirmed = await confirm({
      title: 'Delete Outlet Type',
      description: `Are you sure you want to delete "${outletTypeName}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (!confirmed) return;

    try {
      const response = await outletTypeService.deleteOutletType(outletTypeId);

      if (response.success) {
        toast({
          title: "Outlet Type Deleted",
          description: `"${outletTypeName}" has been deleted`,
        });
        fetchOutletTypes();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete outlet type",
        variant: "destructive"
      });
    }
  };

  const getCategoryName = (categoryId) => {
    if (typeof categoryId === 'object' && categoryId?.name) {
      return categoryId.name;
    }
    const category = categories.find(cat => cat.categoryId === categoryId || cat._id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Helmet>
        <title>Outlet Type Management - Admin Panel</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Outlet Type Management</h1>
          <p className="text-muted-foreground mt-2">Manage outlet types and business classifications.</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Outlet Type
        </Button>
      </div>

      {/* Filter by Category */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.categoryId || cat._id} value={cat.categoryId || cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Add/Edit Form */}
      {(showAddForm || editingOutletType) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-lg">
                {editingOutletType ? 'Edit Outlet Type' : 'Add New Outlet Type'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Restaurant - Fine Dining"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.categoryId || cat._id} value={cat.categoryId || cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="active">Status</Label>
                  <Select value={formData.active.toString()} onValueChange={(value) => handleInputChange('active', value === 'true')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter outlet type description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={editingOutletType ? handleSaveOutletType : handleAddOutletType}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingOutletType ? 'Update' : 'Save'}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Outlet Types List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Loading outlet types...</span>
          </div>
        ) : outletTypes.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Store className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No outlet types yet. Click "Add Outlet Type" to create one.</p>
            </CardContent>
          </Card>
        ) : (
          outletTypes.map((outletType, index) => (
            <motion.div
              key={outletType.outletTypeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={editingOutletType === outletType.outletTypeId ? 'border-primary' : ''}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{outletType.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getCategoryName(outletType.categoryId)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        outletType.active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {outletType.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {outletType.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {outletType.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">
                        Order: {outletType.displayOrder || 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditOutletType(outletType)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteOutletType(outletType.outletTypeId, outletType.name)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default OutletTypeManagement;
