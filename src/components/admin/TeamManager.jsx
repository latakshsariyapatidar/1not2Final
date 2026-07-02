import { useState, useEffect } from "react";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { seedDatabase } from "@/db/seed";

export function TeamManager() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Cloudinary Settings
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "db69ffwwa";
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "1not2production";

  const fetchTeam = async () => {
    setLoading(true);
    const db = getDb();
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const snap = await getDocs(collection(db, "team"));
      const members = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      members.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      setTeam(members);
    } catch (err) {
      console.error("Error fetching team:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleFileUpload = async (e) => {
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
        setEditingMember({ ...editingMember, imageUrl: data.secure_url });
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
    if (!db) return;

    const memberData = { ...editingMember };
    const id = memberData.id;
    delete memberData.id;

    try {
      if (id) {
        await updateDoc(doc(db, "team", id), memberData);
      } else {
        // Create an ID from the name if possible
        const docId = memberData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        await setDoc(doc(db, "team", docId), {
          ...memberData,
          createdAt: new Date().toISOString()
        });
      }
      setEditingMember(null);
      fetchTeam();
    } catch (err) {
      console.error("Error saving team member:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    const db = getDb();
    if (!db) return;
    try {
      await deleteDoc(doc(db, "team", id));
      fetchTeam();
    } catch (err) {
      console.error("Error deleting team member:", err);
    }
  };

  const handleSeed = async () => {
    if (!confirm("This will seed the default team members into the database. Existing ones with the same names will be updated. Proceed?")) return;
    setIsSeeding(true);
    const db = getDb();
    try {
      const count = await seedDatabase(db);
      alert(`Successfully seeded ${count} team members!`);
      fetchTeam();
    } catch (err) {
      console.error("Seeding failed:", err);
      alert(`Seeding failed: ${err.message}`);
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) return <p className="label-mono animate-pulse">Loading team members...</p>;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="font-display text-3xl">Manage Team</h3>
          <p className="label-mono text-xs text-muted-foreground mt-1">Add, edit, or remove production crew members.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSeed}
            disabled={isSeeding}
            className="text-xs label-mono border border-gold/30 hover:border-gold hover:text-gold py-2 px-4 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isSeeding ? "Seeding..." : "⚡ Seed Default Team"}
          </button>
          <button 
            onClick={() => setEditingMember({ 
              name: "", role: "", bio: "", 
              imageUrl: "", featured: false, order: team.length 
            })}
            className="ghost-btn ghost-btn-gold py-2 px-4 text-xs"
          >
            + Add Team Member
          </button>
        </div>
      </div>

      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
          <form onSubmit={handleSave} className="bg-surface border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <h4 className="font-display text-2xl">{editingMember.id ? "Edit Team Member" : "New Team Member"}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Full Name</label>
                <input 
                  type="text" required value={editingMember.name} 
                  onChange={e => setEditingMember({...editingMember, name: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Role / Designation</label>
                <input 
                  type="text" required value={editingMember.role} 
                  onChange={e => setEditingMember({...editingMember, role: e.target.value})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="label-mono text-xs text-muted-foreground">Display Order (Lower = First)</label>
                <input 
                  type="number" value={editingMember.order} 
                  onChange={e => setEditingMember({...editingMember, order: parseInt(e.target.value) || 0})}
                  className="w-full bg-background border border-border p-2 focus:border-gold outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-mono text-xs text-muted-foreground">Short Bio</label>
              <textarea 
                rows={3} required value={editingMember.bio} 
                onChange={e => setEditingMember({...editingMember, bio: e.target.value})}
                className="w-full bg-background border border-border p-2 focus:border-gold outline-none text-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="label-mono text-xs text-muted-foreground">Portrait Photo</label>
              <div className="flex items-center gap-4">
                {editingMember.imageUrl && (
                  <img src={editingMember.imageUrl} className="w-16 h-16 object-cover border border-border rounded-none" alt="Preview" />
                )}
                <div className="space-y-1">
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    className="text-xs label-mono file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-surface-2 file:text-gold hover:file:bg-gold hover:file:text-background cursor-pointer"
                  />
                  <p className="text-[10px] text-muted-foreground">Upload via Cloudinary, or paste URL directly below.</p>
                </div>
                {isUploading && <span className="label-mono text-[10px] animate-pulse">Uploading...</span>}
              </div>
              <input 
                type="text" placeholder="https://..." value={editingMember.imageUrl} 
                onChange={e => setEditingMember({...editingMember, imageUrl: e.target.value})}
                className="w-full bg-background border border-border p-2 focus:border-gold outline-none text-xs mt-2"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 label-mono text-sm cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={editingMember.featured} 
                  onChange={e => setEditingMember({...editingMember, featured: e.target.checked})} 
                />
                Featured Member (e.g. Founder)
              </label>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <button type="submit" className="ghost-btn ghost-btn-gold py-3 px-8 flex-1">Save Member</button>
              <button type="button" onClick={() => setEditingMember(null)} className="ghost-btn py-3 px-8 flex-1">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {team.length === 0 ? (
        <div className="py-20 text-center label-mono text-muted-foreground italic border border-dashed border-border">
          No team members in database. Click "Seed Default Team" to import initial team.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
            <div key={member.id} className="bg-background border border-border overflow-hidden flex flex-col hover:border-gold/30 transition-colors">
              <div className="aspect-square bg-surface overflow-hidden relative">
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground label-mono text-xs">No Photo</div>
                )}
                {member.featured && <span className="absolute top-2 right-2 bg-gold text-background px-2 py-1 text-[10px] label-mono uppercase">Featured</span>}
                <span className="absolute bottom-2 left-2 bg-background/80 text-foreground px-2 py-1 text-[9px] label-mono">Order: {member.order}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display text-xl mb-1">{member.name}</h4>
                  <p className="label-mono text-[10px] text-gold mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{member.bio}</p>
                </div>
                <div className="flex gap-3 pt-2 border-t border-border/40">
                  <button onClick={() => setEditingMember(member)} className="text-[10px] label-mono hover:text-gold uppercase tracking-widest">Edit</button>
                  <button onClick={() => handleDelete(member.id)} className="text-[10px] label-mono hover:text-red-500 uppercase tracking-widest">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
