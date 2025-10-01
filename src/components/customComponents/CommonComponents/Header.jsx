import React from "react";
import PillNav from "../../outSourcedComponents/PillNav";
import logo from "../../../../public/logo.svg";
import StaggeredMenu from "../../outSourcedComponents/StaggeredMenu";

function Header() {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Services", ariaLabel: "View our services", link: "/services" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  // Add custom styles for proper pointer events
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .staggered-menu-override {
        pointer-events: none !important;
      }
      .staggered-menu-override .staggered-menu-header,
      .staggered-menu-override .staggered-menu-panel {
        pointer-events: auto !important;
      }
      .staggered-menu-override .sm-prelayers {
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#EAEAEA"
        openMenuButtonColor="#1C1C1C"
        changeMenuColorOnOpen={true}
        colors={["#2B2B2B", "#5227FF", "#FF9FFC"]}
        logoUrl={logo}
        accentColor="#5227FF"
        className="staggered-menu-override"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />
    </div>
  );
}

export default Header;
