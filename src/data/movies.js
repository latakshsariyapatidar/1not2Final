import poster1 from "@/assets/poster1.jpg";
import poster2 from "@/assets/poster2.jpg";
import poster3 from "@/assets/poster3.jpg";
import poster4 from "@/assets/poster4.jpg";
// Fallback content shown when Firestore is empty / not yet configured.
export const FALLBACK_MOVIES = [
    {
        id: "the-quiet-room",
        title: "The Quiet Room",
        tagline: "Some silences scream.",
        year: 2024,
        genre: "Drama",
        director: "Aanya Verma",
        cast: ["Riya Kapoor", "Ishaan Mehra", "Naseer Ali"],
        duration: 112,
        synopsis: "A widowed translator returns to her childhood home in Kasauli to find a stranger has been living there for years. What begins as confrontation becomes an unspoken partnership shaped by grief, tea, and the long Himalayan light.",
        posterUrl: poster1,
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        ticketPrice: 250,
        featured: true,
        awards: ["MAMI 2024 — Best Film", "Busan IFF — Official Selection"],
    },
    {
        id: "between-us-the-table",
        title: "Between Us, The Table",
        tagline: "An evening that lasts a marriage.",
        year: 2023,
        genre: "Romance",
        director: "Kabir Joshi",
        cast: ["Tara Sen", "Mihir Rao"],
        duration: 96,
        synopsis: "Two strangers, one shared dinner reservation, and a night that refuses to end. Shot in a single Old Delhi haveli over six evenings.",
        posterUrl: poster2,
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        ticketPrice: 220,
        featured: true,
        awards: ["Rotterdam IFFR — Tiger Award Nominee"],
    },
    {
        id: "monsoon-on-empty-streets",
        title: "Monsoon On Empty Streets",
        tagline: "The city remembers what we forget.",
        year: 2024,
        genre: "Noir",
        director: "Devika Iyer",
        cast: ["Arjun Bose", "Sara Khan", "Vikram Sethi"],
        duration: 128,
        synopsis: "A retired Calcutta detective tracks a missing radio host through three nights of relentless rain. A meditation on memory, sound, and the cost of silence.",
        posterUrl: poster3,
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        ticketPrice: 280,
        featured: true,
        awards: ["Sundance — World Cinema Grand Jury Prize"],
    },
    {
        id: "projection",
        title: "Projection",
        tagline: "Every frame is a confession.",
        year: 2022,
        genre: "Documentary",
        director: "Aanya Verma",
        cast: ["Various"],
        duration: 84,
        synopsis: "An archival portrait of India's last single-screen cinemas, told through the projectionists who keep them alive.",
        posterUrl: poster4,
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        ticketPrice: 180,
        featured: false,
        awards: ["IDFA — Special Mention"],
    },
];
export function findMovie(id) {
    return FALLBACK_MOVIES.find((m) => m.id === id);
}
