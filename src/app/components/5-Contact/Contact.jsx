"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import {
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelopeOpenText,
  FaMapMarkedAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./contact.css";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(
        `Error: ${error.message}. Please make sure your Firebase Firestore rules allow writes.`,
      );
    }
    setLoading(false);
  };

  return (
    <section className="futuristic-contact" id="contact">
      <div className="container contact-grid-tech">
        <div className="contact-info-tech">
          <span className="section-tag">{t.contact.label}</span>
          <h2 className="section-title">
            Ready to build <br />{" "}
            <span className="text-gradient">the future?</span>
          </h2>
          <p className="contact-sub-tech">{t.contact.desc}</p>

          <div className="contact-methods-tech">
            {[
              {
                icon: <FaPhoneAlt />,
                val: "+20 100 123 4567",
                label: "Direct Phone",
              },
              {
                icon: <FaEnvelopeOpenText />,
                val: "hello@technova.com",
                label: "Email Inquiry",
              },
              {
                icon: <FaMapMarkedAlt />,
                val: "Beni Suef, Egypt",
                label: "Global HQ",
              },
            ].map((m, i) => (
              <motion.div
                key={i}
                className="method-card-tech"
                whileHover={{ x: 10 }}
              >
                <div className="method-icon-tech">{m.icon}</div>
                <div className="method-text-tech">
                  <span>{m.label}</span>
                  <p>{m.val}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="contact-form-tech"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className="form-inner-tech">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                >
                  <div className="tech-input-group">
                    <input
                      type="text"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <label>{t.contact.form.name}</label>
                    <div className="input-line"></div>
                  </div>

                  <div className="tech-input-group">
                    <input
                      type="email"
                      required
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <label>{t.contact.form.email}</label>
                    <div className="input-line"></div>
                  </div>

                  <div className="tech-input-group">
                    <textarea
                      required
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                    <label>{t.contact.form.message}</label>
                    <div className="input-line"></div>
                  </div>

                  <button
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    {loading ? "Sending..." : t.contact.form.submit}{" "}
                    <FaPaperPlane size={14} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-feedback"
                >
                  <FaCheckCircle className="success-icon" />
                  <h3>Success!</h3>
                  <p>Your message has been received.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Glass Decoration */}
          <div className="form-glow"></div>
        </motion.div>
      </div>
    </section>
  );
}
