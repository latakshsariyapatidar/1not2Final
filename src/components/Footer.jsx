import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="grid grid-cols-1 gap-12 px-6 py-16 md:grid-cols-4 md:px-12">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl">
            OneNotTwo Productions
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
           Making every story - The Story
          </p>
        </div>
        <div>
          <p className="label-mono mb-5">Navigate</p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/works" className="transition-colors hover:text-gold">
                Works
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-gold">
                About
              </Link>
            </li>
            <li>
              <Link to="/team" className="transition-colors hover:text-gold">
                Team
              </Link>
            </li>
            <li>
              <Link to="/tickets" className="transition-colors hover:text-gold">
                Tickets
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-mono mb-5">Elsewhere</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://www.instagram.com/1not2production/" className="transition-colors hover:text-gold">
                Instagram
              </a>
            </li>
            <li>
              <a
                href="mailto:onenot2production@gmail.com"
                className="transition-colors hover:text-gold"
              >
                onenot2production@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-border px-6 py-6 md:flex-row md:px-12">
        <p className="label-mono">
          © {new Date().getFullYear()} OneNotTwo Productions
        </p>
      </div>
    </footer>
  );
}

