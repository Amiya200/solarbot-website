import useHeroCounter from "../hooks/useHeroCounter";

function Hero() {
  useHeroCounter();
  return (
    <section id="hero">
      <div className="hero-bg">
        <div className="hero-grid-bg"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-left">

            <div className="hero-eyebrow">
              <div className="pulse-dot blue"></div>
              India's First Waterless Solar Cleaning Robot
            </div>

            <h1 className="hero-headline">
              YOUR PANELS
              <span className="line-red">ARE DIRTY.</span>
              <span className="line-blue">YOU'RE LOSING</span>
              MONEY.
            </h1>

            <p className="hero-sub">
              SolarBot Pro automatically cleans your solar panels —
              restoring up to <strong>40% lost efficiency</strong>.
              Zero water. Zero effort. Zero roof climbing.
              <strong> Pays for itself in months.</strong>
            </p>

            <div className="hero-actions">
              <a href="#pricing" className="btn btn-primary btn-lg">
                🛒 Buy Now — ₹14,999
              </a>

              <a href="#product" className="btn btn-ghost btn-lg">
                ▶ See It Work
              </a>

            
            </div>
            <div className="hero-trust">
                <div className="trust-stat">
                    <span className="trust-val">40%</span>
                    <span className="trust-label">Efficiency Restored</span>
                </div>

                <div className="trust-stat">
                    <span className="trust-val gold">24K</span>
                    <span className="trust-label">Annual Savings ₹</span>
                </div>

                <div className="trust-stat">
                    <span className="trust-val teal">₹0</span>
                    <span className="trust-label">Water Used</span>
                </div>

                <div className="trust-stat">
                    <span className="trust-val green">2 Yr</span>
                    <span className="trust-label">Warranty</span>
                </div>
            </div>


          </div>
          <div className="hero-visual">

            <div className="float-badge float-badge-1">
                ⚡ 4.7 kW — Live Output
            </div>

            <div className="dashboard-card">

                <div className="dash-header">
                <span className="dash-title">
                    SolarBot Dashboard
                </span>

                <span className="dash-live">
                    CLEANING ACTIVE
                </span>
                </div>

                <div style={{ position: "relative", marginBottom: "20px" }}>
                <div className="panel-array">
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                    <div className="panel-cell"></div>
                </div>

                <div className="robot-viz">
                    <div className="robot-body">
                    <div className="robot-brush-left"></div>
                    🤖
                    <div className="robot-brush-right"></div>
                    </div>
                </div>
                </div>

                <div className="eff-comparison">

                <div className="eff-row">
                    <div className="eff-label-row">
                    <span className="eff-label">
                        ⚠ BEFORE (DIRTY)
                    </span>

                    <span className="eff-val dirty">
                        3.4 kW
                    </span>
                    </div>

                    <div className="eff-bar-bg">
                    <div
                        className="eff-bar dirty"
                        style={{ width: "68%" }}
                    ></div>
                    </div>
                </div>

                <div
                    className="eff-row"
                    style={{ marginTop: "12px" }}
                >
                    <div className="eff-label-row">
                    <span className="eff-label">
                        ✓ AFTER SOLARBOT
                    </span>

                    <span className="eff-val clean">
                        4.9 kW
                    </span>
                    </div>

                    <div className="eff-bar-bg">
                    <div
                        className="eff-bar clean"
                        style={{ width: "97%" }}
                    ></div>
                    </div>
                </div>

                </div>

                <div className="dash-savings">

                <div className="savings-tile">
                    <span className="savings-val blue">
                    ₹1,100
                    </span>
                    <span className="savings-lbl">
                    Recovered/Month
                    </span>
                </div>

                <div className="savings-tile">
                    <span className="savings-val gold">
                    38%
                    </span>
                    <span className="savings-lbl">
                    Efficiency Gain
                    </span>
                </div>

                <div className="savings-tile">
                    <span className="savings-val green">
                    ₹0
                    </span>
                    <span className="savings-lbl">
                    Water Used
                    </span>
                </div>

                <div className="savings-tile">
                    <span className="savings-val teal">
                    AUTO
                    </span>
                    <span className="savings-lbl">
                    Scheduling
                    </span>
                </div>

                </div>

            </div>

            <div className="float-badge float-badge-2">
                🌱 Next clean: Tomorrow 6:00 AM
            </div>

         </div>      
        </div>
      </div>
    </section>
  );
}

export default Hero;