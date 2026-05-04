import { useState, useEffect } from "react";
import { getDb } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, query, orderBy, deleteDoc } from "firebase/firestore";

export function ContactsManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const db = getDb();
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    const db = getDb();
    await deleteDoc(doc(db, "contacts", id));
    fetchMessages();
  };

  if (loading) return <p className="label-mono animate-pulse">Loading messages...</p>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-3xl">Inquiries & Messages</h3>
        <p className="label-mono text-xs text-gold">{messages.length} Total</p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-background border border-border p-6 hover:border-gold/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-display text-xl">{msg.name}</h4>
                <p className="label-mono text-[10px] text-gold">{msg.email}</p>
              </div>
              <div className="text-right">
                <p className="label-mono text-[9px] text-muted-foreground">
                  {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : "New"}
                </p>
                <span className="inline-block px-2 py-0.5 mt-2 bg-surface text-gold border border-border text-[9px] label-mono uppercase">
                  {msg.subject}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap mb-6">
              {msg.message}
            </p>

            <div className="flex gap-4 pt-4 border-t border-border/30">
              <a 
                href={`mailto:${msg.email}?subject=RE: ${msg.subject}`}
                className="text-[10px] label-mono hover:text-gold uppercase tracking-widest"
              >
                Reply via Email
              </a>
              <button 
                onClick={() => handleDelete(msg.id)}
                className="text-[10px] label-mono hover:text-red-500 uppercase tracking-widest"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-20 text-center label-mono text-muted-foreground italic border border-dashed border-border">
            No inquiries yet.
          </div>
        )}
      </div>
    </div>
  );
}
