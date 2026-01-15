import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AddWork from '../pages/AddWork';
import SearchFarmer from '../pages/SearchFarmer';
import FarmerDetails from '../pages/FarmerDetails';
import UpdatePassword from '../pages/UpdatePassword';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update-password" element={<UpdatePassword />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path="/add-work" element={
                <ProtectedRoute>
                    <AddWork />
                </ProtectedRoute>
            } />

            <Route path="/search-farmer" element={
                <ProtectedRoute>
                    <SearchFarmer />
                </ProtectedRoute>
            } />

            <Route path="/farmer/:id" element={
                <ProtectedRoute>
                    <FarmerDetails />
                </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
};

export default AppRoutes;
