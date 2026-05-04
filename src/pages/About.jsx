import React from "react";

export function About() {
  return (
    <section className="scroll-mt-24 border-t border-border px-6 py-24 md:px-12 md:py-32">
      <p className="label-mono mb-8 text-center text-gold">/ 02 — Manifesto</p>
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <h2 className="font-display text-5xl leading-[1.05] tracking-tight md:text-8xl">
            We make films <span className="italic text-gold">slowly,</span> on
            purpose.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Born from the collision of timeless storytelling and cutting-edge
              vision, 1 NOT 2 Productions emerged from a simple belief: every
              story deserves to be told with uncompromising artistry.
            </p>
            <p>
              We are passionate storytellers, visual craftsmen, and dream
              architects who understand that behind every great film lies an
              even greater story waiting to be discovered, nurtured, and brought
              to life with meticulous attention to detail.
            </p>
          </div>
        </div>
        <blockquote className="border-l border-gold py-4 pl-8">
          <p className="font-display text-3xl italic leading-snug md:text-4xl">
            "Cinema is not just about capturing moments— it's about creating
            timeless experiences that resonate long after the credits roll."
          </p>
          <footer className="label-mono mt-6 text-gold">
            — Krishna Mishra, Founder
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
