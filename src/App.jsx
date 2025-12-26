import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ConfirmDialogProvider } from '@/components/ConfirmDialog';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserManagement from '@/pages/DevoteeManagement';
import AddUser from '@/pages/AddDevotee';
import CategoryManagement from '@/pages/CategoryManagement';
import TemplateManagement from '@/pages/TemplateManagement';
import OutletManagement from '@/pages/OutletManagement';
import OutletTypeManagement from '@/pages/OutletTypeManagement';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import RolesManagement from '@/pages/RolesManagement';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route 
        path="/*"
        element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/users/new" element={<AddUser />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/templates" element={<TemplateManagement />} />
                <Route path="/outlets" element={<OutletManagement />} />
                <Route path="/outlet-types" element={<OutletTypeManagement />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/roles" element={<RolesManagement />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfirmDialogProvider>
          <Helmet>
            <title>Admin Panel</title>
            <meta name="description" content="A comprehensive Admin platform for managing your organization." />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Lora:wght@400;500;700&display=swap" rel="stylesheet" />
          </Helmet>
          <AppRoutes />
        </ConfirmDialogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;