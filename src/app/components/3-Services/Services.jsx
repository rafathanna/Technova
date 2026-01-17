"use client";
import React from "react";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaRocket,
  FaCloud,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import "./services.css";

const icons = [
  <FaLaptopCode key={0} />,
  <FaMobileAlt key={1} />,
  <FaRocket key={2} />,
  <FaCloud key={3} />,
  <FaShieldAlt key={4} />,
  <FaChartLine key={5} />,
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section className="futuristic-services" id="services">
      <div className="container">
        <div className="services-header text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-tag"
          >
            {t.services.expertise}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            {t.services.title}
          </motion.h2>
          <p className="services-subtitle">{t.services.desc}</p>
        </div>

        <div className="services-bento">
          {t.services.items.map((service, index) => (
            <motion.div
              className="service-tech-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "var(--primary-accent)",
              }}
            >
              <div className="service-icon-glow">{icons[index]}</div>
              <h3 className="service-tech-title">{service.title}</h3>
              <p className="service-tech-desc">{service.desc}</p>

              <div className="card-tech-footer">
                <div className="tech-line"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
