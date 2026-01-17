"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { projectsData } from "../../data/projectsData";

export default function ProjectClient({ category }) {
  const { t } = useLanguage();

  // Find index for translations based on active category
  const catIndex = ["ux-ui", "websites", "mobile-apps"].indexOf(category);
  const deptInfo = t.projects.items[catIndex] || {
    title: "Projects",
    desc: "",
  };

  const items = projectsData[category] || [];

  return (
    <div
      style={{
        padding: "120px 0",
        minHeight: "100vh",
        background: "var(--background-light)",
      }}
    >
      <div className="container">
        <Link
          href="/#projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "30px",
            fontWeight: "bold",
            color: "var(--primary-color)",
          }}
        >
          <FaArrowLeft /> {t.details.back}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            style={{
              color: "var(--primary-color)",
              fontSize: "3rem",
              marginBottom: "1rem",
            }}
          >
            {deptInfo.title}
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "var(--text-muted)",
              marginBottom: "50px",
              maxWidth: "800px",
            }}
          >
            {deptInfo.desc}
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
          }}
        >
          {items.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -15,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              style={{
                background: "var(--card-bg, white)",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  height: "230px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at center, var(--primary-color) 0%, transparent 80%)",
                    opacity: 0.05,
                  }}
                ></div>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "transform 0.5s ease",
                    zIndex: 2,
                  }}
                  className="project-main-img"
                />
              </div>

              {/* Info Container */}
              <div
                style={{
                  padding: "30px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "20px",
                    color: "var(--secondary-color)",
                    fontWeight: "700",
                    lineHeight: "1.4",
                  }}
                >
                  {project.title}
                </h3>

                <div style={{ marginTop: "auto" }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      textDecoration: "none",
                      padding: "15px",
                      fontSize: "1rem",
                      borderRadius: "15px",
                      background: "var(--primary-color)",
                      color: "white",
                      boxShadow: "0 10px 15px -3px rgba(0, 86, 210, 0.3)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <FaExternalLinkAlt size={16} /> {t.details.viewDemo}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
