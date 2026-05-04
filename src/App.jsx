import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/pages/Home";
import { Works } from "@/pages/Works";
import { About } from "@/pages/About";
import { Team } from "@/pages/Team";
import { Tickets } from "@/pages/Tickets";
import { Checkout } from "@/pages/Checkout";
import { Contact } from "@/pages/Contact";
import { Admin } from "@/pages/Admin";

function AppContent() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.title = "OneNotTwo Production — Independent Film Production House";
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

