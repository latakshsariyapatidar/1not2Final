export const TEAM = [
  {
    name: "Krishna Mishra",
    role: "Founder · CEO · Actor",
    bio: "Founder of 1not2 Productions — blending performance, vision, and storytelling into one frame.",
    imageUrl: "https://res.cloudinary.com/db69ffwwa/image/upload/v1777897504/krishnaw_kobq81.jpg",
    featured: true,
  },
  {
    name: "Sahil Suman",
    role: "Cinematographer · Director",
    bio: "Crafts stories with cinematic precision and emotional depth, shaping visuals that linger.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897507/sahil_gqyktc.jpg"
  },
  {
    name: "Shashank",
    role: "Director",
    bio: "Leads narratives with a sharp creative instinct and a bold, uncompromising vision.",
    imageUrl: "https://res.cloudinary.com/db69ffwwa/image/upload/v1777897506/shashank_ihuzq4.jpg"
  },
  {
    name: "Vedant Ghodke",
    role: "Creative Head",
    bio: "Designs the soul of every visual — turning abstract ideas into striking realities.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897506/VedantGhodke_tc7kkt.jpg"
  },
  {
    name: "SILAS",
    role: "Cinematographer · Camerahandler",
    bio: "Transforms raw moments into powerful imagery through a deeply intuitive lens.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897506/Silus_mbpoda.jpg"
  },
  {
    name: "Penumaka Ricky Charan",
    role: "Assistant Cinematographer",
    bio: "Supports every frame with precision, rhythm, and an instinct for visual storytelling.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897504/ricky_vjso3w.jpg"
  },
  {
    name: "Rushikesh Deshmukh",
    role: "Music Director",
    bio: "Composes soundscapes that elevate emotion and bring depth to every narrative.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897506/rushikesh_znbcnx.jpg"
  },
  {
    name: "Ayush Raj",
    role: "Editor",
    bio: "Weaves footage into compelling stories with seamless cuts and emotional clarity.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897504/aayush_xahjet.jpg"
  },
  {
    name: "Lataksh Sariya",
    role: "Web Developer",
    bio: "Builds and maintains the digital face of the studio.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897504/Lataksh_bwl1vt.jpg"
  },
  {
    name: "Ashmit Singh",
    role: "Writer",
    bio: "Shapes ideas into words that resonate, provoke, and stay with the audience.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897505/Ashmit_e3wju3.jpg"
  },
  {
    name: "Sujal",
    role: "Assistant Director",
    bio: "Bridges vision and execution, ensuring every creative detail comes alive on set.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897506/sujal_bpdqpq.jpg"
  },
  {
    name: "Apratim Das",
    role: "Video Editor",
    bio: "Refines visuals with precision, crafting narratives that flow with rhythm and impact.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897505/apartim_e3xsx1.jpg"
  },
  {
    name: "Samit",
    role: "Crew",
    bio: "Keeps the production grounded while ensuring everything runs smoothly behind the scenes.",
    imageUrl:"https://res.cloudinary.com/db69ffwwa/image/upload/v1777897505/samit_mycdn7.jpg"
  },

];

export function PortraitCard({ member, large = false }) {
  return (
    <div className="group">
      <div
        className={`relative overflow-hidden bg-surface-2 ${large ? "aspect-4/5" : "aspect-square"
          }`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-surface-2 via-surface to-background grayscale transition-all duration-1000 group-hover:grayscale-0">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display text-7xl text-foreground/30 transition-colors duration-1000 group-hover:text-gold">
              {initials(member.name)}
            </span>
          )}
        </div>
        <div className="absolute inset-0 mix-blend-overlay transition-colors duration-700 group-hover:bg-gold/10" />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-linear-to-t from-background via-background/80 to-transparent p-5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm leading-relaxed text-foreground/85">
            {member.bio}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="font-display text-xl">{member.name}</p>
        <p className="label-mono mt-1">{member.role}</p>
      </div>
    </div>
  );
}

export function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function InfoBlock({ label, children }) {
  return (
    <div className="border-t border-border pt-5">
      <p className="label-mono mb-3 text-gold">{label}</p>
      <div className="text-foreground/85">{children}</div>
    </div>
  );
}

export const fieldClass =
  "w-full border border-border bg-transparent px-4 py-3 outline-none focus:border-gold";

