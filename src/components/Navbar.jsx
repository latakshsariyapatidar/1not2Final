import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/tickets", label: "Tickets" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/60 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="font-display text-2xl leading-none tracking-tight">
            OneNotTwo Productions
          </span>
        </NavLink>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `label-mono transition-colors ${
                  isActive ? "text-gold" : "hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-5 px-6 py-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `label-mono ${isActive ? "text-gold" : ""}`
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

