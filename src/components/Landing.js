import { CONTACT } from "../config/contact";
function LandingSections() {
  return (
    <>
      {/* ============================================================
          HOW IT WORKS
      ============================================================ */}
      <section className="section" id="how-it-works">
        <div className="container">

          <div className="hiw-header reveal">
            <div className="tag tag-blue">
              <div
                className="pulse-dot blue"
                style={{ width: "5px", height: "5px" }}
              ></div>
              The Process
            </div>

            <h2 className="section-title">
              FROM UNBOXING
              <br />
              TO <span className="highlight-teal">FULLY AUTOMATIC</span>
              <br />
              IN 10 MINUTES.
            </h2>

            <p
              className="section-sub"
              style={{ margin: "0 auto" }}
            >
              One-time setup. Then forget about it — forever.
            </p>
          </div>

          <div className="steps-grid">

            {/* STEP 1 */}
            <div className="step-card reveal d1">
              <div className="step-num">01</div>

              <div className="step-icon-wrap">
                📋
              </div>

              <div className="step-title">
                Mount the Rail
              </div>

              <div className="step-desc">
                Bolt the SolarBot rail system to your panel frame once —
                takes under 10 minutes with included tools.
                No drilling into panels required.
                Includes free setup support call.
              </div>
            </div>

            {/* STEP 2 */}
            <div className="step-card reveal d2">
              <div className="step-num">02</div>

              <div className="step-icon-wrap">
                📱
              </div>

              <div className="step-title">
                Set Your Schedule
              </div>

              <div className="step-desc">
                Download the app,
                connect SolarBot via Bluetooth,
                and choose your cleaning schedule.
                Recommended: every morning at 5 AM —
                before peak generation hours.
              </div>
            </div>

            {/* STEP 3 */}
            <div className="step-card reveal d3">
              <div className="step-num">03</div>

              <div className="step-icon-wrap">
                🤖
              </div>

              <div className="step-title">
                SolarBot Cleans
              </div>

              <div className="step-desc">
                SolarBot traverses your full panel array
                automatically — day or night.
                Dual brushes remove dust,
                bird droppings,
                and particulates
                with zero water,
                zero noise.
              </div>
            </div>

            {/* STEP 4 */}
            <div className="step-card reveal d4">
              <div className="step-num">04</div>

              <div className="step-icon-wrap">
                📊
              </div>

              <div className="step-title">
                Watch Savings Grow
              </div>

              <div className="step-desc">
                Track efficiency gains live on the dashboard.
                See exactly how many units —
                and rupees —
                SolarBot has recovered for you.
                Most users see gains within 24 hours.
              </div>
            </div>

          </div>

        </div>
      </section>
            {/* ============================================================
          TESTIMONIALS
      ============================================================ */}
      <section
        className="section"
        id="testimonials"
        style={{
          background: "var(--navy-2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">

          <div className="testi-header reveal">
            <div className="tag tag-green">
              <div
                className="pulse-dot green"
                style={{ width: "5px", height: "5px" }}
              ></div>
              Real Customers
            </div>

            <h2 className="section-title">
              312 SOLAR OWNERS
              <br />
              <span className="highlight-blue">
                CAN'T BE WRONG.
              </span>
            </h2>
          </div>

          <div className="rating-bar reveal">
            <span className="stars-big">★★★★★</span>
            <span className="rating-text">
              4.8/5 — Based on 312 verified purchases
            </span>
          </div>

          <div className="testi-grid">

            {/* Testimonial 1 */}
            <div className="testi-card reveal d1">
              <div className="quote-mark">"</div>

              <p className="testi-text">
                My 5kW system was generating{" "}
                <strong>3.8kW</strong>. After SolarBot,
                it's back to <strong>4.9kW</strong>.
                That's{" "}
                <strong style={{ color: "var(--teal)" }}>
                  ₹1,100/month extra
                </strong>{" "}
                just like that.
                It paid for itself before I even
                noticed it was there.
              </p>

              <div className="testi-author">

                <div
                  className="author-ava"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--blue), var(--blue-2))",
                  }}
                >
                  V
                </div>

                <div>
                  <div className="author-name">
                    Vikram Sharma
                  </div>

                  <div className="author-loc">
                    📍 Pune, Maharashtra · 5kW System
                  </div>
                </div>

                <div className="testi-savings">
                  +29% output
                </div>

              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testi-card reveal d2">
              <div className="quote-mark">"</div>

              <p className="testi-text">
                We have <strong>80 panels</strong> at
                our factory.
                Cleaning cost was{" "}
                <strong>₹12,000/month</strong>
                and still inconsistent.
                <strong style={{ color: "var(--teal)" }}>
                  {" "}
                  SolarBot Max eliminated that
                  completely.
                </strong>{" "}
                ROI in under 3 months.
                Wish we'd done this sooner.
              </p>

              <div className="testi-author">

                <div
                  className="author-ava"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--teal), var(--blue))",
                  }}
                >
                  A
                </div>

                <div>
                  <div className="author-name">
                    Anita Mehta
                  </div>

                  <div className="author-loc">
                    📍 Surat, Gujarat · 200kW Factory
                  </div>
                </div>

                <div className="testi-savings">
                  ₹12K/mo saved
                </div>

              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="testi-card reveal d3">
              <div className="quote-mark">"</div>

              <p className="testi-text">
                My panels were{" "}
                <strong>4 years old</strong> and I
                had never cleaned them.
                First clean by SolarBot —
                <strong style={{ color: "var(--teal)" }}>
                  {" "}
                  efficiency jumped 38%.
                </strong>{" "}
                I was literally angry at myself for
                not doing this sooner.
                Don't make the same mistake.
              </p>

              <div className="testi-author">

                <div
                  className="author-ava"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold), var(--gold-2))",
                  }}
                >
                  R
                </div>

                <div>
                  <div className="author-name">
                    Ramesh Kumar
                  </div>

                  <div className="author-loc">
                    📍 Chennai, Tamil Nadu · 3kW Home
                  </div>
                </div>

                <div className="testi-savings">
                  +38% output
                </div>

              </div>
            </div>

          </div>

        </div>
      </section> 
            {/* ============================================================
          COMPARISON TABLE
      ============================================================ */}
      <section className="section" id="comparison">
        <div className="container">

          <div className="comp-header reveal">
            <div className="tag tag-blue">
              <div
                className="pulse-dot blue"
                style={{ width: "5px", height: "5px" }}
              ></div>
              Why SolarBot
            </div>

            <h2 className="section-title">
              THE ONLY CHOICE
              <br />
              <span className="highlight-blue">
                THAT MAKES SENSE.
              </span>
            </h2>
          </div>

          <div className="comp-table-wrap reveal">
            <table className="comp-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="th-our">SolarBot Pro</th>
                  <th className="th-other">Manual Cleaning</th>
                  <th className="th-other">Do Nothing</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Annual Cost</td>

                  <td
                    className="td-our"
                    style={{
                      color: "var(--green)",
                      fontWeight: 700,
                    }}
                  >
                    ₹14,999 (one-time)
                  </td>

                  <td>₹6,000–₹24,000/yr</td>

                  <td className="crs">—</td>
                </tr>

                <tr>
                  <td>Efficiency Restored</td>

                  <td
                    className="td-our"
                    style={{
                      color: "var(--teal)",
                      fontWeight: 700,
                    }}
                  >
                    25–40%
                  </td>

                  <td className="prt">
                    15–25% (variable)
                  </td>

                  <td className="crs">
                    0%
                  </td>
                </tr>

                <tr>
                  <td>Roof Climbing Required</td>

                  <td className="td-our">
                    <span className="chk">
                      ✓ Never
                    </span>
                  </td>

                  <td>
                    <span className="crs">
                      Every month
                    </span>
                  </td>

                  <td>
                    <span className="crs">
                      Yes (when you panic)
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Cleaning Frequency</td>

                  <td
                    className="td-our"
                    style={{
                      color: "var(--blue)",
                      fontWeight: 700,
                    }}
                  >
                    Daily (automatic)
                  </td>

                  <td className="prt">
                    Monthly (if remembered)
                  </td>

                  <td className="crs">
                    Never
                  </td>
                </tr>
                                <tr>
                  <td>Water Usage</td>

                  <td className="td-our">
                    <span className="chk">
                      ✓ Zero
                    </span>
                  </td>

                  <td>
                    <span className="crs">
                      200L+ per clean
                    </span>
                  </td>

                  <td>—</td>
                </tr>

                <tr>
                  <td>App Monitoring</td>

                  <td className="td-our">
                    <span className="chk">
                      ✓ Real-time
                    </span>
                  </td>

                  <td className="crs">
                    None
                  </td>

                  <td className="crs">
                    None
                  </td>
                </tr>

                <tr>
                  <td>Warranty</td>

                  <td
                    className="td-our"
                    style={{
                      color: "var(--gold)",
                      fontWeight: 700,
                    }}
                  >
                    2 Years
                  </td>

                  <td className="crs">
                    None
                  </td>

                  <td className="crs">
                    None
                  </td>
                </tr>

                <tr>
                  <td>Payback Period</td>

                  <td
                    className="td-our"
                    style={{
                      color: "var(--teal)",
                      fontWeight: 700,
                    }}
                  >
                    7–18 months
                  </td>

                  <td className="crs">
                    Never pays back
                  </td>

                  <td className="crs">
                    Loses ₹24K+/yr
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </section> 
            {/* ============================================================
          PRICING
      ============================================================ */}
      <section
        className="section"
        id="pricing"
        style={{
          background: "var(--navy-2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">

          <div className="pricing-header reveal">
            <div className="tag tag-gold">
              <div
                className="pulse-dot gold"
                style={{ width: "5px", height: "5px" }}
              ></div>
              Launch Pricing
            </div>

            <h2 className="section-title">
              INVEST ONCE.
              <br />
              <span className="highlight-blue">
                SAVE FOREVER.
              </span>
            </h2>

            <p className="section-sub">
              30% launch discount. Only 47 units left at this price.
            </p>
          </div>

          <div className="pricing-grid">

            {/* ===================== LITE ===================== */}

            <div className="pricing-card reveal d1">

              <div className="pricing-tier">
                Entry
              </div>

              <div className="pricing-name">
                SolarBot Lite
              </div>

              <div className="pricing-desc">
                For small homes with 1–3 solar panels.
                Perfect first step to recovering your
                solar investment.
              </div>

              <div className="pricing-price">

                <div className="price-orig">
                  Was ₹12,999
                </div>

                <div className="price-amount">
                  <span className="curr">₹</span>
                  8,999
                </div>

                <div className="pricing-note">
                  one-time payment · free shipping
                </div>

              </div>

              <div className="pricing-features">

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Covers 1–3 panels
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Daily auto cleaning
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Waterless microfiber brushes
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Bluetooth app control
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  1-year warranty
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Free setup support call
                </div>

              </div>

              <a
                href={CONTACT.whatsappUrl("Hi SolarBot team, I want to buy SolarBot Lite for ₹8,999.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Buy Lite — ₹8,999 →
              </a>

            </div>
                        {/* ===================== PRO (FEATURED) ===================== */}

            <div className="pricing-card featured reveal d2">

              <div className="pricing-badge">
                ★ MOST POPULAR
              </div>

              <div className="pricing-tier">
                Best Value
              </div>

              <div className="pricing-name">
                SolarBot Pro
              </div>

              <div className="pricing-desc">
                The sweet spot. For homes and SMEs with
                4–10 panels. Maximum ROI, fastest payback.
              </div>

              <div className="pricing-price">

                <div className="price-orig">
                  Was ₹21,999
                </div>

                <div className="price-amount">
                  <span className="curr">₹</span>
                  14,999
                </div>

                <div className="pricing-note">
                  one-time payment · free installation call
                </div>

              </div>

              <div className="pricing-features">

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Covers 4–10 panels
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Daily + custom scheduling
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Full app with efficiency reports
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Real-time generation tracking
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Works on all tilt angles
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  2-year warranty
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Free installation support call
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Priority customer support
                </div>

              </div>

              <a
                href={CONTACT.whatsappUrl("Hi SolarBot team, I want to buy SolarBot Pro for ₹14,999.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-blue btn-lg"
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                🛒 Buy Pro — ₹14,999 →
              </a>

            </div>
                        {/* ===================== MAX ===================== */}

            <div className="pricing-card reveal d3">

              <div className="pricing-tier">
                Commercial
              </div>

              <div className="pricing-name">
                SolarBot Max
              </div>

              <div className="pricing-desc">
                For commercial arrays, factories,
                and farms. 10–30 panels.
                Eliminates your cleaning costs
                entirely.
              </div>

              <div className="pricing-price">

                <div className="price-orig">
                  Was ₹49,999
                </div>

                <div className="price-amount">
                  <span className="curr">₹</span>
                  34,999
                </div>

                <div className="pricing-note">
                  one-time · on-site installation available
                </div>

              </div>

              <div className="pricing-features">

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Covers 10–30 panels
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Commercial-grade brushes
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Multi-array management
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Advanced efficiency analytics
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  SCADA integration ready
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  2-year warranty + AMC option
                </div>

                <div className="pf">
                  <span className="pf-icon">✓</span>
                  Dedicated account manager
                </div>

              </div>

              <a
                href={CONTACT.whatsappUrl("Hi SolarBot team, I want to buy SolarBot Max for ₹34,999 for commercial use.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                Buy Max — ₹34,999 →
              </a>

            </div>

          </div>

          {/* ===================== AMC NOTE ===================== */}

          <div
            className="reveal"
            style={{
              textAlign: "center",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                background: "var(--glass)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "16px 28px",
                fontSize: "14px",
                color: "var(--muted)",
              }}
            >
              <span>🔧</span>

              <span>
                Add Annual Maintenance Plan for
                ₹1,999/yr — includes brush replacement,
                software updates &amp; priority support.
              </span>

            </div>
          </div>

        </div>
      </section>

    </>
  );
}

export default LandingSections; 