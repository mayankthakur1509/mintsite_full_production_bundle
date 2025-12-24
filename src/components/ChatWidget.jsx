import React from "react";

export default function ChatWidget() {
  return (
    <div className="form-free-chat">
      <iframe
        src="/chat-widget"
        style={{ width: "300px", height: "400px", border: "none" }}
        title="Chat"
      ></iframe>
    </div>
  );
}
