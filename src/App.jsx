import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import DevoteeManagement from '@/pages/DevoteeManagement';
import AddDevotee from '@/pages/AddDevotee';
import DonationManagement from '@/pages/DonationManagement';
import AddDonation from '@/pages/AddDonation';
import SevaBooking from '@/pages/SevaBooking';
import AddSevaBooking from '@/pages/AddSevaBooking';
import EventManagement from '@/pages/EventManagement';
import AddEvent from '@/pages/AddEvent';
import InventoryManagement from '@/pages/InventoryManagement';
import AddInventoryItem from '@/pages/AddInventoryItem';
import StaffManagement from '@/pages/StaffManagement';
import AddStaff from '@/pages/AddStaff';
import FinancialReports from '@/pages/FinancialReports';
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
                <Route path="/devotees" element={<DevoteeManagement />} />
                <Route path="/devotees/new" element={<AddDevotee />} />
                <Route path="/donations" element={<DonationManagement />} />
                <Route path="/donations/new" element={<AddDonation />} />
                <Route path="/seva" element={<SevaBooking />} />
                <Route path="/seva/new" element={<AddSevaBooking />} />
                <Route path="/events" element={<EventManagement />} />
                <Route path="/events/new" element={<AddEvent />} />
                <Route path="/inventory" element={<InventoryManagement />} />
                <Route path="/inventory/new" element={<AddInventoryItem />} />
                <Route path="/staff" element={<StaffManagement />} />
                <Route path="/staff/new" element={<AddStaff />} />
                <Route path="/reports" element={<FinancialReports />} />
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
        <Helmet>
          <title>Mirchi35 Admin Management</title>
          <meta name="description" content="A comprehensive Admin platform for Mirchi35 management." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Lora:wght@400;500;700&display=swap" rel="stylesheet" />
        </Helmet>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;