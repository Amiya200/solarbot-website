const crypto = require("crypto");
const { sendOrderEmail, sendOrderWhatsApp } = require("./_shared/notify");

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

const sanitize = (value, maxLength = 500) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[<>]/g, "").slice(0, maxLength);
};

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
    return jsonResponse(405, { success: false, message: "Method not allowed." }, origin);
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return jsonResponse(
      500,
      { success: false, message: "Payments aren't fully configured yet." },
      origin
    );
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { success: false, message: "Invalid request body." }, origin);
  }

  const {
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
  } = body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return jsonResponse(
      400,
      { success: false, message: "Missing payment details." },
      origin
    );
  }

  // Verify the payment is genuine and untampered using Razorpay's
  // documented HMAC-SHA256 signature scheme.
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    console.error("[PAYMENT] Signature mismatch — possible tampering.");
    return jsonResponse(
      400,
      { success: false, message: "Payment verification failed." },
      origin
    );
  }

  const productName = sanitize(body.productName, 100);
  const priceInRupees = PRODUCT_PRICES_INR[productName];

  if (!priceInRupees) {
    return jsonResponse(400, { success: false, message: "Unknown product." }, origin);
  }

  const order = {
    productName,
    amountInRupees: priceInRupees,
    paymentId: razorpayPaymentId,
    orderId: razorpayOrderId,
    name: sanitize(body.name, 100),
    phone: sanitize(body.phone, 30),
    email: sanitize(body.email, 200).toLowerCase(),
    address: sanitize(body.address, 300),
    city: sanitize(body.city, 100),
    pincode: sanitize(body.pincode, 12),
  };

  console.log("[PAYMENT] Verified order:", {
    orderId: order.orderId,
    paymentId: order.paymentId,
    product: order.productName,
  });

  // Payment is already verified and real at this point — notification
  // delivery failing should not make the order look unsuccessful to the
  // customer. We still report notification status back for visibility.
  const results = await Promise.allSettled([
    sendOrderEmail(order),
    sendOrderWhatsApp(order),
  ]);

  const emailResult = results[0];
  const whatsappResult = results[1];

  if (emailResult.status === "rejected") {
    console.error("[PAYMENT] Order email failed:", emailResult.reason);
  }
  if (whatsappResult.status === "rejected") {
    console.error("[PAYMENT] Order WhatsApp failed:", whatsappResult.reason);
  }

  return jsonResponse(
    200,
    {
      success: true,
      message: "Payment verified.",
      notifications: {
        email: emailResult.status === "fulfilled" && !emailResult.value?.skipped,
        whatsapp: whatsappResult.status === "fulfilled" && !whatsappResult.value?.skipped,
      },
    },
    origin
  );
};
