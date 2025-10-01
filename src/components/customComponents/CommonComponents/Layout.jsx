import React from 'react';
import { Header, Background } from '../';

const Layout = ({ children }) => {
  return (
    <div className="bg-[#1C1C1C] w-full min-h-[100dvh] relative film-grain cinematic-bars">
      {/* Background Layer - Lowest z-index */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Background />
      </div>
      
      {/* Page Content Layer - Middle z-index */}
      <main 
        className="relative z-10 w-full min-h-[100dvh] pointer-events-auto"
        data-barba="wrapper"
      >
        <div 
          className="page-content relative w-full min-h-[100dvh] pointer-events-auto"
          data-barba="container"
        >
          {children}
        </div>
      </main>
      
      {/* Header/Menu Layer - Highest z-index (positioned last to be on top) */}
      <Header />
    </div>
  );
};

export default Layout;