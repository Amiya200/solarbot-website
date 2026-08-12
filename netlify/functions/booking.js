const RESEND_API_URL =
  "https://api.resend.com/emails";

const META_GRAPH_VERSION =
  process.env.WHATSAPP_GRAPH_VERSION ||
  "v23.0";

const jsonResponse = (
  statusCode,
  body,
  origin = "*"
) => {
  return {
    statusCode,

    headers: {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin":
        process.env.ALLOWED_ORIGIN ||
        origin ||
        "*",

      "Access-Control-Allow-Headers":
        "Content-Type",

      "Access-Control-Allow-Methods":
        "POST, OPTIONS",
    },

    body: JSON.stringify(body),
  };
};

const sanitize = (value, maxLength = 500) => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, maxLength);
};

const normalizePhone = (value) => {
  return sanitize(value, 30).replace(
    /[^\d+]/g,
    ""
  );
};

const validateEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
};

const validateBooking = (booking) => {
  if (!booking.name) {
    return "Name is required.";
  }

  if (!booking.phone) {
    return "Phone number is required.";
  }

  if (!booking.email) {
    return "Email address is required.";
  }

  if (!validateEmail(booking.email)) {
    return "Please provide a valid email address.";
  }

  if (!booking.city) {
    return "City is required.";
  }

  if (!booking.product) {
    return "Product selection is required.";
  }

  return null;
};

