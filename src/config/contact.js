const whatsappNumber = (
  process.env.REACT_APP_WHATSAPP_NUMBER || ""
).replace(/\D/g, "");

const contactEmail =
  process.env.REACT_APP_CONTACT_EMAIL || "";

const bookingApi =
  process.env.REACT_APP_BOOKING_API_URL ||
  "/.netlify/functions/booking";

const encode = (value = "") => encodeURIComponent(value);

export const CONTACT = {
  whatsappNumber,
  email: contactEmail,
  bookingApi,

  whatsappUrl(
    message =
      "Hi SolarBot team, I would like to know more about SolarBot."
  ) {
    if (!whatsappNumber) {
      return "#contact";
    }

    return `https://wa.me/${whatsappNumber}?text=${encode(message)}`;
  },

  emailUrl(
    subject = "SolarBot enquiry",
    body =
      "Hi SolarBot team,\n\nI would like to know more about SolarBot."
  ) {
    if (!contactEmail) {
      return "#contact";
    }

    return `mailto:${contactEmail}?subject=${encode(
      subject
    )}&body=${encode(body)}`;
  },
};