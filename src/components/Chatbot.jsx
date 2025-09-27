import React, { useState, useEffect } from "react";
import { getGeminiResponse } from "../utils/gemini";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 👋 First bot message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: "bot", text: "Hi 👋 Do you want any help with sentiment analysis?" }]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const reply = await getGeminiResponse(input);
    const botMsg = { sender: "bot", text: reply };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "28px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
          title="Do you want any help?"
        >
          💬
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "400px",
            border: "1px solid #ccc",
            borderRadius: "12px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Sentiment Bot</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "6px",
                }}
              >
                <p
                  style={{
                    background: msg.sender === "user" ? "#007bff" : "#eee",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "8px",
                    borderRadius: "10px",
                    display: "inline-block",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: "8px",
              borderTop: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, padding: "8px" }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "8px 12px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: "6px",
                marginLeft: "5px",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
