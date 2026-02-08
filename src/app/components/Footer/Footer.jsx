"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { FaTwitter, FaLinkedin, FaGithub, FaBehance } from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="tech-footer">
      <div className="container">
        <div className="footer-top-modern">
          <div className="footer-brand-modern">
            <h2 className="logo-text">
              TECH<span>NOVA</span>
            </h2>
            <p className="footer-tagline">{t.footer.desc}</p>
            <div className="social-row-modern">
              {[FaTwitter, FaLinkedin, FaGithub, FaBehance].map((Icon, i) => (
                <motion.a
                  href="#"
                  key={i}
                  whileHover={{ y: -5, color: "var(--primary-accent)" }}
                  className="social-circle-modern"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="link-col">
              <h4>{t.footer.navTitle}</h4>
              <Link href="/">{t.nav.home}</Link>
              <Link href="/#services">{t.nav.services}</Link>
              <Link href="/#projects">{t.nav.projects}</Link>
              <Link href="/#contact">{t.nav.contact}</Link>
            </div>
            <div className="link-col">
              <h4>{t.footer.servicesTitle}</h4>
              {t.footer.serviceList.map((service, i) => (
                <span key={i}>{service}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom-modern">
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="footer-legal">
            <a href="#">{t.footer.privacy}</a>
            <a href="#">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
