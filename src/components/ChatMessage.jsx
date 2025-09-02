import React from "react";

// Component to render markdown-style text
const MessageContent = ({ content }) => {
  if (!content) return null;

  // Simple markdown parser for bold, italic, and basic formatting
  const parseMarkdown = (text) => {
    return text
      // Bold text: **text** or ***text***
      .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic text: *text*
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Line breaks
      .replace(/\n/g, '<br/>');
  };

  return (
    <div 
      className="whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ 
        __html: parseMarkdown(content) 
      }} 
    />
  );
};

const ChatMessage = ({ message, isTyping = false }) => {
  const isUser = message.role === "user" || message.sender === "user";
  const isAI = message.role === "assistant" || message.role === "ai";

  if (isTyping) {
    return (
      <div className="flex justify-start mb-6 animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 rounded-full bg-white/20"></div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 animate-fade-in`}>
      <div className={`flex items-end space-x-3 max-w-[85%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
          isUser 
            ? "bg-gradient-to-br from-gray-700 to-black text-white" 
            : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        }`}>
          {isUser ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Message Bubble */}
        <div className={`relative group ${
          isUser ? "ml-0" : "mr-0"
        }`}>
          <div className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
            isUser
              ? "bg-gradient-to-br from-gray-800 to-black text-white rounded-br-md"
              : isAI
              ? "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
              : "bg-gray-100 border border-gray-200 text-gray-800 rounded-bl-md"
          }`}>
            <div className="text-sm leading-relaxed">
              <MessageContent content={message.message} />
            </div>
            
            {(message.created_at || message.timestamp) && (
              <div className={`text-xs mt-2 opacity-70 ${
                isUser ? "text-gray-300" : "text-gray-500"
              }`}>
                {new Date(message.created_at || message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>

          {/* Message tail */}
          <div className={`absolute bottom-0 w-3 h-3 ${
            isUser 
              ? "right-0 transform translate-x-1 bg-black rounded-bl-full" 
              : "left-0 transform -translate-x-1 bg-white border-l border-b border-gray-100 rounded-br-full"
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;