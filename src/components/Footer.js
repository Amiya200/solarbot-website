import { CONTACT } from "../config/contact";
import ezybuddiesLogo from "../assets/ezybuddies-logo.jpg";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">

        <div className="footer-brand">
          <div className="logo footer-logo">
            <span className="logo-icon">☀</span>
            Solar<span>Bot</span>
          </div>
          <p className="footer-tagline">
            Automatic dry &amp; low-water solar panel cleaning —
            built in India, for Indian rooftops.
          </p>

          <div className="footer-powered-by">
            <span>Powered by</span>
            <img
              src={ezybuddiesLogo}
              alt="ezybuddies — Connecting Ideas, Automating Solutions, Empowering Futures"
              className="footer-ezybuddies-logo"
            />
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Product</div>
          <a href="#product">How it works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#comparison">Comparison</a>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <a href="#contact">Contact us</a>
          <a href={CONTACT.whatsappUrl()} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={CONTACT.emailUrl()}>Email us</a>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Get in touch</div>
          {CONTACT.email && (
            <span className="footer-static-line">{CONTACT.email}</span>
          )}
          {CONTACT.whatsappNumber && (
            <span className="footer-static-line">
              +{CONTACT.whatsappNumber}
            </span>
          )}
          <span className="footer-static-line">Delhi NCR, India</span>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} SolarBot. All rights reserved.</span>
          <span>An ezybuddies product</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
