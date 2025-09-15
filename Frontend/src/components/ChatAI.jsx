import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext"; 
import axios from "axios";
import "./ChatAI.css";
import ChatHeader from "./ChatHeader";

const ChatAI = ({ title }) => {
  const { user, isDesktop } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]); 
  const chatEndRef = useRef(null);

  // ✅ Fetch chat messages from backend on mount
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(`https://your-backend-api.com/chat/${user.id}`);
        setMessages(res.data.messages || []);
        setHistory(res.data.history || []);
      } catch (err) {
        console.error("Error fetching chat:", err);
      }
    };
    fetchChat();
  }, [user.id]);

  // ✅ Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Add to history (latest first)
    setHistory((prev) => [input, ...prev]);

    try {
      // Save user message to backend
      await axios.post(`https://your-backend-api.com/chat/${user.id}`, userMessage);

      // Get AI response
      const response = await axios.post("https://your-backend-api.com/ask", {
        userId: user.id,
        question: input,
      });

      const aiMessage = { type: "ai", text: response.data.answer };
      setMessages((prev) => [...prev, aiMessage]);

      // Save AI response to backend
      await axios.post(`https://your-backend-api.com/chat/${user.id}`, aiMessage);

    } catch (err) {
      console.error(err);
      const errorMessage = { type: "ai", text: "Error: Could not fetch response" };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  // ✅ Toggle sidebar (mobile only)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ✅ Start a new chat (clear messages but also notify backend)
  const handleNewChat = async () => {
    setMessages([]);
    setInput("");
    try {
      await axios.post(`https://your-backend-api.com/chat/${user.id}/new`);
      setHistory([]); // reset local history for this session
    } catch (err) {
      console.error("Error starting new chat:", err);
    }
  };

  return (
    <div className="chatai">
      {isDesktop && <ChatHeader title={title} />}

      <div className="contain">
        {messages.length === 0 && (
          <div className="contain-text">
            <h2>Welcome to Your AI</h2>
            <p>The power of AI at your service - Name the knowledge</p>
          </div>
        )}

        {/* Chat Window */}
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.type === "user" ? "user" : "ai"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Form */}
        <div className="form-chat">
          <form onSubmit={handleSend}>
            <input
              type="text"
              placeholder='Example: "Explain Quantum Computing"'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="send" onClick={handleSend}>
              <i className="ri-send-plane-2-fill"></i>
            </div>
          </form>
        </div>

        {/* Right Sidebar */}
        <div
          className={`right-sidebar ${
            isDesktop ? "open" : sidebarOpen ? "open" : "closed"
          }`}
        >
          {/* Toggle button only for mobile */}
          {!isDesktop && (
            <div className="toggle-btn" onClick={toggleSidebar}>
              {sidebarOpen ? (
                <i className="ri-arrow-right-s-line"></i>
              ) : (
                <i className="ri-arrow-left-s-fill"></i>
              )}
            </div>
          )}

          {(isDesktop || sidebarOpen) && (
            <div className="sidebar-content">
              <p className="start" onClick={handleNewChat}>
                + Start a new chat
              </p>

              <div className="history-list">
                {history.length === 0 && <p>No history yet</p>}
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="history-item"
                    onClick={() => setInput(item)} // reuse input
                  >
                    <i className="ri-chat-4-line"></i>
                    {item.length > 10 ? item.substring(0, 10) + "..." : item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
