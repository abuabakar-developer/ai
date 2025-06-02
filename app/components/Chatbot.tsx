'use client';
import { useState, useEffect, useRef } from "react";
import { SendHorizonal, Mic, ThumbsUp, ThumbsDown, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatbotProps {
  primaryColor?: string;
  welcomeMessage?: string;
  businessName?: string;
}

interface Message {
  from: "user" | "bot";
  text: string;
}

export default function Chatbot({
  primaryColor = "#3b82f6",
  welcomeMessage = "Hi! How can I help you today?",
  businessName = "Talksy AI",
}: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: welcomeMessage }]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const router = useRouter();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show chat icon after 4s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Generate or get userId on mount
  useEffect(() => {
    let uid = localStorage.getItem("userId");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("userId", uid);
    }
  }, []);

  // Fetch chat history when chatbot opens
  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
    }
  }, [isOpen]);

  // Fetch chat history from MongoDB-backed API
  const fetchChatHistory = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`/api/chat/history?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch chat history");

      const data = await res.json();
      if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        setMessages([{ from: "bot", text: welcomeMessage }]);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Send user message to API and save chat to MongoDB
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: "user", text: input.trim() };

    // Add user message and temporary bot typing
    setMessages((prev) => [...prev, userMessage, { from: "bot", text: "typing-dots" }]);
    setInput("");

    try {
      const userId = localStorage.getItem("userId") || "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      const botReply = data.reply || "Sorry, I couldn’t get that.";

      // Replace typing-dots with bot reply
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", text: botReply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", text: "Error: Try again later." },
      ]);
    }
  };

  // Voice recognition logic
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
  };

  const handleBookDemo = () => {
    router.push("/bookingdialog");
  };

  return (
    <div className="fixed z-50 font-sans text-3xl">
      {showIcon && !isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 p-4 rounded-full border-4 border-white shadow-xl text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition-all duration-300"
          aria-label="Open Chatbot"
        >
          💬
        </button>
      ) : null}

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 w-full h-full max-w-[430px] sm:h-[540px] sm:w-[430px] bg-white rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          <div
            className="p-3 text-white font-semibold flex justify-between items-center bg-gradient-to-r from-blue-900 to-blue-950"
            style={{ backgroundColor: primaryColor }}
          >
            <span>💬{businessName}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-white rounded-full hover:bg-white/10 transition-all duration-200 ease-in-out hover:scale-110 shadow-sm"
              aria-label="Close Chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <div
                  className={`max-w-xs break-words ${
                    msg.from === "user"
                      ? "bg-blue-100 text-right self-end ml-auto rounded-xl p-2"
                      : "bg-gray-200 text-left self-start mr-auto rounded-xl p-2"
                  }`}
                >
                  {msg.text === "typing-dots" ? (
                    <div className="flex space-x-1 items-center h-5">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></span>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>

                {msg.from === "bot" && msg.text !== "typing-dots" && (
                  <div className="flex gap-2 items-center ml-2 text-gray-500 text-xs">
                    <button
                      onClick={() => console.log("Liked message", i)}
                      className="hover:text-green-600 transition"
                      title="Like"
                      aria-label="Like message"
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <button
                      onClick={() => console.log("Disliked message", i)}
                      className="hover:text-red-600 transition"
                      title="Dislike"
                      aria-label="Dislike message"
                    >
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white space-y-2">
            <div className="flex items-center rounded-full border focus-within:ring-2 focus-within:ring-blue-500 px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message or speak..."
                className="flex-1 bg-transparent text-sm focus:outline-none px-2"
                aria-label="Chat input"
              />
              <button
                onClick={startListening}
                title="Speak"
                className={`p-2 rounded-full ${
                  isListening
                    ? "text-red-500 animate-pulse"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                aria-label="Start voice input"
              >
                <Mic size={18} />
              </button>
              <button
                onClick={sendMessage}
                title="Send"
                className="ml-2 p-2 text-blue-600 hover:text-blue-800"
                aria-label="Send message"
              >
                <SendHorizonal size={18} />
              </button>
            </div>

            {/* Book Demo Button */}
            <div className="flex px-1 pb-1">
              <button
                onClick={handleBookDemo}
                className="w-full text-sm font-medium py-2 px-4 rounded-full bg-blue-900 text-white hover:bg-blue-950 transition-colors duration-200"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

