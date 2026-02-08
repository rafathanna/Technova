"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import {
  FaExternalLinkAlt,
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./projects.css";

export default function Projects() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = [
    { name: t.projects.categories[0], id: "All", icon: <FaCode /> },
    { name: t.projects.categories[1], id: "ux-ui", icon: <FaPaintBrush /> },
    {
      name: t.projects.categories[2],
      id: "mobile-apps",
      icon: <FaMobileAlt />,
    },
    { name: t.projects.categories[3], id: "websites", icon: <FaGlobe /> },
  ];

  const filteredItems =
    filter === "All"
      ? t.projects.items
      : t.projects.items.filter((item) => item.category === filter);

  // Reset index when filter changes
  useEffect(() => {
    setIndex(0);
  }, [filter]);

  const nextProject = () =>
    setIndex((prev) => (prev + 1) % filteredItems.length);
  const prevProject = () =>
    setIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
    );

  const getProjectIcon = (cat) => {
    if (cat.includes("ux")) return <FaPaintBrush />;
    if (cat.includes("mobile")) return <FaMobileAlt />;
    if (cat.includes("web")) return <FaGlobe />;
    return <FaCode />;
  };

  return (
    <section className="circular-projects-section" id="projects">
      <div className="container">
        <div className="portfolio-intro text-center">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {t.projects.label}
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t.projects.title}
          </motion.h2>

          <div className="carousel-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-dot ${filter === cat.id ? "active" : ""}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="carousel-outer-wrapper">
          <div className="carousel-viewport">
            <div className="carousel-stage">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredItems.map((project, i) => {
                  const position =
                    (i - index + filteredItems.length) % filteredItems.length;

                  // Only show 5 items for the circle effect
                  if (position > 2 && position < filteredItems.length - 2)
                    return null;

                  let x = 0;
                  let z = 0;
                  let rotateY = 0;
                  let opacity = 0;
                  let scale = 0.5;

                  // Mobile Optimized Offsets
                  const xOffset = isMobile ? 120 : 350;
                  const zOffset = isMobile ? -100 : -200;
                  const farXOffset = isMobile ? 220 : 600;

                  if (position === 0) {
                    // Center
                    x = 0;
                    z = 200;
                    rotateY = 0;
                    opacity = 1;
                    scale = 1;
                  } else if (position === 1) {
                    // Right 1
                    x = xOffset;
                    z = 0;
                    rotateY = -35;
                    opacity = 0.5;
                    scale = 0.8;
                  } else if (position === filteredItems.length - 1) {
                    // Left 1
                    x = -xOffset;
                    z = 0;
                    rotateY = 35;
                    opacity = 0.5;
                    scale = 0.8;
                  } else if (position === 2) {
                    // Right 2
                    x = farXOffset;
                    z = zOffset;
                    rotateY = -50;
                    opacity = 0.2;
                    scale = 0.6;
                  } else if (position === filteredItems.length - 2) {
                    // Left 2
                    x = -farXOffset;
                    z = zOffset;
                    rotateY = 50;
                    opacity = 0.2;
                    scale = 0.6;
                  }

                  return (
                    <motion.div
                      key={project.title}
                      className={`carousel-card ${position === 0 ? "active" : ""}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        x,
                        z,
                        rotateY,
                        opacity,
                        scale,
                        pointerEvents: position === 0 ? "auto" : "none",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                      style={{
                        position: "absolute",
                        transformStyle: "preserve-3d",
                      }}
                      onClick={() => position !== 0 && setIndex(i)}
                    >
                      <div className="card-3d-inner">
                        <div className="card-media">
                          <div className="card-visual-placeholder">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="project-screenshot"
                              />
                            ) : (
                              getProjectIcon(project.category)
                            )}
                          </div>
                          <div className="card-overlay-btn">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaExternalLinkAlt />
                            </a>
                          </div>
                        </div>
                        <div className="card-info">
                          <span className="card-category">
                            {project.category.replace("-", " ")}
                          </span>
                          <h3 className="card-title">{project.title}</h3>
                          <p className="card-desc">
                            {isMobile
                              ? project.desc.substring(0, 60) + "..."
                              : project.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="carousel-nav-controls">
            <button
              className="nav-arrow left"
              onClick={prevProject}
              aria-label="Previous"
            >
              <FaChevronLeft className="mirror-rtl" />
            </button>
            <div className="carousel-pagination">
              {filteredItems.map((_, i) => (
                <div
                  key={i}
                  className={`pag-dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                ></div>
              ))}
            </div>
            <button
              className="nav-arrow right"
              onClick={nextProject}
              aria-label="Next"
            >
              <FaChevronRight className="mirror-rtl" />
            </button>
          </div>
        </div>

        <div className="carousel-progress-container">
          <div className="progress-label">{t.projects.explore}</div>
          <div className="carousel-progress">
            <div
              className="progress-fill"
              style={{
                width: `${((index + 1) / filteredItems.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
