"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaMoon, FaSun } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import "./navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { t, lang, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/#services" },
    { name: t.nav.projects, path: "/#projects" },
    { name: t.nav.contact, path: "/#contact" },
  ];

  return (
    <nav className={`nav-fixed ${scrolled ? "nav-glass" : ""}`}>
      <div className="nav-inner container">
        <Link href="/" className="nav-logo">
          <motion.div whileHover={{ scale: 1.05 }} className="logo-wrapper">
            <img src="/images/tech.png" alt="TN" className="logo-img" />
            <span className="logo-text">
              TECH<span>NOVA</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          {menu.map((item, i) => (
            <Link key={i} href={item.path} className="nav-item">
              <motion.span whileHover={{ y: -2 }}>{item.name}</motion.span>
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button onClick={toggleLanguage} className="action-circle">
            <FaGlobe />
            <span className="lang-hint">{lang === "en" ? "AR" : "EN"}</span>
          </button>

          <button onClick={toggleTheme} className="action-circle">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <Link href="/#contact" className="nav-btn-premium">
            {t.nav.getStarted}
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <div className={`burger ${mobileMenu ? "active" : ""}`}></div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-nav-panel"
          >
            {menu.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                onClick={() => setMobileMenu(false)}
                className="mobile-item"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
