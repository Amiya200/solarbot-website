import { useState, useEffect } from "react";

function Efficiency() {

  const MODEL_COSTS = {
    semi: 14000,
    full: 25000,
  };

  const [model, setModel] = useState("full");
  const BOT_COST = MODEL_COSTS[model];

  const [capacity, setCapacity] = useState(3);
  const [dirty, setDirty] = useState(20);
  const [rate, setRate] = useState(7);

  const [monthlyLoss, setMonthlyLoss] = useState(0);
  const [annualLoss, setAnnualLoss] = useState(0);
  const [payback, setPayback] = useState(0);
  const [fiveYear, setFiveYear] = useState(0);

  const [dirtyBar, setDirtyBar] = useState(0);
  const [cleanBar, setCleanBar] = useState(0);

  useEffect(() => {

    const hoursPerDay = 5.5;
    const daysPerMonth = 30;

    const monthlyUnits =
      capacity *
      hoursPerDay *
      daysPerMonth;

    const monthlyLossValue =
      Math.round(
        monthlyUnits *
        (dirty / 100) *
        rate
      );

    const annualLossValue =
      monthlyLossValue * 12;

    const paybackMonths =
      Math.ceil(
        BOT_COST /
        monthlyLossValue
      );

    const fiveYearSavings =
      (annualLossValue * 5) -
      BOT_COST;

    setMonthlyLoss(monthlyLossValue);

    setAnnualLoss(annualLossValue);

    setPayback(paybackMonths);

    setFiveYear(
      Math.max(
        0,
        fiveYearSavings
      )
    );

  }, [capacity, dirty, rate, model, BOT_COST]);

  useEffect(() => {

    const animateBars = () => {

        setDirtyBar(0);
        setCleanBar(0);

        setTimeout(() => {
            setDirtyBar(72);
        }, 150);

        setTimeout(() => {
            setCleanBar(100);
        }, 350);

    };

    animateBars();

    const animationLoop = setInterval(() => {
        animateBars();
    }, 4000);

    return () =>
      clearInterval(animationLoop);

  }, []);

  return (

<section
className="section"
id="efficiency"
style={{
background:"var(--navy-2)",
borderTop:"1px solid var(--border)",
borderBottom:"1px solid var(--border)"
}}
>

<div className="container">

<div className="reveal">

<div className="tag tag-teal">

<div
className="pulse-dot"
style={{
width:"5px",
height:"5px",
background:"var(--teal)"
}}
></div>

The Numbers

</div>

<h2 className="section-title">

CALCULATE

<br/>

<span className="highlight-gold">

YOUR EXACT

</span>

<br/>

SAVINGS.

</h2>

</div>

<div className="eff-layout">

<div className="reveal-left">

<div className="live-demo-card">

<div className="demo-label">

Before SolarBot (Your Dirty Panels)

</div>

<div className="demo-val dirty">

3.4 kW

</div>

<div className="demo-bar-wrap">

<div
className="demo-bar dirty"
style={{
width:`${dirtyBar}%`
}}
></div>

</div>

<div className="demo-arrow">

↓

</div>

<div className="demo-label">

After SolarBot (Clean Panels)

</div>

<div className="demo-val clean">

4.8 kW

</div>

<div className="demo-bar-wrap">

<div
className="demo-bar clean"
style={{
width:`${cleanBar}%`
}}
></div>

</div>

<div
className="demo-recovered"
style={{
marginTop:"24px"
}}
>

<div className="demo-recovered-val">

₹1,400/month

</div>

<div className="demo-recovered-lbl">

Recovered electricity value —
every single month

</div>

</div>

<div
style={{
marginTop:"20px",
textAlign:"center",
fontFamily:"var(--font-mono)",
fontSize:"12px",
color:"var(--muted)",
letterSpacing:"1px"
}}
>

Example based on a 3kW system, 3 months since last clean

             </div> {/* methodology note */}

          </div> {/* live-demo-card */}

        </div> {/* reveal-left */}
      {/* RIGHT SIDE */}

      <div className="reveal-right">

        <div className="roi-card">

          <div className="roi-title">
            ⚡ Your Personal ROI Calculator
          </div>

          <div className="roi-sub">
            Enter your solar system details and see exactly how much
            SolarBot pays for itself.
          </div>

          {/* Capacity */}

          <div className="roi-field">

            <label>Your System Capacity</label>

            <select
              value={capacity}
              onChange={(e) =>
                setCapacity(Number(e.target.value))
              }
            >

              <option value={1}>
                1 kW (Small Home)
              </option>

              <option value={2}>
                2 kW Home
              </option>

              <option value={3}>
                3 kW Home
              </option>

              <option value={5}>
                5 kW Home
              </option>

              <option value={7}>
                7 kW Home
              </option>

              <option value={10}>
                10 kW Home/SME
              </option>

              <option value={25}>
                25 kW Commercial
              </option>

              <option value={50}>
                50 kW Commercial
              </option>

              <option value={100}>
                100 kW Industrial
              </option>

            </select>

          </div>

          {/* Dirt */}

          <div className="roi-field">

            <label>
              How Dirty are your panels?
              (Months since last clean)
            </label>

            <select
              value={dirty}
              onChange={(e) =>
                setDirty(Number(e.target.value))
              }
            >

              <option value={10}>
                1 month — 10% efficiency lost
              </option>

              <option value={20}>
                3 months — 20% efficiency lost
              </option>

              <option value={30}>
                6 months — 30% efficiency lost
              </option>

              <option value={40}>
                1 year or more — 40%+ efficiency lost
              </option>

            </select>

          </div>

          {/* Electricity Rate */}

          <div className="roi-field">

            <label>
              Your electricity rate (₹/unit)
            </label>

            <select
              value={rate}
              onChange={(e) =>
                setRate(Number(e.target.value))
              }
            >

              <option value={6}>
                ₹6 / unit
              </option>

              <option value={7}>
                ₹7 / unit
              </option>

              <option value={8}>
                ₹8 / unit
              </option>

              <option value={9}>
                ₹9 / unit
              </option>

              <option value={10}>
                ₹10 / unit
              </option>

            </select>

          </div>

          <div className="roi-results">

            <div className="roi-row">

              <span className="roi-row-label">
                Monthly loss to dust
              </span>

              <span className="roi-row-val red">

                ₹{monthlyLoss.toLocaleString("en-IN")}

              </span>

            </div>

            <div className="roi-row">

              <span className="roi-row-label">
                Annual loss (12 months)
              </span>

              <span className="roi-row-val red">

                ₹{annualLoss.toLocaleString("en-IN")}

              </span>

            </div>

            <div className="roi-row">

              <span className="roi-row-label">
                Model
              </span>

              <span className="roi-model-toggle">
                <button
                  type="button"
                  className={model === "semi" ? "active" : ""}
                  onClick={() => setModel("semi")}
                >
                  Semi · ₹14,000
                </button>
                <button
                  type="button"
                  className={model === "full" ? "active" : ""}
                  onClick={() => setModel("full")}
                >
                  Full · ₹25,000
                </button>
              </span>

            </div>

            <div className="roi-row">

              <span className="roi-row-label">
                SolarBot {model === "semi" ? "Semi" : "Full"} cost (one time)
              </span>

              <span
                className="roi-row-val"
                style={{
                  color: "var(--white)"
                }}
              >
                ₹{BOT_COST.toLocaleString("en-IN")}
              </span>

            </div>

            <div className="roi-row">

              <span className="roi-row-label">
                Payback period
              </span>

              <span
                className="roi-row-val blue"
              >

                {
                  payback <= 24
                    ? `~${payback} months`
                    : `~${Math.round(
                        payback / 12
                      )} years`
                }

              </span>

            </div>

            <div className="roi-row">

              <span
                className="roi-row-label"
                style={{
                  fontWeight: "700",
                  color: "var(--white)"
                }}
              >
                5-Year Net Savings
              </span>

              <span
                className="roi-row-val green"
                style={{
                  fontSize: "28px"
                }}
              >

                ₹{fiveYear.toLocaleString("en-IN")}

              </span>

            </div>

          </div>

          <a
            href="#pricing"
            className="btn btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "20px"
            }}
          >
            Start Saving Today →
          </a>

                </div> {/* roi-card */}

      </div> {/* reveal-right */}

    </div> {/* eff-layout */}

  </div> {/* container */}

</section>

  );
}

export default Efficiency;

