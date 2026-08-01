import React, { useState } from "react";
import { MessageSquare, Send, Bot, User, Sparkles, RefreshCw, Compass, DollarSign, Award, Target } from "lucide-react";
import { ApiService } from "../services/api";

interface CareerCoachProps {
  user: any;
  resume: any;
}

export default function CareerCoach({ user, resume }: CareerCoachProps) {
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "coach",
      text: `Hello ${user?.displayName || "there"}! I am your SkillBridge AI Career Coach. Ask me anything about ATS optimization, salary negotiation, transition strategies, target company interview prep, or recommended certifications.`
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "How do I negotiate salary for a Senior Dev role?",
    "What certifications should I get for Cloud DevOps?",
    "How to transition from QA to Full Stack Engineer?",
    "Top 5 tips to crack FAANG technical interviews",
    "How to optimize my resume for ATS parsers?"
  ];

  const handleSendMessage = async (userText?: string) => {
    const textToSend = userText || inputMessage;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: "user", text: textToSend }];
    setMessages(newMessages);
    if (!userText) setInputMessage("");
    setLoading(true);

    try {
      const skills = resume?.parsedData?.skills ? (Array.isArray(resume.parsedData.skills) ? resume.parsedData.skills : Object.values(resume.parsedData.skills).flat()) : [];
      const res = await ApiService.chatWithCareerCoach({
        message: textToSend,
        conversationHistory: newMessages,
        userContext: {
          displayName: user?.displayName,
          skills
        }
      });
      setMessages((prev) => [...prev, { sender: "coach", text: res.text }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "coach", text: "I'm sorry, I ran into an error generating a response. Please try asking again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <Bot className="w-5 h-5 text-[#6D5DF6]" />
          <span>AI Career Coach &amp; Executive Mentor</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Personal 24/7 AI mentor for career progression, salary negotiation, interview strategies, and certification roadmaps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Quick Prompts Sidebar */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2 flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-[#6D5DF6]" />
            <span>Recommended Topics</span>
          </h3>

          <div className="space-y-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="w-full text-left p-2.5 rounded-xl border border-[var(--color-border)] hover:border-[#6D5DF6]/30 bg-[var(--color-bg-page)]/50 hover:bg-[#6D5DF6]/5 transition duration-150 cursor-pointer text-[10.5px] font-sans font-semibold text-[var(--color-text-primary)] leading-snug"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 glass-card p-6 space-y-4 flex flex-col justify-between min-h-[500px]">
          {/* Chat Messages */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    m.sender === "user"
                      ? "bg-gradient-to-tr from-[#6D5DF6] to-[#8B5CF6] text-white"
                      : "bg-[#6D5DF6]/10 text-[#6D5DF6] border border-[#6D5DF6]/20"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed font-sans font-medium whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-[#6D5DF6] text-white rounded-tr-none shadow-md"
                      : "bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#6D5DF6]/10 text-[#6D5DF6] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[var(--color-bg-page)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-tertiary)] flex items-center space-x-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#6D5DF6]" />
                  <span>Coach is formulating recommendations...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-3 border-t border-[var(--color-border)] pt-4"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask your AI Career Coach anything..."
              className="flex-1 clay-input px-4 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
