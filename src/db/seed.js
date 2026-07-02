import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { TEAM } from "../pages/helpers.jsx";

const firebaseConfig = {
    apiKey: import.meta.env?.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env?.VITE_FIREBASE_APP_ID,
};

export async function seedDatabase(customDb) {
    let db = customDb;
    if (!db) {
        const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
    
    console.log(`Starting seed of ${TEAM.length} team members...`);
    for (let i = 0; i < TEAM.length; i++) {
        const member = TEAM[i];
        const docId = member.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const docRef = doc(db, "team", docId);
        
        await setDoc(docRef, {
            name: member.name,
            role: member.role,
            bio: member.bio,
            imageUrl: member.imageUrl || "",
            featured: member.featured || false,
            order: i,
            createdAt: new Date().toISOString()
        });
        console.log(`Seeded: ${member.name} (ID: ${docId})`);
    }
    return TEAM.length;
}

// If run directly from CLI (Node environment)
if (typeof window === "undefined") {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error("Firebase config is missing from environment variables!");
        process.exit(1);
    }
    seedDatabase()
        .then((count) => {
            console.log(`Successfully seeded ${count} team members!`);
            process.exit(0);
        })
        .catch((error) => {
            console.error("Seeding failed:", error);
            process.exit(1);
        });
}
