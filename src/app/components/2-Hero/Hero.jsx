"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import Navbar from "../1-NavBar/Navbar";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import "./hero.css";

export default function Hero() {
  const { t, lang } = useLanguage();
  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % t.hero.words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.hero.words.length]);

  return (
    <div className="hero-viewport">
      {/* Background Cinematic Layer */}
      <div className="hero-bg-container">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/cover.png"
        >
          <source src="/images/vid.mp4" type="video/mp4" />
        </video>
        <div className="hero-mask"></div>
        <div className="hero-mesh-gradient"></div>
        {/* Cyber Particles Overlay */}
        <div className="cyber-particles"></div>
      </div>

      <Navbar />

      <main className="hero-main container">
        <div className="hero-layout">
          <div className="hero-text">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="badge-cyber"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {t.hero.words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hero-giant-title"
            >
              {lang === "en" ? (
                <>
                  Future of <br />
                  <span className="text-gradient shimmer-effect">
                    Digital Innovation
                  </span>
                </>
              ) : (
                <>
                  مستقبل <br />
                  <span className="text-gradient shimmer-effect">
                    الابتكار الرقمي
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-desc"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="hero-btns"
            >
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.hero.readMore}{" "}
                <FaArrowRight size={14} className="mirror-rtl" />
              </motion.a>
              <motion.a
                href="#services"
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay size={10} /> {t.hero.ourServices}
              </motion.a>
            </motion.div>
          </div>

          <div className="hero-visual">
            <div className="hologram-setup">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="ring-outer"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="ring-inner"
              ></motion.div>
              <div className="hologram-glow"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Scroll Indicator */}
      <div className="scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mouse"
        >
          <div className="wheel"></div>
        </motion.div>
      </div>
    </div>
  );
}
