import { Link } from "react-router-dom";
import { useMovies } from "@/hooks/use-movies";

export function Works() {
  const { movies, loading } = useMovies();

  if (loading) {
    return (
      <section className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32 flex items-center justify-center min-h-[50vh]">
        <p className="label-mono animate-pulse text-gold">Loading works...</p>
      </section>
    );
  }

  return (
    <section className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-mono mb-3 text-gold">/ 01 — Selected Works</p>
          <h2 className="font-display text-5xl md:text-7xl">
            Currently in projection.
          </h2>
        </div>
        <Link to="/contact" className="label-mono hover:text-gold">
          Enquire about screenings →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {movies.map((movie, index) => (
          <article
            key={movie.id}
            className="group relative block aspect-2/3 overflow-hidden bg-surface"
          >
            <img
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 transition-all duration-700 group-hover:translate-y-0 group-hover:bg-background/80 group-hover:backdrop-blur-sm">
              <p className="label-mono mb-2 text-gold">
                {String(index + 1).padStart(2, '0')} · {movie.year} · {movie.genre}
              </p>
              <h3 className="font-display text-2xl leading-tight mb-4">
                {movie.title}
              </h3>
              
              <div className="flex flex-col gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {movie.trailerUrl && (
                  <a 
                    href={movie.trailerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-center py-2 text-xs label-mono border border-gold text-gold hover:bg-gold hover:text-background transition-colors"
                  >
                    Watch Trailer
                  </a>
                )}
                {movie.movieUrl && (
                  <a 
                    href={movie.movieUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-center py-2 text-xs label-mono bg-gold text-background hover:bg-white transition-colors"
                  >
                    Watch Movie
                  </a>
                )}
                {!movie.movieUrl && !movie.trailerUrl && (
                  <p className="text-[10px] label-mono text-muted-foreground italic">Links coming soon</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No works found in the collection.</p>
        </div>
      )}
    </section>
  );
}

