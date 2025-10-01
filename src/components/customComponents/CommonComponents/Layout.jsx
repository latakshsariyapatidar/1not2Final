import React from 'react';
import { Header, Background } from '../';

const Layout = ({ children }) => {
  return (
    <div className="bg-[#1C1C1C] w-full h-[100dvh] relative overflow-hidden film-grain cinematic-bars">
      {/* Persistent Background */}
      <Background />
      
      {/* Persistent Header */}
      <Header />
      
      {/* Page Content Container */}
      <main 
        className="relative z-10 w-full h-full"
        data-barba="wrapper"
      >
        <div 
          className="page-content w-full h-full"
          data-barba="container"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;