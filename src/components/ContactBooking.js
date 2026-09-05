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
      let response;

      try {
        response = await fetch(CONTACT.bookingApi, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...form,
            source: window.location.href,
          }),
        });
      } catch (networkError) {
        // fetch() itself threw — the endpoint is unreachable
        // (e.g. testing with `npm start` instead of `netlify dev`,
        // or the site isn't actually deployed on Netlify).
        throw new Error(
          "Couldn't reach the booking service. If you're testing locally, " +
          "run this with `netlify dev` (not `npm start`) so the /.netlify/functions " +
          "endpoint is available, or test on the live Netlify deployment."
        );
      }

      const contentType = response.headers.get("content-type") || "";
      const looksLikeJson = contentType.includes("application/json");

      const payload = looksLikeJson
        ? await response.json().catch(() => ({}))
        : {};

      if (!response.ok) {
        if (!looksLikeJson) {
          // Got an HTML/error page back instead of a JSON response —
          // almost always means the function itself isn't deployed/reachable.
          throw new Error(
            `Booking service returned an unexpected response (HTTP ${response.status}). ` +
            "The Netlify function may not be deployed, or its environment " +
            "variables aren't configured yet."
          );
        }

        throw new Error(
          payload.message ||
            `Unable to submit booking right now (HTTP ${response.status}).`
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
            <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
              <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.905 6.478L4 29l7.72-1.86A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.9a9.86 9.86 0 0 1-5.03-1.376l-.361-.214-4.583 1.104 1.225-4.465-.236-.375A9.86 9.86 0 1 1 25.86 15c0 5.463-4.427 9.9-9.856 9.9Zm5.42-7.406c-.297-.149-1.758-.868-2.03-.967-.273-.099-.472-.149-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.254-.462-2.389-1.474-.883-.788-1.48-1.761-1.653-2.058-.173-.298-.018-.459.13-.607.134-.133.298-.347.446-.52.15-.174.198-.298.297-.497.099-.198.05-.372-.025-.52-.074-.15-.67-1.615-.918-2.212-.242-.581-.487-.503-.67-.512l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.017-1.04 2.479s1.065 2.875 1.213 3.073c.149.198 2.096 3.2 5.078 4.489.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.174-1.413-.074-.124-.273-.198-.57-.347Z"/>
            </svg>
          </a>

          <a
            className="contact-fab email"
            href={CONTACT.emailUrl()}
            aria-label="Email SolarBot"
            title="Email SolarBot"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5"></rect>
              <path d="m3.5 6 8.5 6.5L20.5 6"></path>
            </svg>
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