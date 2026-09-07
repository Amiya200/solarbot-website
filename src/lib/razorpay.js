/**
 * Loads the Razorpay Checkout script on demand and drives the
 * create-order -> open checkout -> verify-payment flow.
 */

let scriptLoadPromise = null;

function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve();

  if (!scriptLoadPromise) {
    scriptLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = () =>
        reject(new Error("Couldn't load the payment widget. Check your connection."));
      document.body.appendChild(script);
    });
  }

  return scriptLoadPromise;
}

async function apiRequest(url, body) {
  let response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "Couldn't reach the payment service. If you're testing locally, use " +
      "`netlify dev` instead of `npm start`."
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const looksLikeJson = contentType.includes("application/json");
  const payload = looksLikeJson ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    if (!looksLikeJson) {
      // Got an HTML/error page instead of JSON — almost always means the
      // Netlify function isn't deployed yet (code exists locally/in a zip,
      // but hasn't been pushed to the connected git repo).
      throw new Error(
        `Payment service returned an unexpected response (HTTP ${response.status}). ` +
        "This usually means the payment functions haven't been deployed yet — " +
        "make sure this code has actually been pushed to your GitHub repo, or " +
        "that you're testing on the live Netlify URL (not npm start)."
      );
    }

    throw new Error(
      payload.message || `Something went wrong (HTTP ${response.status}).`
    );
  }

  return payload;
}

/**
 * Runs the full purchase flow. `customer` must include:
 * productName, name, phone, email, address, city, pincode.
 * Calls onSuccess(orderDetails) or onFailure(error) / onDismiss().
 */
export async function startCheckout(customer, { onSuccess, onFailure, onDismiss }) {
  try {
    await loadRazorpayScript();

    const order = await apiRequest("/.netlify/functions/create-order", {
      productName: customer.productName,
    });

    const razorpay = new window.Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "SolarBot",
      description: customer.productName,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: { color: "#0077B6" },
      modal: {
        ondismiss: () => onDismiss && onDismiss(),
      },
      handler: async (response) => {
        try {
          const verification = await apiRequest("/.netlify/functions/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            productName: customer.productName,
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            city: customer.city,
            pincode: customer.pincode,
          });

          onSuccess({
            paymentId: response.razorpay_payment_id,
            ...verification,
          });
        } catch (error) {
          onFailure(error);
        }
      },
    });

    razorpay.on("payment.failed", (response) => {
      onFailure(
        new Error(response?.error?.description || "Payment failed. Please try again.")
      );
    });

    razorpay.open();
  } catch (error) {
    onFailure(error);
  }
}
