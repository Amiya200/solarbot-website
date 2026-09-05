import { useState } from "react";

function Dashboard({ user, onPairDevice, onLogout, onClose }) {
  const pairedDeviceId = user?.user_metadata?.deviceId || "";
  const [deviceInput, setDeviceInput] = useState(pairedDeviceId);
  const [saving, setSaving] = useState(false);
  const [pairError, setPairError] = useState("");

  const handlePair = async (event) => {
    event.preventDefault();
    setPairError("");
    setSaving(true);

    try {
      await onPairDevice(deviceInput.trim());
    } catch (err) {
      setPairError(err.message || "Couldn't save device ID. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-overlay" role="dialog" aria-modal="true">
      <div className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <span className="tag">Your account</span>
            <h2 className="dashboard-panel-title">SolarBot Dashboard</h2>
            <p className="dashboard-panel-email">{user?.email}</p>
          </div>

          <div className="dashboard-panel-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onLogout}>
              Log out
            </button>
            <button
              type="button"
              className="dashboard-close"
              aria-label="Close dashboard"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        <form className="device-pair-row" onSubmit={handlePair}>
          <label className="device-pair-label">
            Device ID
            <input
              type="text"
              placeholder="e.g. SB-2026-000123"
              value={deviceInput}
              onChange={(e) => setDeviceInput(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
            {saving ? "Saving…" : pairedDeviceId ? "Update" : "Pair device"}
          </button>
        </form>
        {pairError && <div className="auth-error">{pairError}</div>}

        <div className="sample-data-banner">
          ⚠ Sample data — SolarBot units aren't shipping with live
          connectivity yet. This dashboard shows what real device data
          will look like once your unit is paired and online.
        </div>

        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Panel Efficiency</span>
            <span className="dashboard-stat-value teal">94%</span>
            <span className="dashboard-stat-sub">vs. 61% before SolarBot</span>
          </div>
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Last Clean</span>
            <span className="dashboard-stat-value blue">Today, 5:00 AM</span>
            <span className="dashboard-stat-sub">Dry mode · auto schedule</span>
          </div>
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Est. Monthly Savings</span>
            <span className="dashboard-stat-value gold">₹2,100</span>
            <span className="dashboard-stat-sub">vs. no cleaning</span>
          </div>
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Device Status</span>
            <span className="dashboard-stat-value muted">
              {pairedDeviceId ? "Awaiting first sync" : "Not paired"}
            </span>
            <span className="dashboard-stat-sub">
              {pairedDeviceId || "Pair a device ID above"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
