import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../config/contact";
import { FAQ_ITEMS, CHATBOT_GREETING, CHATBOT_FALLBACK } from "../data/faq";

function findAnswer(rawText) {
  const text = rawText.toLowerCase();

  const match = FAQ_ITEMS.find((item) =>
    item.keywords.some((keyword) => text.includes(keyword))
  );

  return match ? match.answer : null;
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: CHATBOT_GREETING },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const askQuestion = (item) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: item.label },
      { from: "bot", text: item.answer },
    ]);
  };

  const handleTextSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const answer = findAnswer(trimmed);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: answer || CHATBOT_FALLBACK },
    ]);

    setInput("");
  };

  return (
    <>
      <button
        type="button"
        className="chatbot-launcher"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="18" y1="6" x2="6" y2="18"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-5 4V6a1 1 0 0 1 1-1Z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="SolarBot FAQ chat">
          <div className="chatbot-header">
            <div>
              <div className="chatbot-title">SolarBot Assistant</div>
              <div className="chatbot-subtitle">Answers to common questions</div>
            </div>
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chatbot-quick-replies">
            {FAQ_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => askQuestion(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <form className="chatbot-input-row" onSubmit={handleTextSubmit}>
            <input
              type="text"
              placeholder="Type a question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Send">
              ➤
            </button>
          </form>

          <a
            className="chatbot-whatsapp-link"
            href={CONTACT.whatsappUrl("Hi SolarBot team, I have a question that your FAQ bot couldn't answer.")}
            target={CONTACT.whatsappNumber ? "_blank" : undefined}
            rel="noreferrer"
          >
            Talk to a human on WhatsApp →
          </a>
        </div>
      )}
    </>
  );
}

export default ChatBot;
