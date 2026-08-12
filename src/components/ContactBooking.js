import { useMemo, useState } from "react";
import { CONTACT } from "../config/contact";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  product: "SolarBot Pro",
  message: "",
};

function ContactBooking() {
  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const directWhatsapp = useMemo(() => {
    return CONTACT.whatsappUrl(
      "Hi SolarBot team, I am interested in SolarBot and would like to speak with you."
    );
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitBooking = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(CONTACT.bookingApi, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          source: window.location.href,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload.message ||
            "Unable to submit booking right now."
        );
      }

      setStatus({
        type: "success",
        message: "Booking request received successfully.",
      });

      setShowSuccessModal(true);

      setForm(initialForm);
    } catch (error) {
      console.error("[BOOKING] Submission failed:", error);

      setStatus({
        type: "error",
        message:
          `${error.message} ` +
          "You can still contact us directly using WhatsApp or email.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);

    setStatus({
      type: "",
      message: "",
    });
  };

  return (
    <>
      <section
        className="section contact-section"
        id="contact"
      >
        <div className="container contact-layout">
          <div className="contact-copy reveal-left">
            <div className="tag green">
              Talk to our team
            </div>

            <h2 className="section-title">
              READY TO CLEAN YOUR SOLAR ARRAY?
            </h2>

            <p className="section-sub">
              Send a booking request, chat with us on WhatsApp,
              or email our team directly. Our team will get back
              to you as soon as possible.
            </p>

            <div className="contact-direct-actions">
              <a
                className="btn btn-sky"
                href={directWhatsapp}
                target={
                  CONTACT.whatsappNumber
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
              >
                WhatsApp us
              </a>

              <a
                className="btn btn-secondary"
                href={CONTACT.emailUrl(
                  "SolarBot enquiry",
                  "Hi SolarBot team,\n\nI would like to know more about SolarBot."
                )}
              >
                Email us
              </a>
            </div>

            {(!CONTACT.whatsappNumber || !CONTACT.email) && (
              <p className="contact-config-note">
                Contact information is not fully configured yet.
                Please update the website environment variables.
              </p>
            )}
          </div>

          <form
            className="booking-card reveal-right"
            onSubmit={submitBooking}
          >
            <div className="booking-card-head">
              <span className="booking-kicker">
                BOOK A SOLARBOT
              </span>

              <span className="booking-secure">
                Secure enquiry
              </span>
            </div>

            <div className="booking-grid">
              <label>
                Full name

                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  autoComplete="name"
                  placeholder="Your name"
                  maxLength={100}
                />
              </label>

              <label>
                Phone / WhatsApp

                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  maxLength={30}
                />
              </label>

              <label>
                Email

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={200}
                />
              </label>

              <label>
                City

                <input
                  required
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={updateField}
                  autoComplete="address-level2"
                  placeholder="Your city"
                  maxLength={100}
                />
              </label>

              <label className="booking-full">
                Product

                <select
                  name="product"
                  value={form.product}
                  onChange={updateField}
                >
                  <option value="SolarBot Lite">
                    SolarBot Lite
                  </option>

                  <option value="SolarBot Pro">
                    SolarBot Pro
                  </option>

                  <option value="SolarBot Max">
                    SolarBot Max
                  </option>

                  <option value="Commercial / custom array">
                    Commercial / custom array
                  </option>
                </select>
              </label>

              <label className="booking-full">
                Message

                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  rows={4}
                  placeholder="Tell us your panel count, site type, or preferred installation date."
                  maxLength={1000}
                />
              </label>
            </div>

            <button
              className="btn btn-primary booking-submit"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Sending..."
                : "Send booking request"}
            </button>

            {status.type === "error" && status.message && (
              <div
                className="booking-status error"
                role="alert"
              >
                {status.message}
              </div>
            )}
          </form>
        </div>

        <div
          className="contact-fab-wrap"
          aria-label="Quick contact"
        >
          <a
            className="contact-fab whatsapp"
            href={directWhatsapp}
            target={
              CONTACT.whatsappNumber
                ? "_blank"
                : undefined
            }
            rel="noreferrer"
            aria-label="Contact SolarBot on WhatsApp"
            title="WhatsApp SolarBot"
          >
            WA
          </a>

          <a
            className="contact-fab email"
            href={CONTACT.emailUrl()}
            aria-label="Email SolarBot"
            title="Email SolarBot"
          >
            @
          </a>
        </div>
      </section>

      {showSuccessModal && (
        <div
          className="booking-modal-overlay"
          role="presentation"
          onClick={closeSuccessModal}
        >
          <div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="booking-success-icon"
              aria-hidden="true"
            >
              ✓
            </div>

            <h3 id="booking-success-title">
              Booking Request Received
            </h3>

            <p>
              Thank you for contacting SolarBot.
              Your booking request has been submitted successfully.
            </p>

            <p className="booking-modal-small">
              Our team will contact you using the phone number
              or email address you provided.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={closeSuccessModal}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactBooking;