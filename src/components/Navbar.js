import React from "react";

function Navbar() {
  return (
    <nav
      style={{
        background: "#080C17",
        color: "white",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>☀ SolarBot</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="#hero" style={{ color: "white" }}>Home</a>
        <a href="#product" style={{ color: "white" }}>Product</a>
        <a href="#features" style={{ color: "white" }}>Features</a>
        <a href="#pricing" style={{ color: "white" }}>Pricing</a>
      </div>
    </nav>
  );
}

export default Navbar;