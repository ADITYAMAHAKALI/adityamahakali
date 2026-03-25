"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner, FaLinkedin } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error);
      alert(
        error?.message
          ? `Chat error: ${error.message}`
          : "Something went wrong. Please try again in a moment."
      );
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hide dock on mobile when chatbot is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chatbot-open");
    } else {
      document.body.classList.remove("chatbot-open");
    }
    return () => document.body.classList.remove("chatbot-open");
  }, [isOpen]);

  const handleQuickPrompt = (text: string) => {
    if (handleInputChange) {
      handleInputChange({ target: { value: text } } as any);
      setTimeout(() => {
        const form = document.getElementById("chat-form") as HTMLFormElement;
        if (form) form.requestSubmit();
      }, 50);
    }
  };

  return (
    <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 sm:relative sm:inset-auto mb-0 sm:mb-4 w-full sm:w-[450px] md:w-[600px] h-full sm:h-[600px] sm:max-h-[80vh] bg-[var(--bg)] border-0 sm:border border-[var(--line-soft)] rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden will-change-transform z-50"
          >
            <div className="p-4 bg-[var(--bg-elev)] border-b border-[var(--line-soft)] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaRobot className="text-[var(--accent)] text-xl" />
                <h3 className="font-semibold text-[var(--text)]">Aditya's AI Agent</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-soft)] hover:text-[var(--text)] transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-[var(--text-soft)] mt-10">
                  <FaRobot className="mx-auto text-4xl mb-3 opacity-50" />
                  <p>Hi! I'm Aditya's AI assistant.</p>
                  <p className="text-sm mt-1">Ask me anything about his experience, projects, or skills!</p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      m.role === "user"
                        ? "bg-[var(--accent)] text-[var(--bg)]"
                        : "bg-[var(--chip-bg)] text-[var(--text)]"
                    }`}
                  >
                    <div className="text-sm [&>p:not(:last-child)]:mb-3 [&>ul]:ml-4 [&>ul]:list-disc [&>ul]:mb-3 [&>ol]:ml-4 [&>ol]:list-decimal [&>ol]:mb-3 [&>h3]:font-bold [&>h3]:mb-1 [&>h3]:mt-3 [&>strong]:font-semibold">
                      {m.content.includes("NEXT_QUESTIONS:") ? (
                        <>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.content.split("NEXT_QUESTIONS:")[0]}
                          </ReactMarkdown>
                          <div className="mt-3 flex flex-col gap-2 border-t border-[var(--line-soft)] pt-3">
                            <p className="text-xs font-semibold opacity-70 mb-1">Recommended Follow-ups:</p>
                            {m.content
                              .split("NEXT_QUESTIONS:")[1]
                              .split("\n")
                              .filter((q) => q.trim().startsWith("-"))
                              .map((q, i) => {
                                const cleanQ = q.replace(/^-\s*\[?|\]?$/g, "").trim();
                                return (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleQuickPrompt(cleanQ)}
                                    className="text-left text-xs px-3 py-2 bg-[var(--bg)] text-[var(--text)] rounded-lg hover:bg-[var(--bg-elev)] transition-colors border border-[var(--line-soft)]"
                                  >
                                    💡 {cleanQ}
                                  </button>
                                );
                              })}
                          </div>
                        </>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-[var(--chip-bg)] text-[var(--text)] rounded-2xl px-4 py-3 flex items-center gap-2">
                    <FaSpinner className="animate-spin text-[var(--text-soft)]" />
                    <span className="text-sm text-[var(--text-soft)]">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-[var(--bg)] border-t border-[var(--line-soft)]">
              <form
                id="chat-form"
                onSubmit={handleSubmit}
                className="flex items-center gap-2 bg-[var(--bg-elev)] border border-[var(--line-soft)] rounded-full px-4 py-2"
              >
                <input
                  type="text"
                  value={input || ""}
                  onChange={(e) => {
                    if (handleInputChange) handleInputChange(e);
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text)] placeholder-[var(--text-soft)]"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim()}
                  className="text-[var(--accent)] disabled:opacity-50 transition-opacity"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>
            {/* Quick Prompts CTA */}
            {messages.length === 0 && (
              <div className="bg-[var(--bg)] p-2 text-xs flex flex-wrap gap-2 justify-center pb-3">
                <button 
                  type="button"
                  onClick={() => handleQuickPrompt("What did you do at IBM?")}
                  className="px-2 py-1 bg-[var(--chip-bg)] text-[var(--text)] rounded-full border border-[var(--line-soft)] hover:bg-[var(--chip-bg-2)] transition-colors"
                >
                  IBM Experience
                </button>
                <button 
                  type="button"
                  onClick={() => handleQuickPrompt("Tell me about your AI projects")}
                  className="px-2 py-1 bg-[var(--chip-bg)] text-[var(--text)] rounded-full border border-[var(--line-soft)] hover:bg-[var(--chip-bg-2)] transition-colors"
                >
                  AI Projects
                </button>
                 <a
                    href="https://www.linkedin.com/in/aditya-mahakali-b81758168/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 flex items-center gap-1 bg-[var(--chip-bg)] text-[var(--text)] rounded-full border border-[var(--line-soft)] hover:bg-[var(--chip-bg-2)] transition-colors"
                  >
                   <FaLinkedin /> Connect Check
                 </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mt-4">
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[var(--accent)] rounded-full z-0 pointer-events-none"
          />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-14 h-14 bg-[var(--accent)] hover:brightness-110 text-[var(--bg)] rounded-full shadow-[0_0_25px_var(--accent-strong)] flex items-center justify-center text-2xl transition-all hover:scale-105 active:scale-95"
        >
          {isOpen ? <FaTimes /> : <FaRobot />}
        </button>
      </div>
    </div>
  );
}
