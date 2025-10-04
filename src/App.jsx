import React from "react";
import { Routes, Route } from "react-router-dom";
import { 
  Layout,
  PageTransition,
  InitialLoadingScreen,
  HomePage, 
  AboutPage, 
  WorksPage, 
  ContactPage,
  TeamsPage
} from "./components";

function App() {
  return (
    <InitialLoadingScreen minLoadTime={0} fadeOutDuration={1000}>
      <Layout>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/teams" element={<TeamsPage />} />
          </Routes>
        </PageTransition>
      </Layout>
    </InitialLoadingScreen>
  );
}

export default App;
