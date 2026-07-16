import { useState, useEffect } from "react";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, query, deleteDoc } from "firebase/firestore";

export function BookingsManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieFilter, setMovieFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isClearing, setIsClearing] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    const db = getDb();
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const q = query(collection(db, "bookings"));
      const snap = await getDocs(q);
      const allBookings = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      const getTimestamp = (val) => {
        if (!val) return 0;
        if (typeof val.toDate === "function") {
          return val.toDate().getTime();
        }
        if (typeof val.seconds === "number") {
          return val.seconds * 1000;
        }
        const parsed = Date.parse(val);
        return isNaN(parsed) ? 0 : parsed;
      };

      allBookings.sort((a, b) => {
        const timeA = getTimestamp(a.createdAt);
        const timeB = getTimestamp(b.createdAt);
        return timeB - timeA;
      });

      // Filter strictly for pending bookings
      const pendingBookings = allBookings.filter(b => b.paymentStatus === "pending" || !b.paymentStatus);
      setBookings(pendingBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const stats = {
    pendingCount: bookings.length,
    potentialRevenue: bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0)
  };

  const handleVerify = async (booking) => {
    if (!confirm(`Verify payment for ${booking.customerName}?`)) return;
    
    const db = getDb();
    try {
      if (!booking.customerEmail) {
        throw new Error("Customer email is missing");
      }

      await updateDoc(doc(db, "bookings", booking.id), {
        paymentStatus: "verified",
        ticketStatus: "confirmed"
      });
      
      const ticketQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${booking.verificationToken}`;
      
      const templateParams = {
        to_name: booking.customerName,
        movie_title: booking.movieTitle,
        ticket_count: booking.numberOfTickets,
        qr_code_url: ticketQrUrl,
        total_paid: booking.totalAmount,
        utr_number: booking.paymentUTR
      };

      console.log("Attempting to send email via Serverless Nodemailer API...");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: booking.customerEmail,
          subject: "OneNotTwo — Booking Confirmation",
          type: "confirm",
          templateParams,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      alert(`Success! Ticket verified and confirmation email sent to ${booking.customerEmail}.`);
      fetchBookings();
    } catch (err) {
      console.error("Verification/Email failed:", err);
      alert(`Verification successful, but email failed to send: ${err.message}`);
      fetchBookings(); // Still reload list
    }
  };

  const handleReject = async (booking) => {
    if (!confirm(`Reject payment for ${booking.customerName}?`)) return;
    
    const db = getDb();
    try {
      if (!booking.customerEmail) {
        throw new Error("Customer email is missing");
      }

      await updateDoc(doc(db, "bookings", booking.id), {
        paymentStatus: "rejected",
        ticketStatus: "cancelled"
      });
      
      const templateParams = {
        to_name: booking.customerName,
        movie_title: booking.movieTitle,
        utr_number: booking.paymentUTR
      };

      console.log("Attempting to send rejection email via Serverless Nodemailer API...");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: booking.customerEmail,
          subject: "OneNotTwo — Payment Verification Failed",
          type: "reject",
          templateParams,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      alert(`Booking rejected and cancellation email sent to ${booking.customerEmail}.`);
      fetchBookings();
    } catch (err) {
      console.error("Rejection/Email failed:", err);
      alert(`Booking rejected, but email failed to send: ${err.message}`);
      fetchBookings();
    }
  };

  const handleClearPendingQueue = async () => {
    if (bookings.length === 0) {
      alert("No pending bookings to clear.");
      return;
    }
    
    if (!confirm(`WARNING: This will permanently delete all ${bookings.length} pending bookings from the database. Are you sure?`)) {
      return;
    }

    if (!confirm("Confirming again: do you want to proceed with deleting all pending bookings? This action is irreversible.")) {
      return;
    }

    setIsClearing(true);
    const db = getDb();
    try {
      const deletePromises = bookings.map(b => deleteDoc(doc(db, "bookings", b.id)));
      await Promise.all(deletePromises);
      alert("Pending bookings queue cleared successfully.");
      fetchBookings();
    } catch (err) {
      console.error("Error clearing pending queue:", err);
      alert(`Failed to clear: ${err.message}`);
    } finally {
      setIsClearing(false);
    }
  };

  const uniqueMovies = [...new Set(bookings.map(b => b.movieTitle))].sort();

  const filteredBookings = bookings.filter(b => {
    const matchesMovie = movieFilter === "all" || b.movieTitle === movieFilter;
    const searchStr = `${b.customerName} ${b.customerEmail} ${b.paymentUTR} ${b.movieTitle}`.toLowerCase();
    const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
    return matchesMovie && matchesSearch;
  });

  if (loading) return <p className="label-mono animate-pulse">Loading bookings...</p>;

  return (
    <div className="space-y-8">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-background border border-border p-4">
          <p className="label-mono text-[10px] text-muted-foreground uppercase text-yellow-500">Pending Verification</p>
          <p className="font-display text-3xl text-yellow-500">{stats.pendingCount}</p>
        </div>
        <div className="bg-background border border-border p-4 border-l-gold">
          <p className="label-mono text-[10px] text-gold uppercase">Potential Revenue (Pending)</p>
          <p className="font-display text-3xl text-gold">₹{stats.potentialRevenue}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="font-display text-3xl">Pending Bookings</h3>
          <p className="label-mono text-xs text-muted-foreground mt-1">Verify or reject incoming ticket requests.</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={handleClearPendingQueue}
            disabled={isClearing || bookings.length === 0}
            className="text-xs label-mono border border-red-500/30 hover:border-red-500 hover:text-red-500 py-2 px-4 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isClearing ? "Clearing..." : "🗑️ Clear Pending Queue"}
          </button>
          <input 
            type="text" 
            placeholder="Search bookings..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-background border border-border p-2 text-xs label-mono outline-none focus:border-gold w-48 md:w-64"
          />
          <select 
            value={movieFilter} 
            onChange={e => setMovieFilter(e.target.value)}
            className="bg-background border border-border p-2 text-xs label-mono outline-none focus:border-gold"
          >
            <option value="all">All Movies</option>
            {uniqueMovies.map(movie => (
              <option key={movie} value={movie}>{movie}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border label-mono text-[10px] uppercase text-muted-foreground">
              <th className="py-4 px-2">Date</th>
              <th className="py-4 px-2">Customer</th>
              <th className="py-4 px-2">Movie</th>
              <th className="py-4 px-2">Tickets</th>
              <th className="py-4 px-2">UTR</th>
              <th className="py-4 px-2">Amount</th>
              <th className="py-4 px-2">Status</th>
              <th className="py-4 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredBookings.map(booking => (
              <tr key={booking.id} className="label-mono text-xs hover:bg-surface-2 transition-colors">
                <td className="py-4 px-2 text-[10px]">
                  {booking.createdAt?.toDate ? booking.createdAt.toDate().toLocaleDateString() : "New"}
                </td>
                <td className="py-4 px-2">
                  <div className="font-semibold">{booking.customerName}</div>
                  <div className="text-[10px] text-muted-foreground">{booking.customerEmail}</div>
                </td>
                <td className="py-4 px-2">{booking.movieTitle}</td>
                <td className="py-4 px-2">{booking.numberOfTickets}</td>
                <td className="py-4 px-2 font-mono text-[10px] text-gold">{booking.paymentUTR}</td>
                <td className="py-4 px-2">₹{booking.totalAmount}</td>
                <td className="py-4 px-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold bg-yellow-500/20 text-yellow-500">
                    pending
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleVerify(booking)}
                      className="bg-gold text-background px-3 py-1 text-[9px] font-bold uppercase hover:bg-white transition-colors cursor-pointer"
                    >
                      Verify
                    </button>
                    <button 
                      onClick={() => handleReject(booking)}
                      className="border border-red-500 text-red-500 px-3 py-1 text-[9px] font-bold uppercase hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && (
          <div className="py-20 text-center label-mono text-muted-foreground italic border border-dashed border-border">
            No pending bookings in queue.
          </div>
        )}
      </div>
    </div>
  );
}
