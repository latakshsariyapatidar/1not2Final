import { useState, useEffect } from "react";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export function RejectedBookingsManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieFilter, setMovieFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

      // Filter strictly for rejected bookings
      const rejectedBookings = allBookings.filter(b => b.paymentStatus === "rejected");
      setBookings(rejectedBookings);
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
    rejectedCount: bookings.length,
    ticketsRejected: bookings.reduce((acc, b) => acc + (b.numberOfTickets || 0), 0)
  };

  const uniqueMovies = [...new Set(bookings.map(b => b.movieTitle))].sort();

  const filteredBookings = bookings.filter(b => {
    const matchesMovie = movieFilter === "all" || b.movieTitle === movieFilter;
    const searchStr = `${b.customerName} ${b.customerEmail} ${b.paymentUTR} ${b.movieTitle}`.toLowerCase();
    const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
    return matchesMovie && matchesSearch;
  });

  if (loading) return <p className="label-mono animate-pulse">Loading rejected bookings...</p>;

  return (
    <div className="space-y-8">
      {/* Stats Dashboard - STRICTLY NO REVENUE STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-background border border-border p-4 border-l-red-500">
          <p className="label-mono text-[10px] text-red-500 uppercase">Rejected Bookings</p>
          <p className="font-display text-3xl text-red-500">{stats.rejectedCount}</p>
        </div>
        <div className="bg-background border border-border p-4">
          <p className="label-mono text-[10px] text-muted-foreground uppercase">Unfulfilled Tickets</p>
          <p className="font-display text-3xl">{stats.ticketsRejected}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="font-display text-3xl">Rejected Bookings</h3>
          <p className="label-mono text-xs text-muted-foreground mt-1">Bookings that failed payment verification or were cancelled.</p>
        </div>
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
              <th className="py-4 px-2 text-right">Status</th>
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
                <td className="py-4 px-2 text-right">
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold bg-red-500/20 text-red-500">
                    rejected
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && (
          <div className="py-20 text-center label-mono text-muted-foreground italic border border-dashed border-border">
            No rejected bookings found.
          </div>
        )}
      </div>
    </div>
  );
}
