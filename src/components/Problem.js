function Problem() {
  return (
    <section
      className="section"
      id="problem"
      style={{
        background: "var(--navy-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <div >
          <div className="tag tag-red">
            <div
              className="pulse-dot red"
              style={{ width: "5px", height: "5px" }}
            ></div>
            The Problem Nobody Talks About
          </div>

          <h2 className="section-title">
            YOU PAID LAKHS
            <br />
            FOR SOLAR.
            <br />
            <span className="highlight-blue">DUST IS STEALING</span>
            <br />
            YOUR RETURNS.
          </h2>
        </div>

        <div className="problem-grid">
          <div>
            <div className="decay-timeline">
              <div className="decay-title">
                // Panel Efficiency Over Time (Without Cleaning)
              </div>

              <div className="decay-rows">
                <div className="decay-row">
                  <span className="decay-month">Month 0</span>
                  <div className="decay-bar-bg">
                    <div
                      className="decay-bar-fill"
                      style={{
                        background: "var(--teal)",
                        width: "100%",
                      }}
                    ></div>
                  </div>
                  <span
                    className="decay-pct"
                    style={{ color: "var(--teal)" }}
                  >
                    100%
                  </span>
                </div>

                <div className="decay-row">
                  <span className="decay-month">Month 1</span>
                  <div className="decay-bar-bg">
                    <div
                      className="decay-bar-fill"
                      style={{
                        background: "#88ddaa",
                        width: "88%",
                      }}
                    ></div>
                  </div>
                  <span
                    className="decay-pct"
                    style={{ color: "#88ddaa" }}
                  >
                    88%
                  </span>
                </div>

                <div className="decay-row">
                  <span className="decay-month">Month 3</span>
                  <div className="decay-bar-bg">
                    <div
                      className="decay-bar-fill"
                      style={{
                        background: "var(--gold)",
                        width: "75%",
                      }}
                    ></div>
                  </div>
                  <span
                    className="decay-pct"
                    style={{ color: "var(--gold)" }}
                  >
                    75%
                  </span>
                </div>

                <div className="decay-row">
                  <span className="decay-month">Month 6</span>
                  <div className="decay-bar-bg">
                    <div
                      className="decay-bar-fill"
                      style={{
                        background: "#ff8844",
                        width: "62%",
                      }}
                    ></div>
                  </div>
                  <span
                    className="decay-pct"
                    style={{ color: "#ff8844" }}
                  >
                    62%
                  </span>
                </div>

                <div className="decay-row">
                  <span className="decay-month">Month 12</span>
                  <div className="decay-bar-bg">
                    <div
                      className="decay-bar-fill"
                      style={{
                        background: "var(--red)",
                        width: "55%",
                      }}
                    ></div>
                  </div>
                  <span
                    className="decay-pct"
                    style={{ color: "var(--red)" }}
                  >
                    55%
                  </span>
                </div>
              </div>
            </div>

            <div className="math-box" style={{ marginTop: "20px" }}>
              <p>
                If your system generates{" "}
                <strong>₹6,000/month</strong> at full capacity —
                you're currently getting just <strong>₹3,900.</strong>
              </p>

              <span className="big">
                ₹2,100 LOST
                <br />
                <span
                  style={{
                    fontSize: "18px",
                    color: "var(--muted)",
                  }}
                >
                  Every single month. To dust.
                </span>
              </span>
            </div>
          </div>

          <div>
            <p
              className="section-sub"
              style={{ marginBottom: "32px" }}
            >
              Every solar owner faces this. Yet nobody talks about it.
              Your installer didn't. Your distributor didn't. We will.
            </p>

            <div className="pain-cards">
              <div className="pain-card">
                <span className="pain-icon">⚠️</span>
                <div>
                  <div className="pain-title">
                    Dangerous Roof Climbing
                  </div>

                  <div className="pain-desc">
                    Manual cleaning means climbing your rooftop every
                    month — risking falls, injuries, and broken panels.
                  </div>
                </div>
              </div>

              <div className="pain-card">
                <span className="pain-icon">💸</span>
                <div>
                  <div className="pain-title">
                    Expensive Manual Cleaning
                  </div>

                  <div className="pain-desc">
                    Professional panel cleaning costs ₹500–₹2,000 per
                    visit. Done monthly, that's ₹6,000–₹24,000/year.
                  </div>
                </div>
              </div>

              <div className="pain-card">
                <span className="pain-icon">🎲</span>
                <div>
                  <div className="pain-title">
                    Inconsistent Results
                  </div>

                  <div className="pain-desc">
                    Cleaners miss spots. Schedules slip. Rain streaks
                    leave residue. Meanwhile your panels silently
                    underperform.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;