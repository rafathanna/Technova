"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import "./journey.css";

export default function Journey() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  return (
    <section className="tech-journey" id="journey">
      <div className="container">
        <div className="portfolio-intro text-center">
          <motion.span className="section-tag" whileInView={{ opacity: 1 }}>
            {t.experiences.label}
          </motion.span>
          <motion.h2 className="section-title">{t.experiences.title}</motion.h2>
        </div>

        <div className="journey-timeline">
          {t.experiences.items.map((item, i) => (
            <motion.div
              key={i}
              className={`journey-item ${i % 2 === 0 ? "left" : "right"}`}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? (isRTL ? 50 : -50) : isRTL ? -50 : 50,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="journey-content-card">
                <div className="journey-year">{item.year}</div>
                <h3 className="journey-title">{item.title}</h3>
                <p className="journey-desc">{item.desc}</p>

                {/* Tech Line Connector */}
                <div className="journey-connector"></div>
              </div>

              <div className="journey-dot">
                <div className="dot-inner"></div>
              </div>
            </motion.div>
          ))}

          {/* Main Vertical Line */}
          <div className="timeline-main-line"></div>
        </div>
      </div>
    </section>
  );
}
