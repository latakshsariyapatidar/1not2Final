import { Link } from "react-router-dom";
import heroImg from "@/assets/hero.jpg";

export function Home() {
  return (
    <section className="relative h-screen overflow-hidden grain scroll-mt-24">
      <img
        src={heroImg}
        alt="A figure stands silhouetted in a beam of warm golden cinematic light"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/20 to-background" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
        <div className="mb-6 flex items-center gap-4">
          <span className="rule" />
          <span className="label-mono">Independent Film Production</span>
        </div>
        <h1 className="font-display max-w-6xl text-[14vw] leading-[0.9] tracking-tighter md:text-[10vw]">
          OneNotTwo Productions
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80">
          Making every story-The Story
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link to="/works" className="ghost-btn ghost-btn-gold">
            View our works →
          </Link>
          <Link to="/tickets" className="ghost-btn">
            Buy tickets
          </Link>
        </div>
      </div>
    </section>
  );
}

