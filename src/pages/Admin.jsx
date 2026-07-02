import { useState, useEffect } from "react";
import { MoviesManager } from "@/components/admin/MoviesManager";
import { BookingsManager } from "@/components/admin/BookingsManager";
import { VerifiedBookingsManager } from "@/components/admin/VerifiedBookingsManager";
import { RejectedBookingsManager } from "@/components/admin/RejectedBookingsManager";
import { TicketScanner } from "@/components/admin/TicketScanner";
import { ContactsManager } from "@/components/admin/ContactsManager";
import { TeamManager } from "@/components/admin/TeamManager";
import { getFbAuth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

export function Admin() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const ADMIN_EMAILS = import.meta.env.VITE_EMAIL_ADMIN?.split(",") || [];

  useEffect(() => {
    const auth = getFbAuth();
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAdmin(ADMIN_EMAILS.includes(user.email));
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const auth = getFbAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!ADMIN_EMAILS.includes(user.email)) {
        await signOut(auth);
        alert("Access Denied: You are not an admin.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    const auth = getFbAuth();
    signOut(auth);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="label-mono animate-pulse text-gold">Verifying Admin Access...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-surface border border-border p-10 text-center space-y-8">
          <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🔒</span>
          </div>
          <div>
            <h2 className="font-display text-4xl mb-2">Restricted Area</h2>
            <p className="label-mono text-xs text-muted-foreground uppercase tracking-widest">Authorized Personnel Only</p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full ghost-btn ghost-btn-gold py-4 flex items-center justify-center gap-3"
          >
            Sign in with Google
          </button>
        </div>
      </section>
    );
  }

  const tabs = [
    { id: "bookings", label: "Pending Bookings", icon: "⏳" },
    { id: "verified-bookings", label: "Verified Bookings", icon: "✅" },
    { id: "rejected-bookings", label: "Rejected Bookings", icon: "❌" },
    { id: "movies", label: "Movies", icon: "🎬" },
    { id: "team", label: "Team", icon: "👥" },
    { id: "inquiries", label: "Inquiries", icon: "📩" },
    { id: "scanner", label: "Scanner", icon: "🔍" },
  ];

  return (
    <section className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div>
            <p className="label-mono mb-3 text-gold">/ Control Center</p>
            <h2 className="font-display text-5xl md:text-7xl">
              Admin Panel.
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="label-mono text-[10px] text-muted-foreground uppercase">Logged in as</p>
              <p className="label-mono text-xs text-gold">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-[10px] label-mono border border-border px-3 py-2 hover:bg-white hover:text-background transition-all uppercase"
            >
              Logout
            </button>
          </div>
        </div>

        <nav className="flex gap-2 bg-surface p-1 border border-border mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 label-mono text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-gold text-background" 
                  : "hover:text-gold text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="bg-surface border border-border p-6 md:p-8 min-h-[60vh]">
          {activeTab === "bookings" && <BookingsManager />}
          {activeTab === "verified-bookings" && <VerifiedBookingsManager />}
          {activeTab === "rejected-bookings" && <RejectedBookingsManager />}
          {activeTab === "movies" && <MoviesManager />}
          {activeTab === "inquiries" && <ContactsManager />}
          {activeTab === "scanner" && <TicketScanner />}
          {activeTab === "team" && <TeamManager />}
        </div>
      </div>
    </section>
  );
}
