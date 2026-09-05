import { useEffect, useState } from "react";
import { CONTACT } from "../config/contact";
import useTheme from "../hooks/useTheme";

const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ auth, onOpenAuth, onOpenDashboard }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Close the mobile menu automatically if the viewport grows back to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <a className="logo" href="#hero" aria-label="SolarBot home" onClick={closeMenu}>
          <span className="logo-icon">☀</span>
          Solar<span>Bot</span>
        </a>

        <div className="nav-links-simple">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 4.5a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1.5a1 1 0 0 1-1 1Zm0 17a1 1 0 0 1-1-1V19a1 1 0 1 1 2 0v1.5a1 1 0 0 1-1 1ZM4.5 13H3a1 1 0 1 1 0-2h1.5a1 1 0 1 1 0 2Zm17 0H20a1 1 0 1 1 0-2h1.5a1 1 0 1 1 0 2ZM6.34 7.76a1 1 0 0 1-.71-.29L4.57 6.4a1 1 0 1 1 1.42-1.42l1.06 1.07a1 1 0 0 1-.71 1.71Zm12.02 12.02a1 1 0 0 1-.71-.3l-1.06-1.06a1 1 0 1 1 1.41-1.42l1.07 1.06a1 1 0 0 1-.71 1.72ZM5.28 19.78a1 1 0 0 1-.71-1.71l1.06-1.07a1 1 0 1 1 1.42 1.42l-1.06 1.06a1 1 0 0 1-.71.3Zm12.72-12.72a1 1 0 0 1-.71-1.71l1.06-1.07a1 1 0 1 1 1.42 1.42l-1.06 1.06a1 1 0 0 1-.71.3ZM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.273c-4.464 0-8.08-3.616-8.08-8.08 0-1.077.209-2.104.588-3.045a1 1 0 0 0-1.271-1.313A10.083 10.083 0 0 0 2 10.917C2 16.487 6.513 21 12.083 21a10.083 10.083 0 0 0 9.972-8.657 1 1 0 0 0-1.313-1.298Z"/>
              </svg>
            )}
          </button>

          <div className="login-register-wrap">
            <button
              type="button"
              className="btn btn-ghost btn-sm nav-login"
              onClick={() => {
                closeMenu();
                if (auth.isLoggedIn) {
                  onOpenDashboard();
                } else {
                  onOpenAuth();
                }
              }}
            >
              {auth.isLoggedIn ? "Dashboard" : "Login / Register"}
            </button>
          </div>

          <a
            className="btn btn-primary btn-sm nav-contact"
            href={CONTACT.whatsappUrl("Hi SolarBot team, I would like to speak with you about SolarBot.")}
            target={CONTACT.whatsappNumber ? "_blank" : undefined}
            rel="noreferrer"
          >
            WhatsApp us
          </a>

          <button
            type="button"
            className={`nav-burger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-menu"
        className={`mobile-nav-menu${menuOpen ? " open" : ""}`}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <button
          type="button"
          className="mobile-nav-account-link"
          onClick={() => {
            closeMenu();
            if (auth.isLoggedIn) {
              onOpenDashboard();
            } else {
              onOpenAuth();
            }
          }}
        >
          {auth.isLoggedIn ? "Dashboard" : "Login / Register"}
        </button>
        <a
          className="btn btn-primary mobile-nav-cta"
          href={CONTACT.whatsappUrl("Hi SolarBot team, I would like to speak with you about SolarBot.")}
          target={CONTACT.whatsappNumber ? "_blank" : undefined}
          rel="noreferrer"
          onClick={closeMenu}
        >
          WhatsApp us
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
