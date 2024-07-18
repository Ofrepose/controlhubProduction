import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "contexts/user/AuthContext";
import { ProjectProvider } from "contexts/projects/ProjectContext";
import { SystemProvider } from "contexts/Systems/SystemContext";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import MarketingHome from "views/MarketingHome";
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from "contexts/ErrorHandling/ErrorHandler";

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProjectProvider>
          <SystemProvider>
            <Toaster position="bottom-right"
              reverseOrder={false}
            />
            <Routes>
              <Route path="auth/*" element={<AuthLayout />} />
              <Route path="admin/*" element={<AdminLayout />} />
              <Route path="/signin" element={<Navigate to="/admin" replace />} />
              <Route path="/login" element={<Navigate to="/admin" replace />} />
              <Route path="/app" element={<Navigate to="/admin" replace />} />
              <Route path="/" element={<MarketingHome />} />
            </Routes>
          </SystemProvider>
        </ProjectProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
