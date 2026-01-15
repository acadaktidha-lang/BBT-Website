import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnrollmentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnrollmentSidebar({ isOpen, onClose }: EnrollmentSidebarProps) {
  // Keep the iframe mounted to preserve Google Form load; toggle visibility only

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">Enrollment Form</h2>
            <p className="text-white/80 text-sm mt-1">Complete your application to get started</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Form Content */}
        <div className="flex-1 overflow-hidden">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSeoSMpIjWwg1-vG_0Vy5QqZafMs99A09VTBwIoBFNBp09ng7g/viewform?embedded=true" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="w-full h-full"
            style={{ minHeight: 'calc(100vh - 120px)' }}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </>
  );
}
