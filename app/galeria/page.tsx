"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { dogGuests } from "./dogGuests";

interface GalleryItem {
  id: string;
  src: string;
  category: "dogs" | "hotel";
  title: string;
  description: string;
}

export default function GalleryPage() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "dogs" | "hotel">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedItem]);

  const navLinks = [
    { label: "O nas", href: "/#about" },
    { label: "Wymagania", href: "/#requirements" },
    { label: "Cennik", href: "/#pricing" },
    { label: "Rezerwacja", href: "/#booking" },
    { label: "Kontakt", href: "/#contact" },
    { label: "Galeria", href: "/galeria" },
    { label: "Certyfikaty", href: "/certyfikaty" },
  ];

  const hotelItems: GalleryItem[] = [
    {
      id: "hotel-1",
      src: "/gallery-hotel-1.png",
      category: "hotel",
      title: "Budynek Hotelu",
      description: "Nowoczesny drewniany domek otoczony sosnowym lasem.",
    },
    {
      id: "hotel-2",
      src: "/gallery-hotel-2.png",
      category: "hotel",
      title: "Luksusowy Pokój dla Psa",
      description: "Przytulne i bezpieczne wnętrze dostosowane do potrzeb pupila.",
    },
    {
      id: "hotel-3",
      src: "/gallery-hotel-3.png",
      category: "hotel",
      title: "Leśny Wybieg",
      description: "Ogrodzony teren do bezpiecznych zabaw na świeżym powietrzu.",
    },
    {
      id: "hotel-4",
      src: "/gallery-hotel-4.png",
      category: "hotel",
      title: "Recepcja Hotelu",
      description: "Przytulne lobby wykończone naturalnym drewnem.",
    },
  ];

  const galleryItems: GalleryItem[] = [...dogGuests, ...hotelItems];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed pb-0 font-body-md min-h-screen overflow-x-hidden">
      
      {/* Navigation Shell */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        selectedItem
          ? "hidden"
          : isScrolled || isMobileMenuOpen
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
              const isActive = link.label === "Galeria";
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
              const isActive = link.label === "Galeria";
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
              alt="Tereny zielone Hotel z Lasów Corso"
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
                Zdjęcia Hotelu i Gości
              </span>
              <h1 className="font-headline-xl text-[38px] md:text-[56px] lg:text-[68px] mb-stack-sm leading-tight">
                Galeria
              </h1>
              <p className="font-body-lg text-[16px] md:text-[20px] lg:text-[22px] opacity-90 leading-relaxed max-w-xl">
                Zobacz jak spędzają czas nasi psi goście i jak wyglądają udogodnienia w naszym leśnym hotelu.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section id="content" className="py-stack-lg bg-gradient-to-b from-[#eef4f0] to-surface-bright">
          <div className="max-w-[1280px] mx-auto px-margin-desktop">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-2.5 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer border ${
                  activeFilter === "all"
                    ? "bg-primary text-on-primary border-primary shadow-md shadow-primary/10"
                    : "bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/50 hover:text-primary"
                }`}
              >
                Wszystkie
              </button>
              <button
                onClick={() => setActiveFilter("dogs")}
                className={`px-5 py-2.5 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer border ${
                  activeFilter === "dogs"
                    ? "bg-primary text-on-primary border-primary shadow-md shadow-primary/10"
                    : "bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/50 hover:text-primary"
                }`}
              >
                Nasi Goście
              </button>
              <button
                onClick={() => setActiveFilter("hotel")}
                className={`px-5 py-2.5 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer border ${
                  activeFilter === "hotel"
                    ? "bg-primary text-on-primary border-primary shadow-md shadow-primary/10"
                    : "bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/50 hover:text-primary"
                }`}
              >
                Nasz Hotel
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white rounded-3xl overflow-hidden border border-outline-variant/15 soft-card-shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-label-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">zoom_in</span> Powiększ zdjęcie
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
                Profesjonalny hotel dla psów, gdzie komfort i bezpieczeństwo Twojego pupila są naszym priorytetem.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
              <div className="flex gap-6">
                <Link href="/certyfikaty" className="text-label-sm text-on-surface-variant hover:text-secondary underline transition-all font-medium">
                  Certyfikaty i Szkolenia
                </Link>
                <Link href="/regulamin" className="text-label-sm text-on-surface-variant hover:text-secondary underline transition-all font-medium">
                  Regulamin Usług
                </Link>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
                © {new Date().getFullYear()} Hotel z Lasów Corso. Built with warmth and care.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-outline-variant/20 max-h-[90vh] flex flex-col animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-surface-container-high bg-surface-bright">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary px-3 py-1 bg-secondary-container/20 rounded-full">
                {selectedItem.category === "dogs" ? "Nasz Gość" : "Zdjęcie Hotelu"}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-xl select-none">close</span>
              </button>
            </div>
            {/* Image Container */}
            <div className="bg-black flex-1 flex items-center justify-center overflow-hidden aspect-[4/3] max-h-[60vh]">
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* Description Footer */}
            {selectedItem.category !== "dogs" && (
              <div className="p-6 bg-white border-t border-surface-container-high">
                <h3 className="font-headline-md text-primary font-bold text-xl mb-1">
                  {selectedItem.title}
                </h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
