/**
 * Rule-based FAQ chatbot content. No external API — every answer here
 * is a fixed string, and matching is done with simple keyword lookup.
 * Keep answers in sync with the rest of the site (pricing, product
 * naming, cleaning modes, etc.) whenever those change.
 */

export const FAQ_ITEMS = [
  {
    id: "difference",
    label: "Semi vs Full — what's the difference?",
    keywords: ["difference", "semi", "full", "vs", "compare", "which one", "which model"],
    answer:
      "SolarBot Semi (₹14,000) starts cleaning on-demand — you trigger it from " +
      "the app whenever you want. SolarBot Full (₹25,000) runs fully " +
      "autonomously on a daily schedule with no input from you. Both use the " +
      "same dry + low-water cleaning modes and plug-in charging.",
  },
  {
    id: "pricing",
    label: "How much does it cost?",
    keywords: ["price", "cost", "how much", "pricing", "rupees", "₹"],
    answer:
      "SolarBot Semi is ₹14,000 (one-time). SolarBot Full is ₹25,000 " +
      "(one-time). If you'd rather not buy, we also offer a one-time " +
      "cleaning session for ₹500 — our team brings the rover to you.",
  },
  {
    id: "service",
    label: "What's the ₹500 cleaning service?",
    keywords: ["service", "500", "session", "one-time", "one time clean"],
    answer:
      "It's a single cleaning session using our rover — no purchase or " +
      "installation required. Good if you want to try it out or just need " +
      "a one-off clean. You can book another session anytime.",
  },
  {
    id: "water",
    label: "Does it really need no water?",
    keywords: ["water", "waterless", "dry", "how much water"],
    answer:
      "SolarBot has two modes: a dry mode for everyday dust, and a " +
      "low-water mode for tougher grime like bird droppings. It's not " +
      "fully waterless, but it uses far less water than a manual hose-down.",
  },
  {
    id: "charging",
    label: "How does it charge?",
    keywords: ["charge", "charging", "battery", "power", "self-charging"],
    answer:
      "SolarBot uses plug-in charging — you charge it like any other " +
      "rechargeable device between cleaning cycles.",
  },
  {
    id: "connectivity",
    label: "How does it connect to the app?",
    keywords: ["wifi", "bluetooth", "connect", "app", "pair"],
    answer:
      "SolarBot connects to the SolarBot app over WiFi, so you can set a " +
      "schedule (Full) or trigger a clean on demand (Semi) from anywhere.",
  },
  {
    id: "warranty",
    label: "What's the warranty?",
    keywords: ["warranty", "guarantee", "repair", "broken"],
    answer:
      "Both SolarBot Semi and SolarBot Full come with a 2-year warranty, " +
      "plus a free setup/installation support call.",
  },
  {
    id: "install",
    label: "How is it installed?",
    keywords: ["install", "installation", "mount", "setup", "fit"],
    answer:
      "SolarBot clips onto your existing panel frame — no rails, no " +
      "drilling. Setup takes under 10 minutes, and every order includes a " +
      "free setup support call.",
  },
  {
    id: "book",
    label: "How do I book or buy?",
    keywords: ["buy", "book", "order", "purchase", "get one"],
    answer:
      "You can fill in the booking form on this page, or message us " +
      "directly on WhatsApp — either way our team will confirm details " +
      "with you before anything is finalized.",
  },
];

export const CHATBOT_GREETING =
  "Hi! I'm the SolarBot assistant. Ask me about pricing, the Semi vs " +
  "Full models, the cleaning service, or how installation works.";

export const CHATBOT_FALLBACK =
  "I don't have an answer for that yet — tap a question below, or chat " +
  "with our team directly on WhatsApp for anything else.";
