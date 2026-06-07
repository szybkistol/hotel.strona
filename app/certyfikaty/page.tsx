"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Certificate {
  id: string;
  src: string;
  title: string;
}

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Scroll listener for header opacity/shrink
  useEffect(() => {
    const handleScroll = () => {
      const contentSection = document.getElementById("content");
      const navbarHeight = 80;
      if (contentSection) {
        setIsScrolled(contentSection.getBoundingClientRect().top <= navbarHeight);
      } else {
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "O nas", href: "/#about" },
    { label: "Wymagania", href: "/#requirements" },
    { label: "Cennik", href: "/#pricing" },
    { label: "Rezerwacja", href: "/#booking" },
    { label: "Kontakt", href: "/#contact" },
    { label: "Galeria", href: "/galeria" },
    { label: "Certyfikaty", href: "/certyfikaty" },
  ];

  const certificates: Certificate[] = [
    { id: "cert-1", src: "/certyfikaty/certyfikat 1.jpg", title: "Certyfikat #1" },
    { id: "cert-2", src: "/certyfikaty/certyfikat 2.jpg", title: "Certyfikat #2" },
    { id: "cert-3", src: "/certyfikaty/certyfikat3.jpg", title: "Certyfikat #3" },
    { id: "cert-4", src: "/certyfikaty/certyfikat 4.jpg", title: "Certyfikat #4" },
    { id: "cert-5", src: "/certyfikaty/certyfikat 5.jpg", title: "Certyfikat #5" },
    { id: "cert-6", src: "/certyfikaty/certyfikat 6.jpg", title: "Certyfikat #6" },
    { id: "cert-7", src: "/certyfikaty/certyfikat 7.jpg", title: "Certyfikat #7" },
    { id: "cert-8", src: "/certyfikaty/certyfikat 8.jpg", title: "Certyfikat #8" },
    { id: "cert-9", src: "/certyfikaty/certyfikat 9.jpg", title: "Certyfikat #9" },
    { id: "cert-10", src: "/certyfikaty/certyfikat 10.jpg", title: "Certyfikat #10" },
    { id: "cert-11", src: "/certyfikaty/certyfikat 11.jpg", title: "Certyfikat #11" },
    { id: "cert-12", src: "/certyfikaty/certyfikat 12.jpg", title: "Certyfikat #12" },
    { id: "cert-13", src: "/certyfikaty/certyfikat 13.jpg", title: "Certyfikat #13" },
    { id: "cert-14", src: "/certyfikaty/certyfikat 14.jpg", title: "Certyfikat #14" },
    { id: "cert-15", src: "/certyfikaty/certyfikat 15.jpg", title: "Certyfikat #15" },
  ];

  const filteredCertificates = certificates;

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed pb-0 font-body-md min-h-screen overflow-x-hidden">
      
      {/* Navigation Shell */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-surface-bright/95 backdrop-blur-md border-b border-outline-variant/20 shadow-md shadow-primary/5 py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}>
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-margin-desktop w-full">
          <Link
            href="/"
            className={`font-headline-md text-headline-md font-bold tracking-tight transition-colors duration-300 ${
              isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
            }`}
          >
            Hotel z Lasów Corso
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-gutter items-center">
            {navLinks.map((link) => {
              const isActive = link.label === "Certyfikaty";
              return (
                <Link
                  key={link.label}
                  className={`font-label-md text-label-md transition-all duration-300 cursor-pointer ${
                    isActive
                      ? isScrolled
                        ? "text-primary border-b-2 border-secondary pb-1"
                        : "text-white border-b-2 border-white pb-1"
                      : isScrolled
                        ? "text-on-surface-variant hover:text-secondary"
                        : "text-white/80 hover:text-white"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#booking"
              className={`px-6 py-2 rounded-lg font-label-md text-label-md active:scale-95 transition-all duration-300 cursor-pointer shadow-sm ${
                isScrolled
                  ? "bg-primary text-on-primary hover:bg-primary-container"
                  : "bg-white text-primary hover:bg-white/90"
              }`}
            >
              Zarezerwuj Pobyt
            </Link>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <span
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`material-symbols-outlined cursor-pointer text-3xl select-none transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface-bright border-b border-outline-variant/20 px-margin-desktop py-6 flex flex-col gap-4 animate-fade-in shadow-lg">
            {navLinks.map((link) => {
              const isActive = link.label === "Certyfikaty";
              return (
                <Link
                  key={link.label}
                  className={`font-label-md text-label-md py-2 border-b border-surface-container-low transition-colors ${
                    isActive ? "text-primary font-bold" : "text-on-surface-variant"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-on-primary w-full py-3 rounded-lg font-label-md text-label-md active:scale-95 mt-2 text-center"
            >
              Zarezerwuj Pobyt
            </Link>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-[45vh] min-h-[420px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Budynek i tereny Hotel z Lasów Corso"
              src="/hero-bg.jpg"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30"></div>
            {/* Smooth transition bottom fade to light green */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#eef4f0] to-transparent pointer-events-none"></div>
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-margin-desktop w-full pt-28 md:pt-12">
            <div className="max-w-2xl text-on-primary">
              <span className="text-secondary-fixed-dim font-label-md uppercase tracking-[0.2em] mb-2 block font-semibold">
                Kwalifikacje i Wiedza
              </span>
              <h1 className="font-headline-xl text-[38px] md:text-[56px] lg:text-[68px] mb-stack-sm leading-tight">
                Certyfikaty i Szkolenia
              </h1>
              <p className="font-body-lg text-[16px] md:text-[20px] lg:text-[22px] opacity-90 leading-relaxed max-w-xl">
                Bezpieczeństwo i dobrostan Twojego przyjaciela to nasza pasja poparta profesjonalnym przygotowaniem i latami nauki.
              </p>
            </div>
          </div>
        </section>
 
          {/* Content Section */}
          <section id="content" className="py-stack-lg bg-gradient-to-b from-[#eef4f0] to-surface-bright">
          <div className="max-w-[1280px] mx-auto px-margin-desktop">
            
            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-white rounded-3xl overflow-hidden border border-outline-variant/15 soft-card-shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low p-4 flex items-center justify-center">
                    <img
                      src={cert.src}
                      alt={cert.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-label-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">zoom_in</span> Powiększ certyfikat
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCertificates.length === 0 && (
              <div className="text-center py-16 text-on-surface-variant/60 font-body-md">
                Brak certyfikatów w tej kategorii.
              </div>
            )}

          </div>
        </section>

        {/* Call To Action */}
        <section className="py-stack-lg bg-surface-container-low/60 border-t border-surface-container">
          <div className="max-w-[1280px] mx-auto px-margin-desktop text-center max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">
              Zaufaj certyfikowanym opiekunom
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
              Kwalifikacje naszej kadry są dla Ciebie gwarancją, że Twój pies przebywa w najlepszych rękach.
              Dbamy o relacje, dietę i bezpieczeństwo z zachowaniem najwyższych standardów.
            </p>
            <Link
              href="/#booking"
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all shadow-lg active:scale-95 cursor-pointer inline-block"
            >
              Zarezerwuj Pobyt
            </Link>
          </div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="bg-surface-container-high border-t border-outline-variant/10">
        <div className="max-w-[1280px] mx-auto px-margin-desktop py-stack-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-2">
              <div className="font-headline-sm text-headline-sm font-bold text-primary">
                Hotel z Lasów Corso
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
                Hotel dla psów, gdzie komfort i bezpieczeństwo Twojego pupila są naszym priorytetem.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
              <div className="flex gap-6">
                <Link href="/certyfikaty" className="text-label-sm text-on-surface-variant hover:text-secondary underline transition-all font-medium">
                  Certyfikaty i Szkolenia
                </Link>
                <Link href="/polityka-prywatnosci" className="text-label-sm text-on-surface-variant hover:text-secondary underline transition-all font-medium">
                  Polityka Prywatności
                </Link>
                <Link href="/regulamin" className="text-label-sm text-on-surface-variant hover:text-secondary underline transition-all font-medium">
                  Regulamin Usług
                </Link>
                <a href="/Umowa Powierzenia Psa.pdf" target="_blank" rel="noopener noreferrer" className="text-label-sm text-on-surface-variant hover:text-secondary underline transition-all font-medium">
                  Umowa
                </a>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
                © {new Date().getFullYear()} Hotel z Lasów Corso.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-outline-variant/20 max-h-[90vh] flex flex-col animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-surface-container-high bg-surface-bright">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary px-3 py-1 bg-secondary-container/20 rounded-full">
                Podgląd Certyfikatu
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-xl select-none">close</span>
              </button>
            </div>
            {/* Image Container */}
            <div className="bg-[#FAF8F5] flex-1 flex items-center justify-center overflow-hidden p-6 max-h-[75vh]">
              <img
                src={selectedCert.src}
                alt={selectedCert.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
