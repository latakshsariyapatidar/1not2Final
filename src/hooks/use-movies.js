import { useEffect, useMemo, useState } from "react";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
function toNumber(v) {
    if (typeof v === "number" && Number.isFinite(v))
        return v;
    if (typeof v === "string" && v.trim() && Number.isFinite(Number(v)))
        return Number(v);
    return null;
}
function normalizeMovie(id, data) {
    const title = typeof data.title === "string" ? data.title : "";
    if (!title.trim())
        return null;
    const year = toNumber(data.year) ?? new Date().getFullYear();
    
    // Support "1h", "90min" etc if it's a string, otherwise try toNumber
    let duration = data.duration;
    if (typeof duration !== "string" && typeof duration !== "number") {
        duration = data.runtime;
    }
    
    const ticketPrice = toNumber(data.ticketPrice) ?? 0;
    const posterUrl = typeof data.posterUrl === "string" ? data.posterUrl : "";
    
    return {
        id,
        title: title.trim(),
        tagline: typeof data.tagline === "string" ? data.tagline : "",
        year: typeof year === 'number' ? Math.floor(year) : year,
        genre: typeof data.genre === "string" ? data.genre : "Film",
        director: typeof data.director === "string" ? data.director : "",
        cast: Array.isArray(data.cast) ? data.cast.filter((x) => typeof x === "string") : [],
        duration: duration || "N/A",
        synopsis: typeof data.synopsis === "string" ? data.synopsis : "",
        posterUrl,
        movieUrl: typeof data.movieUrl === "string" ? data.movieUrl : "",
        trailerUrl: typeof data.trailerUrl === "string" ? data.trailerUrl : "",
        ticketPrice,
        featured: data.featured === true || data.featured === "true",
        booking: data.booking === true || data.booking === "true",
        awards: Array.isArray(data.awards) ? data.awards.filter((x) => typeof x === "string") : [],
    };
}
export function useMovies(options = {}) {
    const { firestoreOnly = true } = options;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let cancelled = false;
        async function run() {
            if (!isFirebaseConfigured())
                return;
            const db = getDb();
            if (!db)
                return;
            setLoading(true);
            try {
                const snap = await getDocs(collection(db, "movies"));
                const fromDb = snap.docs
                    .map((d) => normalizeMovie(d.id, d.data()))
                    .filter((m) => Boolean(m));
                if (!cancelled && fromDb.length) {
                    fromDb.sort((a, b) => (b.year - a.year) || a.title.localeCompare(b.title));
                    setMovies(fromDb);
                }
            }
            catch {
                // ignore — fallback data remains
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, []);
    const byId = useMemo(() => new Map(movies.map((m) => [m.id, m])), [movies]);
    return { movies, byId, loading };
}
