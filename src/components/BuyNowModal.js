import { useState } from "react";
import { startCheckout } from "../lib/razorpay";
import { CONTACT } from "../config/contact";

const PRICES_INR = {
  "SolarBot Semi": 14000,
  "SolarBot Full": 25000,
  "Cleaning Service": 500,
};

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
};

function BuyNowModal({ productName, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [stage, setStage] = useState("form"); // "form" | "processing" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const price = PRICES_INR[productName] || 0;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStage("processing");
    setErrorMessage("");

    startCheckout(
      { productName, ...form },
      {
        onSuccess: () => setStage("success"),
        onFailure: (error) => {
          setErrorMessage(error.message || "Something went wrong.");
          setStage("error");
        },
        onDismiss: () => setStage("form"),
      }
    );
  };

  return (
    <div className="booking-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="booking-modal auth-modal buy-now-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="auth-modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        {stage === "success" ? (
          <>
            <div className="booking-success-icon" aria-hidden="true">✓</div>
            <h3>Payment successful</h3>
            <p>
              Thanks, {form.name || "there"}! Your order for{" "}
              <strong>{productName}</strong> is confirmed. Our team has
              been notified and will reach out to arrange delivery/installation.
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </>
        ) : (
          <>
            <h3>Buy {productName}</h3>
            <p className="booking-modal-small">
              ₹{price.toLocaleString("en-IN")} · secure payment via Razorpay
            </p>

            {stage === "error" && (
              <div className="auth-error">
                {errorMessage}
                <br />
                You can also{" "}
                <a
                  href={CONTACT.whatsappUrl(
                    `Hi SolarBot team, I tried to pay for ${productName} online but hit an error. Can you help me complete the order?`
                  )}
                  target={CONTACT.whatsappNumber ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  order via WhatsApp instead
                </a>
                .
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Full name
                <input required type="text" name="name" value={form.name} onChange={updateField} />
              </label>

              <label>
                Phone
                <input required type="tel" name="phone" value={form.phone} onChange={updateField} placeholder="+91 98765 43210" />
              </label>

              <label>
                Email
                <input required type="email" name="email" value={form.email} onChange={updateField} />
              </label>

              <label>
                Delivery address
                <input required type="text" name="address" value={form.address} onChange={updateField} />
              </label>

              <div className="auth-form-row">
                <label>
                  City
                  <input required type="text" name="city" value={form.city} onChange={updateField} />
                </label>
                <label>
                  Pincode
                  <input required type="text" name="pincode" value={form.pincode} onChange={updateField} inputMode="numeric" maxLength={6} />
                </label>
              </div>

              <button type="submit" className="btn btn-primary" disabled={stage === "processing"}>
                {stage === "processing"
                  ? "Opening payment…"
                  : `Pay ₹${price.toLocaleString("en-IN")} now`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default BuyNowModal;
