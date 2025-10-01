import React from "react";
import { useLocation } from "react-router-dom";
import PillNav from "../../outSourcedComponents/PillNav";
import logo from "../../../../public/logo.svg";

function Header() {
  const location = useLocation();

  return (
    <div className="h-fit w-[100dvw] flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 top-4 rounded-full px-4 z-50">
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Contact", href: "/contact" },
        ]}
        activeHref={location.pathname}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#2B2B2B"
        pillColor="#EAEAEA"
        hoveredPillTextColor="#EAEAEA"
        pillTextColor="#1C1C1C"
        initialLoadAnimation={false}
      />
    </div>
  );
}

export default Header;
