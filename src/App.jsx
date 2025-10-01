import React from "react";
import { Routes, Route } from "react-router-dom";
import { 
  Layout,
  PageTransition,
  InitialLoadingScreen,
  HomePage, 
  AboutPage, 
  ServicesPage, 
  ContactPage 
} from "./components";

function App() {
  return (
    <InitialLoadingScreen minLoadTime={2500} fadeOutDuration={1000}>
      <Layout>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </PageTransition>
      </Layout>
    </InitialLoadingScreen>
  );
}

export default App;
