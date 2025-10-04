import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { 
  Layout,
  PageTransition,
  InitialLoadingScreen,
  HomePage, 
  AboutPage, 
  WorksPage, 
  ContactPage,
  TeamsPage,
  LoginPage,
  SignUpPage
} from "./components";

function App() {
  return (
    <AuthProvider>
      <InitialLoadingScreen minLoadTime={0} fadeOutDuration={1000}>
        <Routes>
          {/* Authentication pages without layout and transitions */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Main website pages with layout and transitions */}
          <Route path="/*" element={
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
          } />
        </Routes>
      </InitialLoadingScreen>
    </AuthProvider>
  );
}

export default App;
