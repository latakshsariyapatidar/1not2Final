import { useState, useEffect } from "react";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export function MoviesManager() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Cloudinary Settings (User should update these in .env)
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your_cloud_name";
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "your_preset";

  const fetchMovies = async () => {
    setLoading(true);
    const db = getDb();
    const snap = await getDocs(collection(db, "movies"));
    setMovies(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setEditingMovie({ ...editingMovie, [field]: data.secure_url });
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check Cloudinary settings.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const db = getDb();
    const movieData = { ...editingMovie };
    const id = movieData.id;
    delete movieData.id;

    try {
      if (id) {
        await updateDoc(doc(db, "movies", id), movieData);
      } else {
        await addDoc(collection(db, "movies"), movieData);
      }
      setEditingMovie(null);
      fetchMovies();
    } catch (err) {
      console.error("Error saving movie:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    const db = getDb();
    await deleteDoc(doc(db, "movies", id));
    fetchMovies();
  };

  if (loading) return <p className="label-mono animate-pulse">Loading movies...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-3xl">Manage Movies</h3>
        <button 
          onClick={() => setEditingMovie({ 
            title: "", year: new Date().getFullYear(), genre: "Film", 
            duration: "90 min", ticketPrice: 200, featured: false, booking: true 
          })}
          className="ghost-btn ghost-btn-gold py-2 px-4 text-xs"
        >
          + Add New Movie
        </button>
      </div>

      {editingMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
          <form onSubmit={handleSave} className="bg-surface border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <h4 className="font-display text-2xl">{editingMovie.id ? "Edit Movie" : "New Movie"}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Title</label>
                <input 
                  type="text" required value={editingMovie.title} 
                  onChange={e => setEditingMovie({...editingMovie, title: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Year</label>
                <input 
                  type="text" value={editingMovie.year} 
                  onChange={e => setEditingMovie({...editingMovie, year: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Genre</label>
                <input 
                  type="text" value={editingMovie.genre} 
                  onChange={e => setEditingMovie({...editingMovie, genre: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Duration</label>
                <input 
                  type="text" value={editingMovie.duration} 
                  onChange={e => setEditingMovie({...editingMovie, duration: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Ticket Price (₹)</label>
                <input 
                  type="number" value={editingMovie.ticketPrice} 
                  onChange={e => setEditingMovie({...editingMovie, ticketPrice: parseInt(e.target.value)})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Movie URL</label>
                <input 
                  type="text" value={editingMovie.movieUrl || ""} 
                  onChange={e => setEditingMovie({...editingMovie, movieUrl: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Trailer URL</label>
                <input 
                  type="text" value={editingMovie.trailerUrl || ""} 
                  onChange={e => setEditingMovie({...editingMovie, trailerUrl: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-mono text-xs text-muted-foreground">Poster Image</label>
              <div className="flex items-center gap-4">
                {editingMovie.posterUrl && <img src={editingMovie.posterUrl} className="w-16 h-24 object-cover border border-border" alt="Preview" />}
                <input 
                  type="file" 
                  onChange={e => handleFileUpload(e, "posterUrl")}
                  className="text-xs label-mono file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-surface-2 file:text-gold hover:file:bg-gold hover:file:text-background"
                />
                {isUploading && <span className="label-mono text-[10px] animate-pulse">Uploading...</span>}
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 label-mono text-sm">
                <input type="checkbox" checked={editingMovie.featured} onChange={e => setEditingMovie({...editingMovie, featured: e.target.checked})} />
                Featured
              </label>
              <label className="flex items-center gap-2 label-mono text-sm">
                <input type="checkbox" checked={editingMovie.booking} onChange={e => setEditingMovie({...editingMovie, booking: e.target.checked})} />
                Booking Open
              </label>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <button type="submit" className="ghost-btn ghost-btn-gold py-3 px-8 flex-1">Save Movie</button>
              <button type="button" onClick={() => setEditingMovie(null)} className="ghost-btn py-3 px-8 flex-1">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="bg-background border border-border overflow-hidden flex flex-col">
            <div className="aspect-video bg-surface overflow-hidden relative">
              {movie.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground label-mono text-xs">No Poster</div>
              )}
              {movie.featured && <span className="absolute top-2 right-2 bg-gold text-background px-2 py-1 text-[10px] label-mono uppercase">Featured</span>}
            </div>
            <div className="p-4 flex-1">
              <h4 className="font-display text-xl mb-1">{movie.title}</h4>
              <p className="label-mono text-[10px] text-muted-foreground mb-4">{movie.year} · {movie.genre}</p>
              <div className="flex gap-2">
                <button onClick={() => setEditingMovie(movie)} className="text-[10px] label-mono hover:text-gold uppercase tracking-widest">Edit</button>
                <button onClick={() => handleDelete(movie.id)} className="text-[10px] label-mono hover:text-red-500 uppercase tracking-widest">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
