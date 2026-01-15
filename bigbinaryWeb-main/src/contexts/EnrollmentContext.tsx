import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnrollmentContextType {
  isEnrollmentSidebarOpen: boolean;
  openEnrollmentSidebar: () => void;
  closeEnrollmentSidebar: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [isEnrollmentSidebarOpen, setIsEnrollmentSidebarOpen] = useState(false);

  const openEnrollmentSidebar = () => {
    setIsEnrollmentSidebarOpen(true);
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = 'hidden';
  };

  const closeEnrollmentSidebar = () => {
    setIsEnrollmentSidebarOpen(false);
    // Restore body scroll when sidebar is closed
    document.body.style.overflow = 'unset';
  };

  return (
    <EnrollmentContext.Provider
      value={{
        isEnrollmentSidebarOpen,
        openEnrollmentSidebar,
        closeEnrollmentSidebar,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
}
