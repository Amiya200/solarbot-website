/**
 * Notification helpers used only by the payment flow (create-order /
 * verify-payment). Deliberately kept separate from booking.js so the
 * existing booking/WhatsApp-inquiry flow is never touched by this feature.
 */

const RESEND_API_URL = "https://api.resend.com/emails";
const META_GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v23.0";

async function sendOrderEmail(order) {
  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.BOOKING_NOTIFICATION_EMAIL;
  const fromEmail = process.env.BOOKING_FROM_EMAIL;

  if (!apiKey || !notificationEmail || !fromEmail) {
    console.warn("[PAYMENT EMAIL] Email configuration is incomplete.");
    return { skipped: true, channel: "email" };
  }

  const text = [
    "NEW SOLARBOT ORDER (PAID)",
    "",
    `Product: ${order.productName}`,
    `Amount: ₹${order.amountInRupees.toLocaleString("en-IN")}`,
    `Payment ID: ${order.paymentId}`,
    `Order ID: ${order.orderId}`,
    "",
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email}`,
    `Address: ${order.address}`,
    `City: ${order.city}`,
    `Pincode: ${order.pincode}`,
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notificationEmail],
      reply_to: order.email,
      subject: `Paid order — ${order.productName} — ${order.name}`,
      text,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("[PAYMENT EMAIL] Resend error:", payload);
    throw new Error(payload.message || "Order email failed.");
  }

  return { success: true, channel: "email", id: payload.id };
}

async function sendOrderWhatsApp(order) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminNumber = (process.env.WHATSAPP_ADMIN_NUMBER || "").replace(/\D/g, "");

  if (!token || !phoneNumberId || !adminNumber) {
    console.warn("[PAYMENT WHATSAPP] WhatsApp configuration is incomplete.");
    return { skipped: true, channel: "whatsapp" };
  }

  const endpoint = `https://graph.facebook.com/${META_GRAPH_VERSION}/${phoneNumberId}/messages`;

  const text = [
    "🎉 NEW PAID ORDER",
    "",
    `Product: ${order.productName}`,
    `Amount: ₹${order.amountInRupees.toLocaleString("en-IN")}`,
    `Payment ID: ${order.paymentId}`,
    "",
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}, ${order.city} - ${order.pincode}`,
  ].join("\n");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: adminNumber,
      type: "text",
      text: { preview_url: false, body: text },
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("[PAYMENT WHATSAPP] Meta API error:", JSON.stringify(payload));
    throw new Error(payload?.error?.message || "Order WhatsApp notification failed.");
  }

  return { success: true, channel: "whatsapp", response: payload };
}

module.exports = { sendOrderEmail, sendOrderWhatsApp };
