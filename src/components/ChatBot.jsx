import React, { useState, useRef, useEffect } from "react";
import { MdChat, MdClose, MdSend, MdDragIndicator } from "react-icons/md";

// Use the latest Gemini model - gemini-1.5-flash is faster and more reliable
// Available models: gemini-1.5-flash, gemini-1.5-pro, gemini-pro
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chat, setChat] = useState([{ from: "bot", text: "Hi! I'm your CableSetGo AI assistant. How can I help you today?" }]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const chatEndRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  // Get Gemini API key from environment
  const getApiKey = () => {
    // Check if CSG_ENV is loaded
    if (typeof window !== 'undefined' && window.CSG_ENV?.GEMINI_API_KEY) {
      console.log("Using API key from window.CSG_ENV");
      return window.CSG_ENV.GEMINI_API_KEY;
    }
    // Fallback API key
    const fallbackKey = "AIzaSyAwx7yi8JsOzyZEn07EN8iHT0iXyzG9F8M";
    console.log("Using fallback API key");
    return fallbackKey;
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Ensure CSG_ENV is loaded
  useEffect(() => {
    // Try to load sysenv.js if not already loaded
    if (typeof window !== 'undefined' && !window.CSG_ENV) {
      const script = document.createElement('script');
      script.src = '/assets/js/sysenv.js';
      script.onerror = () => {
        console.warn('Could not load sysenv.js, using fallback API key');
      };
      document.head.appendChild(script);
    }
  }, []);

  // Handle mouse down for dragging (for panel header)
  const handleMouseDown = (e) => {
    if (!isOpen || isMinimized) return;
    // Only allow dragging from header area
    if (e.target.closest('.drag-handle') || e.target.closest('svg')) {
      setIsDragging(true);
      const rect = panelRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      // Check if we've moved more than 5px
      const moved = Math.abs(e.clientX - dragStartPos.x) > 5 || Math.abs(e.clientY - dragStartPos.y) > 5;
      if (moved) {
        hasMovedRef.current = true;
      }
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - (isMinimized || !isOpen ? 80 : 400);
      const maxY = window.innerHeight - (isMinimized || !isOpen ? 60 : 500);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Reset after a short delay to allow onClick to check
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 100);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isOpen, isMinimized, dragStartPos]);

  const sendMessage = async () => {
    if (!msg.trim() || isLoading) return;

    const userMsg = { from: "user", text: msg.trim() };
    setChat((prev) => [...prev, userMsg]);
    setMsg("");
    setIsLoading(true);

    try {
      const apiKey = getApiKey();
      
      if (!apiKey) {
        throw new Error("API key not found. Please check your configuration.");
      }

      console.log("Calling Gemini API...");
      console.log("API Key (first 10 chars):", apiKey.substring(0, 10) + "...");
      console.log("API URL:", GEMINI_API_URL);
      console.log("User message:", userMsg.text);
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timeout after 30 seconds")), 30000)
      );
      
      // Create the fetch promise
      const fetchPromise = fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful assistant for CableSetGo, a cable TV service platform. Help users with questions about plans, payments, service availability, complaints, and general support. Be friendly and concise. User question: ${userMsg.text}`,
                },
              ],
            },
          ],
        }),
      });
      
      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // Get response text first to see what we're dealing with
      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      if (!response.ok) {
        let errorMessage = `API error: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error?.message || errorMessage;
          console.error("API Error details:", errorData);
        } catch (e) {
          console.error("Could not parse error response");
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      console.log("API Response data:", data);
      
      // Handle different response structures
      let botText = null;
      
      if (data.candidates && data.candidates[0]) {
        botText = data.candidates[0].content?.parts?.[0]?.text;
      } else if (data.text) {
        botText = data.text;
      }

      if (!botText) {
        console.error("Unexpected response structure:", data);
        botText = "I'm having trouble processing that. Could you please rephrase your question?";
      }

      setChat((prev) => [...prev, { from: "bot", text: botText }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = error.message || "Unknown error";
      
      setChat((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Sorry, I encountered an error: ${errorMessage}. Please check the console for details or try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsMinimized(true);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Round button when closed or minimized
  if (!isOpen || isMinimized) {
    return (
      <button
        ref={buttonRef}
        className="fixed rounded-full p-4 shadow-2xl text-white bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "64px",
          height: "64px",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={(e) => {
          if (e.button === 0) {
            hasMovedRef.current = false;
            setDragStartPos({ x: e.clientX, y: e.clientY });
            setIsDragging(true);
            const rect = buttonRef.current?.getBoundingClientRect();
            if (rect) {
              setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }
          }
        }}
        onClick={(e) => {
          // Only toggle if we didn't drag
          if (!hasMovedRef.current) {
            toggleChat();
          }
        }}
        aria-label="Open AI Assistant"
      >
        <MdChat size={28} />
      </button>
    );
  }

  // Expanded chat panel
  return (
    <div
      ref={panelRef}
      className="fixed bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 z-50 flex flex-col overflow-hidden backdrop-blur-xl"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "400px",
        height: "500px",
        maxWidth: "calc(100vw - 20px)",
        maxHeight: "calc(100vh - 20px)",
        cursor: isDragging ? "grabbing" : "default",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(102, 126, 234, 0.3)",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header with drag handle */}
      <div
        className="px-4 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white flex items-center justify-between cursor-grab active:cursor-grabbing drag-handle shadow-lg"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 drag-handle">
          <MdDragIndicator size={20} className="drag-handle" />
          <span className="font-semibold drag-handle">CableSetGo AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-white/20 rounded p-1 transition"
            aria-label="Minimize"
          >
            <span className="text-sm">−</span>
          </button>
          <button
            onClick={closeChat}
            className="hover:bg-white/20 rounded p-1 transition"
            aria-label="Close"
          >
            <MdClose size={20} />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50 space-y-3">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`flex ${c.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                c.from === "user"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm shadow-lg"
                  : "bg-slate-700 text-slate-100 border border-slate-600 rounded-bl-sm shadow-md"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{c.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-slate-100 border border-slate-600 rounded-2xl rounded-bl-sm px-4 py-2 shadow-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
        <input
          className="flex-1 border border-slate-600 bg-slate-700 text-slate-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-slate-400"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          disabled={isLoading}
        />
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-4 py-2 hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          onClick={sendMessage}
          disabled={isLoading || !msg.trim()}
        >
          <MdSend size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
