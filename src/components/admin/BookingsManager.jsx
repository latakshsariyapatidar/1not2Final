import { useState, useEffect } from "react";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import emailjs from "@emailjs/browser";

// --- EmailJS Configuration ---
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_CONFIRM_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONFIRM_TEMPLATE_ID;
const EMAILJS_REJECT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_REJECT_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS with your Public Key
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}
// -----------------------------
export function BookingsManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [movieFilter, setMovieFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    const db = getDb();
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.paymentStatus === "pending" || !b.paymentStatus).length,
    revenue: bookings.reduce((acc, b) => acc + (b.paymentStatus === "verified" ? (b.totalAmount || 0) : 0), 0)
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
        to_email: booking.customerEmail,
        movie_title: booking.movieTitle,
        ticket_count: booking.numberOfTickets,
        qr_code_url: ticketQrUrl,
        total_paid: booking.totalAmount,
        utr_number: booking.paymentUTR
      };

      console.log("Attempting to send email with params:", templateParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONFIRM_TEMPLATE_ID,
        templateParams
      );

      alert(`Success! Ticket verified and confirmation email sent to ${booking.customerEmail}.`);
      fetchBookings();
    } catch (err) {
      console.error("Verification/Email failed:", err);
      alert("Verification successful, but email failed to send. Check EmailJS config.");
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
        to_email: booking.customerEmail,
        movie_title: booking.movieTitle,
        utr_number: booking.paymentUTR
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_REJECT_TEMPLATE_ID,
        templateParams
      );

      alert(`Booking rejected and cancellation email sent to ${booking.customerEmail}.`);
      fetchBookings();
    } catch (err) {
      console.error("Rejection/Email failed:", err);
      alert("Booking rejected, but email failed to send.");
    }
  };

  const uniqueMovies = [...new Set(bookings.map(b => b.movieTitle))].sort();

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filter === "all" || b.paymentStatus === filter;
    const matchesMovie = movieFilter === "all" || b.movieTitle === movieFilter;
    const searchStr = `${b.customerName} ${b.customerEmail} ${b.paymentUTR} ${b.movieTitle}`.toLowerCase();
    const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
    return matchesStatus && matchesMovie && matchesSearch;
  });

  if (loading) return <p className="label-mono animate-pulse">Loading bookings...</p>;

  return (
    <div className="space-y-8">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background border border-border p-4">
          <p className="label-mono text-[10px] text-muted-foreground uppercase">Total Bookings</p>
          <p className="font-display text-3xl">{stats.total}</p>
        </div>
        <div className="bg-background border border-border p-4">
          <p className="label-mono text-[10px] text-muted-foreground uppercase text-yellow-500">Pending Verification</p>
          <p className="font-display text-3xl text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-background border border-border p-4 border-l-gold">
          <p className="label-mono text-[10px] text-gold uppercase">Total Revenue (Verified)</p>
          <p className="font-display text-3xl text-gold">₹{stats.revenue}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="font-display text-3xl">Tickets & Bookings</h3>
        <div className="flex flex-wrap gap-4 items-center">
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
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
            className="bg-background border border-border p-2 text-xs label-mono outline-none focus:border-gold"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
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
                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                    booking.paymentStatus === 'verified' ? 'bg-green-500/20 text-green-500' : 
                    booking.paymentStatus === 'rejected' ? 'bg-red-500/20 text-red-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {booking.paymentStatus || 'pending'}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className="flex justify-end gap-2">
                    {booking.paymentStatus === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleVerify(booking)}
                          className="bg-gold text-background px-3 py-1 text-[9px] font-bold uppercase hover:bg-white transition-colors"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => handleReject(booking)}
                          className="border border-red-500 text-red-500 px-3 py-1 text-[9px] font-bold uppercase hover:bg-red-500 hover:text-white transition-all"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {booking.paymentStatus === 'verified' && (
                      <span className="text-[10px] label-mono text-green-500">Confirmed</span>
                    )}
                    {booking.paymentStatus === 'rejected' && (
                      <span className="text-[10px] label-mono text-red-500">Cancelled</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && (
          <div className="py-20 text-center label-mono text-muted-foreground italic">No bookings found.</div>
        )}
      </div>
    </div>
  );
}
