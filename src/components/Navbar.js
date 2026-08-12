import React from "react";
import { CONTACT } from "../config/contact";

function Navbar() {
  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <a className="logo" href="#hero" aria-label="SolarBot home">
          <span className="logo-icon">☀</span>
          Solar<span>Bot</span>
        </a>

        <div className="nav-links-simple">
          <a href="#product">Product</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>

        <a
          className="btn btn-primary btn-sm nav-contact"
          href={CONTACT.whatsappUrl("Hi SolarBot team, I would like to speak with you about SolarBot.")}
          target={CONTACT.whatsappNumber ? "_blank" : undefined}
          rel="noreferrer"
        >
          WhatsApp us
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
