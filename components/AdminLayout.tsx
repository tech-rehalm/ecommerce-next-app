import React from 'react'
import AdminNav from './AdminNav'

interface AdminLayoutProps {
  children: React.ReactNode; // Allows any valid React node
  className?: string; // Optional className prop
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className }) => {
  return (
    <div className={`w-full min-h-screen flex mt-[80px] ${className}`}>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
