import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ token, userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Fetch last 30 messages from DB
    fetch(`https://verdict-backend-t2nv.onrender.com/message/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Ensure all messages have proper role and timestamp structure
        const normalizedMessages = data.slice(-30).map(msg => ({
          ...msg,
          role: msg.role || (msg.sender === "user" ? "user" : "assistant"),
          created_at: msg.created_at || msg.timestamp || new Date().toISOString()
        }));
        setMessages(normalizedMessages);
        setTimeout(scrollToBottom, 100);
      })
      .catch(console.error);

    // Setup WebSocket
    wsRef.current = new WebSocket(
      `wss://verdict-backend-t2nv.onrender.com/ws?token=${token}`
    );

    wsRef.current.onopen = () => {
      setIsConnected(true);
    };

    wsRef.current.onclose = () => {
      setIsConnected(false);
    };

    wsRef.current.onmessage = (event) => {
      try {
        setIsTyping(false);
        const data = JSON.parse(event.data);
        
        // Ensure the message has proper structure from DB
        const messageData = {
          ...data,
          role: data.role || "assistant", // Default to assistant if not specified
          created_at: data.created_at || data.timestamp || new Date().toISOString()
        };
        
        setMessages((prev) => [...prev, messageData]);
        setTimeout(scrollToBottom, 100);
      } catch {
        console.error("Invalid message format from server");
        setIsTyping(false);
      }
    };

    return () => wsRef.current?.close();
  }, [token, userId]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !isConnected) return;

    // Add user message locally
    const newMessage = {
      message: input.trim(),
      sender: "user",
      role: "user", 
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Send to backend
    wsRef.current.send(input.trim());
    setInput("");
    setIsTyping(true);
    
    setTimeout(scrollToBottom, 100);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl shadow-2xl overflow-hidden border border-white/50 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse"></div>
          <h3 className="font-semibold text-gray-800">Verdict AI</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Start a conversation</h4>
            <p className="text-gray-500 text-sm max-w-sm">
              Ask me anything and I'll help you get the answers you need.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isTyping && <ChatMessage message={{}} isTyping={true} />}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-100/50 bg-white/80 backdrop-blur-lg p-4">
        <form onSubmit={handleSend} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500 text-gray-800 transition-all duration-200"
              style={{
                minHeight: "48px",
                maxHeight: "120px",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || !isConnected}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed group"
          >
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
        
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="text-xs text-gray-400">
            {input.length > 0 && `${input.length} characters`}
          </div>
          <div className="text-xs text-gray-400">
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatBox;