/**
 * Creates a Razorpay order server-side. The order_id this returns is what
 * the frontend hands to Razorpay's Checkout widget — the actual charge
 * still happens on Razorpay's side, never on our server.
 *
 * Needs these Netlify environment variables:
 *   RAZORPAY_KEY_ID
 *   RAZORPAY_KEY_SECRET
 */

const jsonResponse = (statusCode, body, origin) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || origin || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  },
  body: JSON.stringify(body),
});

// Server-side price list — never trust an amount sent from the browser.
const PRODUCT_PRICES_INR = {
  "SolarBot Semi": 14000,
  "SolarBot Full": 25000,
  "Cleaning Service": 500,
};

exports.handler = async (event) => {
  const origin = event.headers?.origin;

  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, {}, origin);
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Method not allowed." }, origin);
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return jsonResponse(
      500,
      {
        message:
          "Payments aren't set up yet. The site owner needs to add " +
          "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in the Netlify dashboard.",
      },
      origin
    );
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { message: "Invalid request body." }, origin);
  }

  const { productName } = payload;
  const priceInRupees = PRODUCT_PRICES_INR[productName];

  if (!priceInRupees) {
    return jsonResponse(
      400,
      { message: "Unknown product selected." },
      origin
    );
  }

  const amountInPaise = priceInRupees * 100;
  const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `solarbot_${Date.now()}`,
        notes: { productName },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return jsonResponse(
        502,
        {
          message:
            data?.error?.description ||
            "Razorpay rejected the order request.",
        },
        origin
      );
    }

    return jsonResponse(
      200,
      {
        orderId: data.id,
        amount: data.amount,
        currency: data.currency,
        keyId,
      },
      origin
    );
  } catch (error) {
    return jsonResponse(
      500,
      { message: "Couldn't reach Razorpay. Please try again." },
      origin
    );
  }
};
