# SolarBot production setup

The website now supports direct WhatsApp/email contact and booking notifications through a server-side Netlify Function.

## 1. Public website contact details

Copy `.env.example` to `.env.production` and set:

- `REACT_APP_WHATSAPP_NUMBER` — international number without `+`, spaces, or dashes, for example `919876543210`.
- `REACT_APP_CONTACT_EMAIL` — public sales/support email.
- `REACT_APP_BOOKING_API_URL` — keep `/.netlify/functions/booking` when deploying on Netlify.

Never put WhatsApp access tokens or email API keys in a `REACT_APP_*` variable because React exposes those values to visitors.

## 2. Email booking notifications

Create a Resend account, verify your sending domain, and add these server environment variables in Netlify:

- `RESEND_API_KEY`
- `BOOKING_NOTIFICATION_EMAIL` — address that should receive every booking.
- `BOOKING_FROM_EMAIL` — verified sender, e.g. `SolarBot <bookings@yourdomain.com>`.

## 3. WhatsApp booking notifications

Use Meta WhatsApp Cloud API and add these server environment variables:

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_ADMIN_NUMBER` — your notification number in international format without `+`.

For a production Meta WhatsApp account, business-initiated messages can require an approved message template depending on the conversation window. Configure the Meta template before launch if your account requires it.

## 4. Origin restriction

Set `ALLOWED_ORIGIN=https://www.yourdomain.com` in Netlify after the real domain is known.

## 5. Payments (Razorpay)

The "Pay Now — Buy Online" buttons on the pricing cards use Razorpay to
take real payments. This is separate from the WhatsApp booking flow, which
still works exactly as before with no payment involved.

1. Create a Razorpay account at https://razorpay.com and complete KYC
   (business details, bank account) — Razorpay requires this before you
   can accept live payments. This step can only be done by you.
2. In the Razorpay dashboard, go to Settings -> API Keys and generate a
   key pair. Start with the **test mode** keys (prefixed `rzp_test_`) so
   you can try the full flow without moving real money.
3. Add to Netlify's environment variables (never in a `REACT_APP_*` var,
   never committed to git):
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. Test with Razorpay's published test card/UPI numbers (see their docs)
   before switching to live keys.
5. When ready to accept real payments, replace both variables with your
   live-mode key pair from the same dashboard page, and redeploy.

Order confirmations (name, address, product, payment ID) are sent to the
same `BOOKING_NOTIFICATION_EMAIL` / `WHATSAPP_ADMIN_NUMBER` as bookings,
so no extra setup is needed there if you've already configured those.

## 6. Build and deploy

Run:

```bash
npm ci
npm run build
```

The repository contains `netlify.toml`, so Netlify will publish `build/` and deploy the function in `netlify/functions/`.

## 6. Production checks before launch

1. Submit one real booking and verify both email and WhatsApp notifications arrive.
2. Test the public WhatsApp button on desktop and mobile.
3. Test the email button with the default mail application.
4. Verify booking success/error popup messages.
5. Test Chrome, Safari, Firefox, Android Chrome, and iPhone Safari.
6. Replace any product/legal claims that have not been independently verified.
7. Add your Privacy Policy, Terms, Refund/Shipping policy, business address/GST details, and payment gateway before accepting online payments.
