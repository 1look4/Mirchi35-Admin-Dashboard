import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Upload, FileText, Search, Filter, Plus, Folder, File } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  {
    id: 1,
    name: 'Marketing',
    subCategories: ['Email Templates', 'Social Media', 'Brochures', 'Banners']
  },
  {
    id: 2,
    name: 'Sales',
    subCategories: ['Proposals', 'Contracts', 'Presentations', 'Reports']
  },
  {
    id: 3,
    name: 'HR',
    subCategories: ['Job Descriptions', 'Policies', 'Forms', 'Letters']
  },
  {
    id: 4,
    name: 'Legal',
    subCategories: ['Agreements', 'NDAs', 'Terms & Conditions', 'Privacy Policy']
  }
];

const mockTemplates = [
  { id: 1, name: 'Welcome Email Template', category: 'Marketing', subCategory: 'Email Templates', uploadedBy: 'Admin', date: '2024-01-15' },
  { id: 2, name: 'Sales Proposal Template', category: 'Sales', subCategory: 'Proposals', uploadedBy: 'Manager', date: '2024-01-20' },
  { id: 3, name: 'Job Offer Letter', category: 'HR', subCategory: 'Letters', uploadedBy: 'HR Manager', date: '2024-01-25' },
];

const TemplateManagement = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const currentCategory = categories.find(cat => cat.name === selectedCategory);
  const subCategories = currentCategory ? currentCategory.subCategories : [];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "✅ File Selected",
        description: `${file.name} ready to upload`,
      });
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !uploadedFile) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please select category, sub-category and choose a file",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "✅ Template Uploaded!",
      description: `${uploadedFile.name} has been uploaded successfully`,
    });

    setSelectedCategory('');
    setSelectedSubCategory('');
    setUploadedFile(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Helmet>
        <title>Template Management - Admin Panel</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Template Management</h1>
          <p className="text-muted-foreground mt-2">Upload and manage templates organized by categories.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2 text-primary" />
            Upload New Template
          </CardTitle>
          <CardDescription>Select category, sub-category, and upload your template file</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center">
                  <Folder className="w-4 h-4 mr-2" />
                  Category
                </Label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCategory" className="flex items-center">
                  <Folder className="w-4 h-4 mr-2" />
                  Sub-Category
                </Label>
                <select
                  id="subCategory"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  disabled={!selectedCategory}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Sub-Category</option>
                  {subCategories.map((subCat, index) => (
                    <option key={index} value={subCat}>{subCat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateFile" className="flex items-center">
                <File className="w-4 h-4 mr-2" />
                Template File
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="templateFile"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.html,.zip"
                  className="cursor-pointer"
                />
                {uploadedFile && (
                  <span className="text-sm text-muted-foreground">
                    {uploadedFile.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, HTML, ZIP
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                <Upload className="w-4 h-4 mr-2" />
                Upload Template
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Existing Templates
            </CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search templates..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">Template Name</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Sub-Category</th>
                  <th scope="col" className="px-6 py-3">Uploaded By</th>
                  <th scope="col" className="px-6 py-3">Upload Date</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTemplates.map((template, index) => (
                  <motion.tr
                    key={template.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 font-medium text-foreground flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-500" />
                      {template.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{template.category}</td>
                    <td className="px-6 py-4 text-muted-foreground">{template.subCategory}</td>
                    <td className="px-6 py-4 text-muted-foreground">{template.uploadedBy}</td>
                    <td className="px-6 py-4 text-muted-foreground">{template.date}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Download</Button>
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

export default TemplateManagement;
