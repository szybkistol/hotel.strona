"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface PolicySection {
  id: string;
  title: string;
  paragraphs: string[];
}

export default function PrivacyPage() {
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

  const policySections: PolicySection[] = [
    {
      id: "administrator-danych",
      title: "§ 1. Administrator Danych Osobowych",
      paragraphs: [
        "Administratorem danych osobowych Właścicieli psów korzystających z usług hotelu jest Hotel z Lasów Corso, z siedzibą pod adresem Sosnowo 20, 56-500 Wioska.",
        "W sprawach związanych z przetwarzaniem danych osobowych oraz realizacją praw wynikających z RODO, można kontaktować się z Administratorem drogą mailową: kasiasiudy@gmail.com lub telefonicznie pod numerem: +48 504 239 097."
      ]
    },
    {
      id: "cel-przetwarzania",
      title: "§ 2. Cel i Podstawa Prawna Przetwarzania",
      paragraphs: [
        "Dane osobowe przetwarzane są w celu rezerwacji oraz realizacji umowy o świadczenie usług opieki nad psem (Art. 6 ust. 1 lit. b RODO).",
        "Przetwarzanie danych jest również niezbędne do wypełnienia obowiązków prawnych ciążących na Administratorze, np. wystawiania rachunków i dokumentów księgowych (Art. 6 ust. 1 lit. c RODO).",
        "Dane mogą być również przetwarzane w celu kontaktu telefonicznego lub mailowego, w tym informowania o stanie zdrowia i samopoczuciu psa w trakcie pobytu (Art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes Administratora)."
      ]
    },
    {
      id: "zakres-danych",
      title: "§ 3. Zakres Przetwarzanych Danych",
      paragraphs: [
        "W celu dokonania rezerwacji i realizacji umowy Administrator przetwarza następujące dane: imię i nazwisko właściciela, numer telefonu, adres e-mail oraz informacje o psie (imię, rasa, wiek, wymagania dietetyczne, stan zdrowia, nawyki).",
        "Podanie danych jest dobrowolne, ale niezbędne do zawarcia i realizacji umowy opieki nad psem w Hotelu."
      ]
    },
    {
      id: "okres-przechowywania",
      title: "§ 4. Okres Przechowywania Danych",
      paragraphs: [
        "Dane osobowe będą przechowywane przez okres niezbędny do realizacji umowy opieki, a po jej zakończeniu przez okres wymagany przepisami prawa (np. podatkowego i księgowego - 5 lat).",
        "W przypadku przetwarzania danych na podstawie uzasadnionego interesu, dane będą przetwarzane do czasu wniesienia sprzeciwu przez osobę, której dane dotyczą."
      ]
    },
    {
      id: "prawa-uzytkownikow",
      title: "§ 5. Prawa Osób, Których Dane Dotyczą",
      paragraphs: [
        "Właścicielowi danych przysługuje prawo dostępu do treści swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych oraz prawo wniesienia sprzeciwu.",
        "Właściciel ma również prawo wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych), jeśli uzna, że przetwarzanie jego danych narusza przepisy RODO."
      ]
    },
    {
      id: "odbiorcy-danych",
      title: "§ 6. Odbiorcy Danych i Bezpieczeństwo",
      paragraphs: [
        "Odbiorcami danych osobowych mogą być podmioty świadczące usługi na rzecz Administratora (np. biuro rachunkowe, dostawca usług IT, lekarz weterynarii w przypadku konieczności nagłej interwencji medycznej).",
        "Administrator dokłada wszelkich starań, aby zapewnić najwyższy poziom bezpieczeństwa przetwarzanych danych osobowych i chronić je przed nieuprawnionym dostępem."
      ]
    }
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
              const linkClasses = `font-label-md text-label-md transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "text-on-surface-variant hover:text-secondary"
                  : "text-white/80 hover:text-white"
              }`;

              return (
                <Link
                  key={link.label}
                  className={linkClasses}
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                className="font-label-md text-label-md py-2 border-b border-surface-container-low transition-colors text-on-surface-variant"
                onClick={() => setIsMobileMenuOpen(false)}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
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
        <section className="relative h-[35vh] min-h-[320px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Teren leśny Hotel z Lasów Corso"
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
                Ochrona Danych
              </span>
              <h1 className="font-headline-xl text-[38px] md:text-[56px] lg:text-[68px] mb-stack-sm leading-tight">
                Polityka Prywatności
              </h1>
              <p className="font-body-lg text-[16px] md:text-[20px] lg:text-[22px] opacity-90 leading-relaxed max-w-xl">
                Zasady przetwarzania danych osobowych oraz dbałość o prywatność Właścicieli i ich czworonożnych przyjaciół.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section id="content" className="py-stack-lg bg-gradient-to-b from-[#eef4f0] to-surface-bright">
          <div className="max-w-[1280px] mx-auto px-margin-desktop">
            
            <div className="grid lg:grid-cols-12 gap-gutter items-start">
              
              {/* Table of Contents - Sidebar */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-outline-variant/15 soft-card-shadow sticky top-28 hidden lg:block">
                <h3 className="font-headline-md text-primary font-bold mb-4 text-lg">Spis Treści</h3>
                <nav className="flex flex-col gap-2">
                  {policySections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => handleScrollToSection(e, section.id)}
                      className="text-sm font-label-md text-on-surface-variant hover:text-secondary py-2 border-b border-surface-container transition-colors"
                    >
                      {section.title.split(".")[0] + "." + section.title.split(".")[1]}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Mobile Table of Contents */}
              <div className="lg:hidden bg-white p-6 rounded-2xl border border-outline-variant/15 soft-card-shadow mb-6">
                <h3 className="font-headline-md text-primary font-bold mb-3 text-base">Przejdź do sekcji:</h3>
                <div className="flex flex-wrap gap-2">
                  {policySections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => handleScrollToSection(e, section.id)}
                      className="text-xs px-3 py-1.5 bg-surface-container hover:bg-secondary-container/20 text-on-surface-variant rounded-full transition-all"
                    >
                      {section.title.split(".")[0] + "."}
                    </a>
                  ))}
                </div>
              </div>

              {/* Legal Text - Main Card */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 soft-card-shadow border border-outline-variant/10 space-y-12">
                
                {policySections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                    <h2 className="font-headline-lg text-primary font-bold border-b border-secondary/15 pb-2">
                      {section.title}
                    </h2>
                    <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed">
                      {section.paragraphs.map((p, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <span className="text-secondary font-bold shrink-0 mt-0.5">•</span>
                          <p>{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
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

    </div>
  );
}
