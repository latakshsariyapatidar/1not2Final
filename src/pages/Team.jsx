import { TEAM, PortraitCard } from "./helpers";

export function Team() {
  const founder = TEAM.find((member) => member.featured) ?? TEAM[0];
  const rest = TEAM.filter((member) => member !== founder);

  return (
    <section className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-32">
      <p className="label-mono mb-4 text-gold">/ 03 — The studio</p>
      <h2 className="font-display text-5xl leading-[0.95] tracking-tighter md:text-8xl">
        Team.
      </h2>

      <div className="mt-16 grid gap-10 border-t border-border pt-16 md:grid-cols-[1.2fr_1fr] md:items-end">
        <PortraitCard member={founder} large={false} />
        <div>
          <p className="label-mono text-gold">Founder</p>
          <h3 className="font-display mt-3 text-5xl md:text-6xl">
            {founder.name}
          </h3>
          <p className="label-mono mt-4">{founder.role}</p>
          <p className="mt-6 max-w-md leading-relaxed text-foreground/80">
            {founder.bio}
          </p>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
        {rest.map((member) => (
          <PortraitCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}

