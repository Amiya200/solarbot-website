import { useState } from "react";

function AuthModal({ onClose, onLogin, onSignup }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [signupDone, setSignupDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await onLogin(email, password);
        onClose();
      } else {
        await onSignup(email, password);
        setSignupDone(true);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="booking-modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="booking-modal auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="auth-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {signupDone ? (
          <>
            <div className="booking-success-icon" aria-hidden="true">✓</div>
            <h3 id="auth-modal-title">Check your email</h3>
            <p>
              We've sent a confirmation link to <strong>{email}</strong>.
              Confirm it, then log in below.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSignupDone(false);
                setMode("login");
              }}
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <div className="auth-tabs">
              <button
                type="button"
                className={mode === "login" ? "active" : ""}
                onClick={() => setMode("login")}
              >
                Log in
              </button>
              <button
                type="button"
                className={mode === "signup" ? "active" : ""}
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>

            <h3 id="auth-modal-title">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h3>
            <p className="booking-modal-small">
              {mode === "login"
                ? "Log in to view your SolarBot dashboard."
                : "Sign up to track your SolarBot's cleaning and savings data."}
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Password
                <input
                  required
                  type="password"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </label>

              {error && <div className="auth-error">{error}</div>}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting
                  ? "Please wait…"
                  : mode === "login"
                  ? "Log in"
                  : "Create account"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
