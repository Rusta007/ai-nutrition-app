// src/components/ChatHistory.js

import React from "react";
import "./ChatHistory.css"; // optional styling file

function ChatHistory({ history, onSelect }) {
  return (
    <div className="chat-history-sidebar">
      <h3>🕘 Chat History</h3>
      {Object.keys(history).map((date) => (
        <div key={date} className="history-date-group">
          <strong>{date}</strong>
          <ul>
            {history[date].map((item, idx) => (
              <li key={idx} onClick={() => onSelect(item)}>
                {item.question}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