const createBookingText = (booking) => {
  return [
    "NEW SOLARBOT BOOKING",
    "",
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    `City: ${booking.city}`,
    `Product: ${booking.product}`,
    "",
    `Message: ${
      booking.message || "Not provided"
    }`,
    "",
    `Source: ${
      booking.source || "Website"
    }`,
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");
};

async function sendEmail(booking) {
  const apiKey =
    process.env.RESEND_API_KEY;

  const notificationEmail =
    process.env.BOOKING_NOTIFICATION_EMAIL;

  const fromEmail =
    process.env.BOOKING_FROM_EMAIL;

  if (
    !apiKey ||
    !notificationEmail ||
    !fromEmail
  ) {
    console.warn(
      "[EMAIL] Email configuration is incomplete."
    );

    return {
      skipped: true,
      channel: "email",
    };
  }

  const bookingText =
    createBookingText(booking);

  const response = await fetch(
    RESEND_API_URL,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        from: fromEmail,

        to: [notificationEmail],

        reply_to: booking.email,

        subject: `New SolarBot booking - ${booking.name}`,

        text: bookingText,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 620px;
              margin: auto;
              padding: 24px;
            "
          >
            <h2>
              New SolarBot Booking
            </h2>

            <table
              style="
                width: 100%;
                border-collapse: collapse;
              "
            >
              <tr>
                <td><strong>Name</strong></td>
                <td>${booking.name}</td>
              </tr>

              <tr>
                <td><strong>Phone</strong></td>
                <td>${booking.phone}</td>
              </tr>

              <tr>
                <td><strong>Email</strong></td>
                <td>${booking.email}</td>
              </tr>

              <tr>
                <td><strong>City</strong></td>
                <td>${booking.city}</td>
              </tr>

              <tr>
                <td><strong>Product</strong></td>
                <td>${booking.product}</td>
              </tr>
            </table>

            <h3>Message</h3>

            <p>
              ${
                booking.message ||
                "No additional message provided."
              }
            </p>

            <hr />

            <small>
              Source:
              ${
                booking.source ||
                "SolarBot website"
              }
            </small>
          </div>
        `,
      }),
    }
  );

  const payload =
    await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error(
      "[EMAIL] Resend error:",
      payload
    );

    throw new Error(
      payload.message ||
        "Email notification failed."
    );
  }

  console.log(
    "[EMAIL] Notification sent:",
    payload.id
  );

  return {
    success: true,
    channel: "email",
    id: payload.id,
  };
}

async function sendWhatsApp(booking) {
  const token =
    process.env.WHATSAPP_ACCESS_TOKEN;

  const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID;

  const adminNumber = (
    process.env.WHATSAPP_ADMIN_NUMBER || ""
  ).replace(/\D/g, "");

  const templateName =
    process.env.WHATSAPP_TEMPLATE_NAME;

  const templateLanguage =
    process.env.WHATSAPP_TEMPLATE_LANGUAGE ||
    "en";

  if (
    !token ||
    !phoneNumberId ||
    !adminNumber
  ) {
    console.warn(
      "[WHATSAPP] WhatsApp configuration is incomplete."
    );

    return {
      skipped: true,
      channel: "whatsapp",
    };
  }

  const endpoint =
    `https://graph.facebook.com/` +
    `${META_GRAPH_VERSION}/` +
    `${phoneNumberId}/messages`;

  let messagePayload;

  /*
   * PRODUCTION MODE
   *
   * Use a pre-approved Meta template.
   *
   * Template body example:
   *
   * New SolarBot booking
   * Name: {{1}}
   * Phone: {{2}}
   * Email: {{3}}
   * City: {{4}}
   * Product: {{5}}
   */

  if (templateName) {
    messagePayload = {
      messaging_product: "whatsapp",

      to: adminNumber,

      type: "template",

      template: {
        name: templateName,

        language: {
          code: templateLanguage,
        },

        components: [
          {
            type: "body",

            parameters: [
              {
                type: "text",
                text: booking.name,
              },

              {
                type: "text",
                text: booking.phone,
              },

              {
                type: "text",
                text: booking.email,
              },

              {
                type: "text",
                text: booking.city,
              },

              {
                type: "text",
                text: booking.product,
              },
            ],
          },
        ],
      },
    };
  } else {
    /*
     * DEVELOPMENT / ACTIVE SESSION MODE
     *
     * Normal text messages can work during
     * an active WhatsApp service window.
     */

    messagePayload = {
      messaging_product: "whatsapp",

      recipient_type: "individual",

      to: adminNumber,

      type: "text",

      text: {
        preview_url: false,

        body:
          createBookingText(booking),
      },
    };
  }

  const response = await fetch(
    endpoint,
    {
      method: "POST",

      headers: {
        Authorization:
          `Bearer ${token}`,

        "Content-Type":
          "application/json",
      },

      body:
        JSON.stringify(
          messagePayload
        ),
    }
  );

  const payload =
    await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error(
      "[WHATSAPP] Meta API error:",
      JSON.stringify(payload)
    );

    throw new Error(
      payload?.error?.message ||
        "WhatsApp notification failed."
    );
  }

  console.log(
    "[WHATSAPP] Notification sent."
  );

  return {
    success: true,
    channel: "whatsapp",
    response: payload,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, {
      success: true,
    });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, {
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    let body;

    try {
      body = JSON.parse(
        event.body || "{}"
      );
    } catch {
      return jsonResponse(400, {
        success: false,
        message:
          "Invalid request body.",
      });
    }

    const booking = {
      name: sanitize(
        body.name,
        100
      ),

      phone: normalizePhone(
        body.phone
      ),

      email: sanitize(
        body.email,
        200
      ).toLowerCase(),

      city: sanitize(
        body.city,
        100
      ),

      product: sanitize(
        body.product,
        100
      ),

      message: sanitize(
        body.message,
        1000
      ),

      source: sanitize(
        body.source,
        500
      ),
    };

    const validationError =
      validateBooking(booking);

    if (validationError) {
      return jsonResponse(400, {
        success: false,
        message:
          validationError,
      });
    }

    console.log(
      "[BOOKING] New booking:",
      {
        name: booking.name,
        city: booking.city,
        product: booking.product,
      }
    );

    const results =
      await Promise.allSettled([
        sendEmail(booking),
        sendWhatsApp(booking),
      ]);

    const emailResult =
      results[0];

    const whatsappResult =
      results[1];

    const emailSuccess =
      emailResult.status ===
        "fulfilled" &&
      !emailResult.value?.skipped;

    const whatsappSuccess =
      whatsappResult.status ===
        "fulfilled" &&
      !whatsappResult.value?.skipped;

    if (
      emailResult.status ===
      "rejected"
    ) {
      console.error(
        "[BOOKING] Email failure:",
        emailResult.reason
      );
    }

    if (
      whatsappResult.status ===
      "rejected"
    ) {
      console.error(
        "[BOOKING] WhatsApp failure:",
        whatsappResult.reason
      );
    }

    if (
      !emailSuccess &&
      !whatsappSuccess
    ) {
      return jsonResponse(500, {
        success: false,

        message:
          "Booking received, but notification delivery failed. Please contact us directly.",
      });
    }

    return jsonResponse(200, {
      success: true,

      message:
        "Booking received successfully.",

      notifications: {
        email: emailSuccess,
        whatsapp:
          whatsappSuccess,
      },
    });
  } catch (error) {
    console.error(
      "[BOOKING] Unexpected error:",
      error
    );

    return jsonResponse(500, {
      success: false,

      message:
        "Unable to process the booking right now.",
    });
  }
};