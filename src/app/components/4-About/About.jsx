"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import "./about.css";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="tech-about" id="about">
      <div className="container about-grid-modern">
        {/* Left: The Visual Core */}
        <div className="about-visual-modern">
          <div className="abstract-glow"></div>
          <motion.div
            className="data-box"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <img src="/images/about.png" alt="Tech" className="tech-img-main" />
            <div className="floating-badge-tech">
              <span>{t.about.aiBadge}</span>
            </div>
          </motion.div>
        </div>

        {/* Right: The Content */}
        <div className="about-content-modern">
          <span className="section-tag">{t.about.label}</span>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="about-p-main">{t.about.p1}</p>
          <p className="about-p-sub">{t.about.p2}</p>

          <div className="tech-stats-row">
            {[
              { label: t.about.stats.experience, val: "05", suffix: "Yrs" },
              { label: t.about.stats.projects, val: "100", suffix: "+" },
              { label: t.about.stats.support, val: "24", suffix: "/7" },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="tech-stat-box"
                whileHover={{ y: -5, borderColor: "var(--primary-accent)" }}
              >
                <div className="tech-stat-val-row">
                  <span className="stat-num">{s.val}</span>
                  <span className="stat-suf">{s.suffix}</span>
                </div>
                <p className="stat-label-modern">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            style={{ marginTop: "40px" }}
          >
            {t.about.learnMore}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
