"use client";
import { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import "./chatbot.css";
import "./chatbot-mobile.css";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { t, lang } = useLanguage();
  const messagesEndRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text:
            lang === "en"
              ? "👋 Hi there! How can I help you today?"
              : "👋 أهلاً بك! كيف يمكنني مساعدتك اليوم؟",
          sender: "bot",
        },
      ]);
    }
  }, [lang]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const suggestedQuestions = {
    en: [
      "Our Services",
      "Contact Info",
      "Pricing",
      "About Us",
      "Careers",
      "Location",
      "Support",
    ],
    ar: [
      "خدماتنا",
      "معلومات الاتصال",
      "الأسعار",
      "من نحن",
      "وظائف",
      "الموقع",
      "الدعم الفني",
    ],
  };

  const handleSendMessage = (e, content = null) => {
    if (e) e.preventDefault();
    const text = content || inputText;
    if (!text.trim()) return;

    // Add user message
    const newMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(newMessage.text, lang);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input, language) => {
    const lowerInput = input.toLowerCase();

    if (language === "en") {
      if (lowerInput.includes("hello") || lowerInput.includes("hi"))
        return "Hello! Welcome to Technova. What are you looking for?";
      if (lowerInput.includes("service") || lowerInput.includes("offer"))
        return "We offer Web Development, Mobile Apps, UX/UI Design, and more. Check our Services section!";
      if (lowerInput.includes("contact") || lowerInput.includes("email"))
        return "You can contact us via the form below or email at support@technova.com.";
      if (lowerInput.includes("price") || lowerInput.includes("cost"))
        return "It depends on the project scope. Let's discuss your requirements!";
      if (lowerInput.includes("about") || lowerInput.includes("who are you"))
        return "We are Technova, a leading software company transforming ideas into reality.";
      if (lowerInput.includes("career") || lowerInput.includes("job"))
        return "We are always looking for talent! Send your CV to careers@technova.com.";
      if (lowerInput.includes("location") || lowerInput.includes("address"))
        return "We are located in Beni Suef, Egypt.";
      if (lowerInput.includes("support"))
        return "For existing clients, please visit our Support Portal or call +20 100 123 4567.";
      return "Thanks for your message! Our team will get back to you shortly.";
    } else {
      if (lowerInput.includes("مرحبا") || lowerInput.includes("اهلا"))
        return "أهلاً بك في تكنوفا. كيف يمكنني خدمتك؟";
      if (lowerInput.includes("خدمات") || lowerInput.includes("عمل"))
        return "نقدم خدمات تطوير الويب، تطبيقات الجوال، وتصميم UX/UI. تفقد قسم الخدمات!";
      if (lowerInput.includes("تواصل") || lowerInput.includes("ايميل"))
        return "يمكنك التواصل معنا عبر النموذج أدناه أو على البريد support@technova.com.";
      if (lowerInput.includes("سعر") || lowerInput.includes("تكلفة"))
        return "يعتمد ذلك على نطاق المشروع. دعنا نناقش متطلباتك!";
      if (lowerInput.includes("من نحن") || lowerInput.includes("عن الشركة"))
        return "نحن تكنوفا، شركة برمجيات رائدة نحول الأفكار إلى واقع ملموس.";
      if (lowerInput.includes("وظائف") || lowerInput.includes("توظيف"))
        return "نبحث دائماً عن المواهب! أرسل سيرتك إلى careers@technova.com.";
      if (lowerInput.includes("موقع") || lowerInput.includes("عنوان"))
        return "يقع مكتبنا في بني سويف، مصر.";
      if (lowerInput.includes("دعم"))
        return "للعملاء الحاليين، يرجى زيارة بوابة الدعم أو الاتصال على 4567 123 100 20+.";
      return "شكراً لرسالتك! سيقوم فريقنا بالرد عليك قريباً.";
    }
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="header-info">
                <FaRobot size={22} />
                <h3>{lang === "en" ? "Technova Assistant" : "مساعد تكنوفا"}</h3>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="typing">
                  {lang === "en" ? "Typing..." : "يكتب الآن..."}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="chatbot-suggestions">
              {suggestedQuestions[lang].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(null, q)}
                  className="suggestion-btn"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form className="chatbot-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder={
                  lang === "en" ? "Type a message..." : "اكتب رسالة..."
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <FaPaperPlane size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>
    </div>
  );
}
