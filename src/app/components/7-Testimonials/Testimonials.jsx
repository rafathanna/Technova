"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { FaQuoteLeft, FaStar, FaCheckCircle } from "react-icons/fa";
import "./testimonials.css";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="tech-testimonials" id="testimonials">
      <div className="container">
        <div className="portfolio-intro text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-tag"
          >
            {t.testimonials.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            {t.testimonials.title}
          </motion.h2>
        </div>

        <div className="testimonials-grid">
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="testimonial-card-tech"
            >
              <div className="quote-icon-tech">
                <FaQuoteLeft className="mirror-rtl" />
              </div>

              <div className="rating-row">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>

              <p className="testimonial-text">"{item.text}"</p>

              <div className="client-info-tech">
                <div className="avatar-wrapper">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="client-avatar"
                  />
                  <div className="verified-badge" title="Verified Client">
                    <FaCheckCircle />
                  </div>
                </div>
                <div className="client-meta">
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="testimonials-glow-1"></div>
      <div className="testimonials-glow-2"></div>
    </section>
  );
}
