import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, Folder, FolderOpen, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useConfirm } from '@/components/ConfirmDialog';
import { categoryService } from '@/services';

const CategoryManagement = () => {
  const { toast } = useToast();
  const confirm = useConfirm();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const [addingSubCategoryTo, setAddingSubCategoryTo] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [editingSubCategory, setEditingSubCategory] = useState(null); // Stores subcategoryId
  const [editSubCategoryName, setEditSubCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAllCategories();

      if (response.success && response.data) {
        // Transform API data and fetch subcategories for each category
        const categoriesWithSubs = await Promise.all(
          response.data.map(async (cat) => {
            try {
              const subCatResponse = await categoryService.getSubCategoriesByCategory(cat.categoryId);
              return {
                id: cat.categoryId,
                name: cat.name,
                active: cat.active,
                subCategories: subCatResponse.success ? subCatResponse.data : [],
                expanded: false
              };
            } catch (error) {
              return {
                id: cat.categoryId,
                name: cat.name,
                active: cat.active,
                subCategories: [],
                expanded: false
              };
            }
          })
        );
        setCategories(categoriesWithSubs);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    ));
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "⚠️ Validation Error",
        description: "Category name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await categoryService.createCategory({
        name: newCategoryName,
        active: true
      });

      if (response.success) {
        toast({
          title: "✅ Category Added",
          description: `"${newCategoryName}" has been added successfully`,
        });
        setNewCategoryName('');
        setShowAddCategory(false);
        fetchCategories();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive"
      });
    }
  };

  const handleEditCategory = (category) => {
    // Close any open forms
    setShowAddCategory(false);
    setNewCategoryName('');
    setAddingSubCategoryTo(null);
    setNewSubCategoryName('');
    setEditingSubCategory(null);
    setEditSubCategoryName('');
    // Set the category to edit
    setEditingCategory(category.id);
    setEditCategoryName(category.name);
  };

  const handleSaveCategory = async (categoryId) => {
    if (!editCategoryName.trim()) {
      toast({
        title: "⚠️ Validation Error",
        description: "Category name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await categoryService.updateCategory(categoryId, {
        name: editCategoryName
      });

      if (response.success) {
        toast({
          title: "✅ Category Updated",
          description: "Category has been updated successfully",
        });
        setEditingCategory(null);
        setEditCategoryName('');
        fetchCategories();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    const confirmed = await confirm({
      title: 'Delete Category',
      description: `Are you sure you want to delete "${categoryName}" and all its sub-categories? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (!confirmed) return;

    try {
      const response = await categoryService.deleteCategory(categoryId);

      if (response.success) {
        toast({
          title: "✅ Category Deleted",
          description: `"${categoryName}" has been deleted`,
        });
        fetchCategories();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive"
      });
    }
  };

  const handleAddSubCategory = async (categoryId) => {
    if (!newSubCategoryName.trim()) {
      toast({
        title: "⚠️ Validation Error",
        description: "Sub-category name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await categoryService.createSubCategory({
        categoryId: categoryId,
        name: newSubCategoryName,
        active: true
      });

      if (response.success) {
        toast({
          title: "✅ Sub-category Added",
          description: `"${newSubCategoryName}" has been added successfully`,
        });
        setNewSubCategoryName('');
        setAddingSubCategoryTo(null);
        fetchCategories();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add sub-category",
        variant: "destructive"
      });
    }
  };

  const handleEditSubCategory = (subCategoryId, subCategoryName) => {
    // Close any open forms
    setShowAddCategory(false);
    setNewCategoryName('');
    setAddingSubCategoryTo(null);
    setNewSubCategoryName('');
    setEditingCategory(null);
    setEditCategoryName('');
    // Set the subcategory to edit
    setEditingSubCategory(subCategoryId);
    setEditSubCategoryName(subCategoryName);
  };

  const handleSaveSubCategory = async (subCategoryId) => {
    if (!editSubCategoryName.trim()) {
      toast({
        title: "⚠️ Validation Error",
        description: "Sub-category name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await categoryService.updateSubCategory(subCategoryId, {
        name: editSubCategoryName
      });

      if (response.success) {
        toast({
          title: "✅ Sub-category Updated",
          description: "Sub-category has been updated successfully",
        });
        setEditingSubCategory(null);
        setEditSubCategoryName('');
        fetchCategories();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update sub-category",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSubCategory = async (subCategoryId, subCategoryName) => {
    const confirmed = await confirm({
      title: 'Delete Sub-Category',
      description: `Are you sure you want to delete "${subCategoryName}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (!confirmed) return;

    try {
      const response = await categoryService.deleteSubCategory(subCategoryId);

      if (response.success) {
        toast({
          title: "✅ Sub-category Deleted",
          description: `"${subCategoryName}" has been deleted`,
        });
        fetchCategories();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete sub-category",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Helmet>
        <title>Category Management - Admin Panel</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Category Management</h1>
          <p className="text-muted-foreground mt-2">Manage template categories and sub-categories.</p>
        </div>
        <Button onClick={() => setShowAddCategory(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {showAddCategory && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-lg">Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="newCategory">Category Name</Label>
                  <Input
                    id="newCategory"
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                </div>
                <Button onClick={handleAddCategory}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowAddCategory(false);
                  setNewCategoryName('');
                }}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="space-y-4">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.05 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {category.expanded ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>

                      {category.expanded ? (
                        <FolderOpen className="w-5 h-5 text-primary" />
                      ) : (
                        <Folder className="w-5 h-5 text-primary" />
                      )}

                      {editingCategory === category.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSaveCategory(category.id)}
                            className="max-w-md"
                            autoFocus
                          />
                          <Button size="sm" onClick={() => handleSaveCategory(category.id)}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setEditingCategory(null);
                            setEditCategoryName('');
                          }}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            ({category.subCategories.length} sub-categories)
                          </span>
                        </div>
                      )}
                    </div>

                    {editingCategory !== category.id && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCategory(category.id, category.name)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {category.expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-8 space-y-2"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Sub-Categories</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setAddingSubCategoryTo(category.id)}
                        >
                          <Plus className="w-3 h-3 mr-2" />
                          Add Sub-Category
                        </Button>
                      </div>

                      {addingSubCategoryTo === category.id && (
                        <div className="flex items-center gap-2 mb-3 p-3 bg-accent rounded-lg">
                          <Input
                            placeholder="Enter sub-category name"
                            value={newSubCategoryName}
                            onChange={(e) => setNewSubCategoryName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSubCategory(category.id)}
                            className="flex-1"
                            autoFocus
                          />
                          <Button size="sm" onClick={() => handleAddSubCategory(category.id)}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setAddingSubCategoryTo(null);
                            setNewSubCategoryName('');
                          }}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      <div className="space-y-2">
                        {category.subCategories.length === 0 ? (
                          <p className="text-sm text-muted-foreground italic py-2">
                            No sub-categories yet. Click "Add Sub-Category" to create one.
                          </p>
                        ) : (
                          category.subCategories.map((subCat) => (
                            <div
                              key={subCat.subcategoryId}
                              className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                            >
                              {editingSubCategory === subCat.subcategoryId ? (
                                <div className="flex items-center gap-2 flex-1">
                                  <Input
                                    value={editSubCategoryName}
                                    onChange={(e) => setEditSubCategoryName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSaveSubCategory(subCat.subcategoryId)}
                                    className="flex-1"
                                    autoFocus
                                  />
                                  <Button size="sm" onClick={() => handleSaveSubCategory(subCat.subcategoryId)}>
                                    <Save className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => {
                                    setEditingSubCategory(null);
                                    setEditSubCategoryName('');
                                  }}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <span className="text-sm text-foreground">{subCat.name}</span>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleEditSubCategory(subCat.subcategoryId, subCat.name)}
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleDeleteSubCategory(subCat.subcategoryId, subCat.name)}
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {categories.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Folder className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No categories yet. Click "Add Category" to create your first category.</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default CategoryManagement;
