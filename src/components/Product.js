function Product() {
  return (
    <section className="section" id="product">
      <div className="container">

        <div className="product-header reveal">
          <div className="tag tag-blue">
            <div
              className="pulse-dot blue"
              style={{ width: "5px", height: "5px" }}
            ></div>
            The Solution
          </div>

          <h2 className="section-title">
            MEET SOLARBOT PRO.
            <br />
            <span className="highlight-teal">YOUR PANELS'</span>
            <br />
            BEST FRIEND.
          </h2>

          <p
            className="section-sub"
            style={{ margin: "0 auto" }}
          >
            One device. Mounts once. Cleans forever. While you sleep,
            it's restoring every watt of efficiency you're losing right now.
          </p>
        </div>

        <div className="robot-showcase reveal">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* LEFT SIDE */}
            <div>

              <div
                className="product-solar-surface"
                style={{
                  position: "relative",
                  height: "320px",
                  background: "var(--navy-3)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--border-2)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(0,180,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                ></div>

                <div
                  id="dirtOverlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, rgba(139,90,43,0.4), rgba(100,70,30,0.2) 60%, transparent)",
                    borderRadius: "16px",
                    transition: "opacity 4s ease"
                  }}
                ></div>

                <div
                  id="cleanOverlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "0%",
                    background:
                      "linear-gradient(270deg, rgba(0,232,198,0.1), transparent)",
                    transition: "width 4s ease"
                  }}
                ></div>

                <div
                  id="heroRobot"
                  style={{
                    position: "absolute",
                    top: "4%",
                    left: "4%",
                    zIndex: 10
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "56px",
                      height: "36px",
                      background:
                        "linear-gradient(135deg,#1a4080,#2060c0)",
                      border: "2px solid rgba(0,180,255,0.7)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                        style={{
                            position: "absolute",
                            left: "-14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "18px",
                            height: "18px",
                            border: "2px solid var(--teal)",
                            borderRadius: "50%",
                            animation: "brush-spin 0.25s linear infinite",
                        }}
                        ></div>

                        <span style={{ fontSize: "18px" }}>
                        🤖
                        </span>

                        <div
                        style={{
                            position: "absolute",
                            right: "-14px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "18px",
                            height: "18px",
                            border: "2px solid var(--teal)",
                            borderRadius: "50%",
                            animation: "brush-spin 0.25s linear infinite reverse",
                        }}
                    ></div>
                  </div>
                  <div
                    style={{
                        display: "flex",
                        gap: "28px",
                        margin: "4px 8px 0",
                        justifyContent: "space-between",
                    }}
                    >
                    <div
                        style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "var(--navy-4)",
                        border: "2px solid rgba(0,180,255,0.4)",
                        animation: "wheel-spin 0.5s linear infinite",
                        }}
                    ></div>

                    <div
                        style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "var(--navy-4)",
                        border: "2px solid rgba(0,180,255,0.4)",
                        animation: "wheel-spin 0.5s linear infinite",
                        }}
                    ></div>
                  </div>
                </div>
                
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    fontSize: "10px",
                    color: "var(--red)",
                  }}
                >
                  ◉ DIRTY
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    fontSize: "10px",
                    color: "var(--teal)",
                  }}
                >
                  ✓ CLEAN
                </div>
              </div>

              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--muted)",
                  }}
                >
                  CLEANING PROGRESS
                </span>

                <div
                  style={{
                    flex: 1,
                    height: "4px",
                    background: "var(--navy-3)",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    id="robotProgress" className="product-progress-fill"
                    style={{
                      height: "100%",
                      width: "100%",
                      background:
                        "linear-gradient(90deg,var(--blue),var(--teal))"
                    }}
                    
                  ></div>
                </div>

                <span
                  id="robotPct"
                  style={{
                    fontSize: "11px",
                    color: "var(--teal)",
                  }}
                >
                  AUTO
                </span>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "36px",
                  color: "var(--white)",
                  marginBottom: "16px",
                }}
              >
                ROTATING MICROFIBER BRUSHES
              </h3>

              <p
                style={{
                  fontSize: "15px",
                  color: "var(--muted)",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                }}
              >
                Dual counter-rotating brushes sweep dust,
                bird droppings and pollution from panels
                without scratching or water.
              </p>
              <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                }}
                >
                <span
                    style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    background: "rgba(0,180,255,0.08)",
                    border: "1px solid rgba(0,180,255,0.2)",
                    color: "var(--blue)",
                    padding: "5px 14px",
                    borderRadius: "100px",
                    letterSpacing: "1px",
                    }}
                >
                    DRY + WATER MODES
                </span>

                <span
                    style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    background: "rgba(0,232,198,0.08)",
                    border: "1px solid rgba(0,232,198,0.2)",
                    color: "var(--teal)",
                    padding: "5px 14px",
                    borderRadius: "100px",
                    letterSpacing: "1px",
                    }}
                >
                    PLUG-IN CHARGING
                </span>

                <span
                    style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    background: "rgba(245,166,35,0.08)",
                    border: "1px solid rgba(245,166,35,0.2)",
                    color: "var(--gold)",
                    padding: "5px 14px",
                    borderRadius: "100px",
                    letterSpacing: "1px",
                    }}
                >
                    APP CONTROLLED
                </span>

                <span
                    style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    color: "var(--green)",
                    padding: "5px 14px",
                    borderRadius: "100px",
                    letterSpacing: "1px",
                    }}
                >
                    UNIVERSAL FIT
                </span>
              </div>
            </div>

            

          </div>
        </div>

        {/* FEATURES GRID */}

        <div className="features-grid" id="features">

          <div className="feature-card reveal">
            <div className="feature-icon-box blue">🔄</div>
            <div className="feature-name">Auto Schedule</div>
            <div className="feature-desc">
              Set it once — SolarBot cleans daily,
              weekly, or on your schedule.
            </div>
          </div>

          <div className="feature-card reveal">
            <div className="feature-icon-box teal">💧</div>
            <div className="feature-name">Dry + Water Cleaning Modes</div>
            <div className="feature-desc">
              Dry mode for daily dust. Switch to water-assisted mode
              for stubborn grime — uses a small, controlled amount of water.
            </div>
          </div>

          <div className="feature-card reveal">
            <div className="feature-icon-box gold">📱</div>
            <div className="feature-name">App Control</div>
            <div className="feature-desc">
              Real-time efficiency tracking and control.
            </div>
          </div>
          <div className="feature-card reveal d4">
            <div className="feature-icon-box green">🔌</div>
            <div className="feature-name">Plug-In Charging</div>
            <div className="feature-desc">SolarBot recharges via a standard plug-in charger between cleaning cycles — simple and reliable.</div>
        </div>
        <div className="feature-card reveal d5">
            <div className="feature-icon-box blue">🔧</div>
            <div className="feature-name">Universal Fit</div>
            <div className="feature-desc">Works on all panel brands and tilt angles — flat rooftops, tilted residential, commercial arrays, and ground-mounted systems.</div>
        </div>
        <div className="feature-card reveal d6">
            <div className="feature-icon-box teal">🇮🇳</div>
            <div className="feature-name">Made in India</div>
            <div className="feature-desc">Designed and manufactured in India. Built for Indian weather — dust storms, monsoons, extreme heat, and humidity.</div>
        </div>

        </div>

      </div>
    </section>
  );
}

export default Product; 