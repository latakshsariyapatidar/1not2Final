import { useEffect, useState } from "react";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { TEAM } from "@/pages/helpers";

function normalizeTeamMember(id, data) {
    const name = typeof data.name === "string" ? data.name : "";
    if (!name.trim()) return null;

    return {
        id,
        name: name.trim(),
        role: typeof data.role === "string" ? data.role : "",
        bio: typeof data.bio === "string" ? data.bio : "",
        imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : "",
        featured: data.featured === true || data.featured === "true",
        order: typeof data.order === "number" ? data.order : 999,
        createdAt: data.createdAt || ""
    };
}

export function useTeam() {
    const [team, setTeam] = useState(TEAM);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function run() {
            if (!isFirebaseConfigured()) return;
            const db = getDb();
            if (!db) return;
            
            setLoading(true);
            try {
                const snap = await getDocs(collection(db, "team"));
                const fromDb = snap.docs
                    .map((d) => normalizeTeamMember(d.id, d.data()))
                    .filter((m) => Boolean(m));
                
                if (!cancelled && fromDb.length) {
                    fromDb.sort((a, b) => a.order - b.order);
                    setTeam(fromDb);
                }
            } catch (err) {
                console.error("Failed to load team from Firestore, using fallback", err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, []);

    return { team, loading };
}
