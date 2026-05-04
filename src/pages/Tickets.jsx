import { Link } from "react-router-dom";
import { useMovies } from "@/hooks/use-movies";

export function Tickets() {
  const { movies, loading } = useMovies();

  if (loading) {
    return (
      <section className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-32 flex items-center justify-center min-h-[50vh]">
        <p className="label-mono animate-pulse text-gold">Fetching screenings...</p>
      </section>
    );
  }

  return (
    <section className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="label-mono mb-4 text-gold">/ 04 — In the cinema</p>
          <h2 className="font-display text-5xl leading-tight md:text-6xl">
            Catch a screening this week.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Limited single-screen runs across Mumbai, Delhi, Bengaluru and
            Calcutta. Tickets are held one screening at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {movies.some(m => m.booking) ? (
              <Link to="/contact" className="ghost-btn ghost-btn-gold">
                Book your seat →
              </Link>
            ) : (
              <span className="ghost-btn opacity-50 cursor-not-allowed">
                Bookings Closed
              </span>
            )}
          </div>
        </div>

        <div className="border border-border p-8 md:p-10">
          <p className="label-mono mb-5 text-gold">Now Showing</p>
          <div className="space-y-5">
            {movies.filter(m => m.booking).slice(0, 3).map((movie) => (
              <div
                key={movie.id}
                className="flex items-center justify-between gap-4 border-b border-border pb-5 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-display text-2xl">{movie.title}</p>
                  <p className="label-mono mt-1">
                    {typeof movie.duration === 'number' ? `${movie.duration} min` : movie.duration} · {movie.genre}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="label-mono text-gold">₹{movie.ticketPrice}</p>
                  <Link 
                    to={`/checkout/${movie.id}`}
                    className="ghost-btn ghost-btn-gold text-xs px-3 py-1 mt-1"
                  >
                    Buy Ticket
                  </Link>
                </div>
              </div>
            ))}
            {movies.filter(m => m.booking).length === 0 && (
              <p className="text-muted-foreground italic mt-4">No screenings currently available for booking.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

