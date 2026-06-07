"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active navigation link state (initialized to "" as we start on the hero section)
  const [activeLink, setActiveLink] = useState("");

  // Reservation states
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");

  // Submission status
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Scroll state for transparent/colored navbar
  const [isScrolled, setIsScrolled] = useState(false);

  // State to handle Google Maps interaction overlay to prevent scroll hijacking
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  // Calendar displayed month/year states
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // ScrollSpy effect using IntersectionObserver for high-performance scroll tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when the section occupies the viewport's center area
      threshold: 0,
    };

    const sectionLabels: { [key: string]: string } = {
      about: "O nas",
      requirements: "Wymagania",
      pricing: "Cennik",
      booking: "Rezerwacja",
      contact: "Kontakt",
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id && sectionLabels[id]) {
            setActiveLink(sectionLabels[id]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["about", "requirements", "pricing", "booking", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Detect scroll to the top to highlight the "Galeria" (matching screenshot highlight at the top)
    const handleScroll = () => {
      const hero = document.getElementById("about");
      const navbarHeight = 80;
      const scrolled = hero ? hero.getBoundingClientRect().top <= navbarHeight : window.scrollY > 50;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setActiveLink("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sync inputs when calendar changes
  const handleCalendarDayClick = (dayNum: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

    if (!checkIn || (checkIn && checkOut)) {
      // Start a new selection
      setCheckIn(dateStr);
      setCheckOut("");
    } else {
      // Second click
      const startMs = new Date(checkIn).getTime();
      const clickedMs = new Date(dateStr).getTime();

      if (clickedMs < startMs) {
        // Swap dates if clicked is earlier than check-in
        setCheckOut(checkIn);
        setCheckIn(dateStr);
      } else if (dateStr === checkIn) {
        // Reset check-out if clicked same day
        return;
      } else {
        setCheckOut(dateStr);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phoneNumber || !checkIn || !checkOut) {
      alert("Proszę wypełnić wszystkie wymagane pola.");
      return;
    }
    const phoneRegex = /^(?:\+(?:\d{1,3})[ -]?)?(?:\d[ -]?){9,12}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      alert("Proszę podać poprawny numer telefonu (np. 504 239 097).");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const navLinks = [
    { label: "O nas", href: "#about" },
    { label: "Wymagania", href: "#requirements" },
    { label: "Cennik", href: "#pricing" },
    { label: "Rezerwacja", href: "#booking" },
    { label: "Kontakt", href: "#contact" },
    { label: "Galeria", href: "/galeria" },
    { label: "Certyfikaty", href: "/certyfikaty" },
  ];

  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  // Calendar rendering data dynamically calculated
  const calendarData = React.useMemo(() => {
    const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const prevDays = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      prevDays.push(daysInPrevMonth - i);
    }

    const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const totalCells = firstDayIndex + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    const nextDays = Array.from({ length: remaining }, (_, i) => i + 1);

    return { prevDays, currentDays, nextDays };
  }, [currentYear, currentMonth]);

  const getDayClass = (dayNum: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    const isSelected = checkIn === dateStr || checkOut === dateStr;
    const isInRange =
      checkIn &&
      checkOut &&
      dateStr > (checkIn < checkOut ? checkIn : checkOut) &&
      dateStr < (checkIn < checkOut ? checkOut : checkIn);

    if (isSelected) {
      return "date-selected";
    }
    if (isInRange) {
      return "date-in-range";
    }
    return "";
  };

  // Formatter for showing date beautifully in Polish (e.g. "3 grudnia 2024")
  const formatPolishDate = (dateStr: string) => {
    if (!dateStr) return "Wybierz datę";
    const [year, month, day] = dateStr.split("-");
    const months = [
      "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
      "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];
    const monthIndex = parseInt(month, 10) - 1;
    if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return dateStr;
    return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
  };

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    if (href.startsWith("/")) {
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    setActiveLink(label);
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed pb-0 font-body-md min-h-screen overflow-x-hidden">

      {/* Navigation Shell */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
        ? "bg-surface-bright/95 backdrop-blur-md border-b border-outline-variant/20 shadow-md shadow-primary/5 py-4"
        : "bg-transparent border-b border-transparent py-6"
        }`}>
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-margin-desktop">
          <div className={`font-headline-md text-headline-md font-bold tracking-tight transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
            }`}>
            Hotel z Lasów Corso
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-gutter items-center">
            {navLinks.map((link) => {
              const isActive = activeLink === link.label;
              const isExternal = link.href.startsWith("/");
              const linkClasses = `font-label-md text-label-md transition-all duration-300 cursor-pointer ${isActive
                ? isScrolled
                  ? "text-primary border-b-2 border-secondary pb-1"
                  : "text-white border-b-2 border-white pb-1"
                : isScrolled
                  ? "text-on-surface-variant hover:text-secondary"
                  : "text-white/80 hover:text-white"
                }`;

              if (isExternal) {
                return (
                  <Link
                    key={link.label}
                    className={linkClasses}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a
                  key={link.label}
                  className={linkClasses}
                  onClick={(e) => handleScrollTo(e, link.href, link.label)}
                  href={link.href}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                setActiveLink("Rezerwacja");
                document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-6 py-2 rounded-lg font-label-md text-label-md active:scale-95 transition-all duration-300 cursor-pointer shadow-sm ${isScrolled
                ? "bg-primary text-on-primary hover:bg-primary-container"
                : "bg-white text-primary hover:bg-white/90"
                }`}
            >
              Zarezerwuj Pobyt
            </button>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <span
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`material-symbols-outlined cursor-pointer text-3xl select-none transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
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
              const isExternal = link.href.startsWith("/");
              const linkClasses = `font-label-md text-label-md py-2 border-b border-surface-container-low transition-colors ${activeLink === link.label ? "text-primary font-bold" : "text-on-surface-variant"
                }`;

              if (isExternal) {
                return (
                  <Link
                    key={link.label}
                    className={linkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a
                  key={link.label}
                  className={linkClasses}
                  onClick={(e) => handleScrollTo(e, link.href, link.label)}
                  href={link.href}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setActiveLink("Rezerwacja");
                document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary text-on-primary w-full py-3 rounded-lg font-label-md text-label-md active:scale-95 mt-2"
            >
              Zarezerwuj Pobyt
            </button>
          </div>
        )}
      </nav>

      <main>

        {/* Hero Section */}
        <section className="relative min-h-screen md:h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Budynek ekskluzywnego hotelu dla psów Hotel z Lasów Corso"
              src="/zdjecie-hero.png"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent"></div>
            {/* Smooth transition bottom fade to light green */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#eef4f0] to-transparent pointer-events-none"></div>
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-margin-desktop w-full pt-32 pb-12 md:py-12">
            <div className="max-w-2xl text-on-primary">
              <h1 className="font-headline-xl text-[38px] md:text-[56px] lg:text-[68px] mb-stack-sm leading-tight">
                Drugi Dom Dla Twojego Przyjaciela
              </h1>
              <p className="font-body-lg text-[16px] md:text-[20px] lg:text-[22px] mb-stack-lg opacity-90 leading-relaxed max-w-xl">
                Zapewniamy troskliwą opiekę, leśne spacery, zabawę i odpoczynek w przytulnych, domowych warunkach.
                Bo u nas każdy pies czuje się swobodnie i bezpiecznie.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  onClick={(e) => handleScrollTo(e, "#booking", "Rezerwacja")}
                  className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all shadow-lg border border-white/20 active:scale-95 cursor-pointer text-center"
                  href="#booking"
                >
                  Zarezerwuj Pobyt
                </a>
                <a
                  onClick={(e) => handleScrollTo(e, "#about", "O nas")}
                  className="bg-transparent border-2 border-on-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-on-primary/10 transition-colors active:scale-95 cursor-pointer text-center"
                  href="#about"
                >
                  Dowiedz się więcej
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* O Nas Section */}
        <section className="py-stack-lg bg-gradient-to-b from-[#eef4f0] to-surface-bright scroll-mt-20" id="about">
          <div className="max-w-[1280px] mx-auto px-margin-desktop space-y-12">
            
            {/* Top Grid: Narrative */}
            <div className="grid md:grid-cols-2 gap-stack-lg items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-container rounded-full -z-10 opacity-60"></div>
                <img
                  className="rounded-xl soft-card-shadow w-auto max-w-full h-auto max-h-[480px] mx-auto block border border-surface-container"
                  alt="Zdjęcie przedstawiające opiekuna psa w hotelu Hotel z Lasów Corso"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN9-Bme86Q3KNMiygotxrRjid40m_vfdPpk0Rtf-p12i66bENz-svowlgcfCHIRLAf-lROT4uwlEFWJfSaInxEf9HV55clcaihpPuH0qyADXiMBZ_xL0eOHE84AJ2JDA8VNYVYqnrd996XrOR5SYLu5jJfs9aQh5h3MLg1aDbzrQiD8-WW7ILHOSVTXM-FdpMBm8ari6F9GKI2wv_wic_lufweI39DtGwxB8x8c6V030klOkMLmgJ7egYY6AlcbkLF2zQZQHXt1Q"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-headline-lg text-headline-lg text-primary leading-tight font-bold">
                  Dlaczego Hotel dla psów?
                </h2>
                <div className="space-y-4 text-on-surface-variant text-base leading-relaxed font-body-md">
                  <p className="font-semibold text-primary text-lg leading-relaxed">
                    Bo to świetna sprawa poznawać ciągle nowe psy, nowe zachowania, nowe charaktery, pracować z psami, poszerzać swoją wiedzę...
                  </p>
                  <p>
                    Psami interesowaliśmy się od zawsze – zaczytywaliśmy się książkami w tym temacie, różnymi publikacjami, oglądaliśmy programy telewizyjne i szkoleniowe. 
                    Pomysł na hotel pojawił się już kilkanaście lat temu, jak tylko zamieszkaliśmy w naszym wymarzonym domu na skraju sosnowego lasu, gdzie mogliśmy stworzyć fantastyczne warunki dla psów. Wokół cisza, zieleń, przestrzeń…
                  </p>
                  <p>
                    Jako hodowcy psów rasowych, znający potrzeby zwierząt, wciąż poszerzający i zgłębiający wiedzę z zakresu behawioru, potrzeb oraz dobrostanu psów, w 2018 roku ostatecznie podjęliśmy decyzję o założeniu kameralnego hotelu dla psów. Z czasem nasza oferta się zmieniła, zmieniło się miejsce, poszerzyliśmy i trochę zmodyfikowaliśmy zakres działania. Wszystko po to, by w końcu wiosną 2026 roku móc gościć naszych hotelowych psich gości w dwóch komfortowych budynkach dostosowanych do indywidualnych potrzeb różnych psiaków.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Grid: Infrastructure & Benefits */}
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-surface-container-high/60">
              
              {/* Infrastructure Card */}
              <div className="bg-white rounded-3xl p-8 soft-card-shadow border border-outline-variant/10 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">home</span>
                  <h3 className="font-headline-md text-primary font-bold text-xl">Standardy i budynki</h3>
                </div>
                <div className="space-y-4 text-on-surface-variant text-sm leading-relaxed">
                  <p>
                    W jednym budynku przygotowaliśmy duże, bezpieczne boksy dla większych psów. W drugim, mniejszym budynku, wygodne boksy przeznaczone są dla najmniejszych i średnich psiaków.
                  </p>
                  <p>
                    Obydwa obiekty znajdują się bezpośrednio przy naszym budynku mieszkalnym, na ogrodzonej i w pełni zabezpieczonej posesji z dużymi komfortowymi wybiegami.
                  </p>
                  <p className="bg-primary/5 p-4 rounded-xl border-l-4 border-primary text-xs font-semibold text-primary">
                    Nasz hotel jest całoroczny, dlatego oba budynki są ogrzewane zimą oraz wyposażone w klimatyzację latem, co gwarantuje optymalną temperaturę bez względu na porę roku.
                  </p>
                </div>
              </div>

              {/* Benefits Card */}
              <div className="bg-white rounded-3xl p-8 soft-card-shadow border border-outline-variant/10 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">forest</span>
                  <h3 className="font-headline-md text-primary font-bold text-xl">Co zapewniamy?</h3>
                </div>
                <div className="space-y-4 text-on-surface-variant text-sm leading-relaxed">
                  <p>
                    Nasz hotel „z Lasów Corso” usytuowany jest w uroczej okolicy, otoczony dużą ilością zieleni, lasów, łąk, oddalony od ulic i miejskiego zgiełku. Zapewniamy gościom wyjątkowe warunki:
                  </p>
                  <ul className="space-y-2.5 pl-2">
                    {[
                      { title: "Wykwalifikowana opieka", desc: "pod okiem pasjonatów i specjalistów" },
                      { title: "Kameralna atmosfera", desc: "indywidualne podejście bez stresu i tłoku" },
                      { title: "Wygodny odpoczynek", desc: "bezpieczne boksy z legowiskami" },
                      { title: "Stały kontakt z człowiekiem", desc: "opieka behawioralna i psychologiczna" },
                      { title: "Aktywność i ruch", desc: "codzienne spacery i wesoła zabawa" },
                      { title: "Stymulacja umysłowa", desc: "zabawki edukacyjne i maty węchowe" },
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-primary font-bold shrink-0">•</span>
                        <span>
                          <strong className="text-primary font-semibold">{benefit.title}:</strong> {benefit.desc}.
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Wymagania Section */}
        <section className="py-stack-lg bg-surface-container-low/60 scroll-mt-20" id="requirements">
          <div className="max-w-[1280px] mx-auto px-margin-desktop">
            <div className="text-center mb-stack-lg space-y-2">
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                Wymagania i Co Spakować
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Bezpieczeństwo wszystkich naszych gości jest dla nas priorytetem. Prosimy o przygotowanie
                poniższych dokumentów i rzeczy przed pobytem psa.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-gutter">

              {/* Zdrowie i Dokumenty Card */}
              <div className="bg-surface-container-lowest p-stack-md rounded-xl soft-card-shadow border-l-4 border-primary hover-card-shadow transition-all duration-300">
                <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm flex items-center gap-3 font-semibold">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                  Zdrowie i Dokumenty
                </h3>
                <ul className="space-y-stack-sm">
                  {[
                    "Aktualna książeczka zdrowia z wpisem o szczepieniu przeciw wściekliźnie.",
                    "Profilaktyka przeciw pchłom i kleszczom.",
                    "Aktualne odrobaczenie (potwierdzone w książeczce zdrowia).",
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[20px] pt-0.5 select-none">
                        check_circle
                      </span>
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Co zabrać ze sobą Card */}
              <div className="bg-surface-container-lowest p-stack-md rounded-xl soft-card-shadow border-l-4 border-secondary hover-card-shadow transition-all duration-300">
                <h3 className="font-headline-md text-headline-md text-secondary mb-stack-sm flex items-center gap-3 font-semibold">
                  <span className="material-symbols-outlined text-3xl">luggage</span>
                  Co zabrać ze sobą?
                </h3>
                <ul className="space-y-stack-sm">
                  {[
                    { text: "Karma, którą pies je na co dzień (aby uniknąć rewolucji żołądkowych).", icon: "shopping_bag" },
                    { text: "Ulubione legowisko lub kocyk.", icon: "bed" },
                    { text: "Ulubione zabawki pupila.", icon: "toys" },
                    { text: "Instrukcja dawkowania karmy oraz ewentualnych leków.", icon: "info" },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[20px] pt-0.5 select-none">
                        {item.icon}
                      </span>
                      <span className="leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cennik Section */}
        <section className="py-stack-lg bg-surface-bright scroll-mt-20" id="pricing">
          <div className="max-w-[1280px] mx-auto px-margin-desktop">
            <div className="text-center mb-stack-md">
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold">Cennik</h2>

            </div>

            <div className="flex flex-wrap justify-center gap-gutter pt-4">
              {[
                { title: "Mały Pies", desc: "Waga do 15 kg", price: "70 PLN" },
                { title: "Średni Pies", desc: "Waga 15 - 30 kg", price: "85 PLN" },
                { title: "Duży Pies", desc: "Waga powyżej 30 kg", price: "100 PLN" },
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-low p-8 rounded-xl text-center flex flex-col items-center justify-center w-full max-w-[280px] border border-transparent hover:border-outline-variant hover:scale-[1.03] hover:bg-white soft-card-shadow transition-all duration-300"
                >
                  <h3 className="font-headline-md text-headline-md text-primary mb-1 font-bold">
                    {tier.title}
                  </h3>
                  <p className="text-label-sm text-on-surface-variant mb-5 font-medium">
                    {tier.desc}
                  </p>
                  <div className="text-headline-lg text-secondary font-bold">
                    {tier.price}{" "}
                    <span className="text-body-md text-on-surface-variant font-normal">/ doba</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rezerwacja Section */}
        <section className="py-stack-lg bg-surface-container relative overflow-hidden scroll-mt-20" id="booking">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>

          <div className="max-w-[1280px] mx-auto px-margin-desktop relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-stack-lg space-y-2">
              <span className="text-secondary font-label-md uppercase tracking-[0.2em] mb-1 block font-semibold">
                Rezerwacja Online
              </span>
              <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
                Zaplanuj Wymarzony Pobyt
              </h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
                Wybierz termin w naszym interaktywnym kalendarzu i prześlij zgłoszenie.
                Skontaktujemy się z Tobą w ciągu 24h, aby potwierdzić dostępność.
              </p>
            </div>

            <div className="bg-surface-bright rounded-[2rem] shadow-2xl overflow-hidden border border-white/40 backdrop-blur-sm grid lg:grid-cols-12 gap-0 max-w-5xl mx-auto">

              {/* Left Column: Interactive Calendar */}
              <div id="calendar-container" className="p-8 md:p-10 border-r border-outline-variant/20 lg:col-span-8 flex flex-col justify-between">
                <div id="calendar-grid-container" className="transition-all duration-300 rounded-2xl p-2">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-headline-md text-primary text-2xl font-bold">
                        {monthNames[currentMonth]} {currentYear}
                      </h3>
                      <p className="text-label-sm text-on-surface-variant opacity-75 mt-0.5">
                        Wybierz datę przyjazdu i wyjazdu na siatce dni
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant/30 hover:bg-surface-container hover:border-primary active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-primary select-none">chevron_left</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant/30 hover:bg-surface-container hover:border-primary active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-primary select-none">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid Header */}
                  <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                    {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"].map((dayName) => (
                      <div key={dayName} className="font-label-md text-on-surface-variant/60 font-semibold pb-2 border-b border-surface-container">
                        {dayName}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid Body */}
                  <div className="grid grid-cols-7 gap-2 pt-2">

                    {/* Previous month days (greyed out) */}
                    {calendarData.prevDays.map((d, idx) => (
                      <div
                        key={`prev-${idx}-${d}`}
                        className="aspect-square flex items-center justify-center text-on-surface-variant/20 font-medium select-none"
                      >
                        {d}
                      </div>
                    ))}

                    {/* Current month days (active interactive days) */}
                    {calendarData.currentDays.map((d) => {
                      const dayClass = getDayClass(d);
                      return (
                        <button
                          type="button"
                          key={`curr-${d}`}
                          onClick={() => handleCalendarDayClick(d)}
                          className={`aspect-square flex items-center justify-center premium-calendar-day cursor-pointer rounded-2xl border border-transparent font-semibold transition-all select-none ${dayClass}`}
                        >
                          {d}
                        </button>
                      );
                    })}

                    {/* Next month days (greyed out) */}
                    {calendarData.nextDays.map((d, idx) => (
                      <div
                        key={`next-${idx}-${d}`}
                        className="aspect-square flex items-center justify-center text-on-surface-variant/20 font-medium select-none"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-secondary rounded-full shadow-sm shadow-secondary/50"></span>
                    <span className="text-label-sm text-on-surface-variant font-semibold">Twój wybór</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-surface-container-low/40 p-8 md:p-10 lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-outline-variant/20">
                <div>
                  <h3 className="font-headline-md text-primary mb-6 font-bold text-2xl">Uzupełnij Dane</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Owner name */}
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant flex items-center gap-2 font-semibold">
                        <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                        Imię i Nazwisko Opiekuna
                      </label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Jan Kowalski"
                        className="w-full bg-white border border-outline-variant/20 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium"
                        required
                      />
                    </div>

                    {/* Phone number */}
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant flex items-center gap-2 font-semibold">
                        <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                        Numer Telefonu
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="504 239 097"
                        pattern="(?:\+\d{1,3}[ -]?)?(?:\d[ -]?){9,12}"
                        title="Proszę wpisać poprawny numer telefonu (np. 504 239 097)"
                        className="w-full bg-white border border-outline-variant/20 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium"
                        required
                      />
                    </div>

                    {/* Dates block */}
                    <div className="grid grid-cols-2 gap-4">

                      {/* Check-in input */}
                      <div className="space-y-2">
                        <label className="font-label-md text-on-surface-variant flex items-center gap-1.5 font-semibold text-xs">
                          <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                          Przyjazd
                        </label>
                        <div
                          onClick={() => {
                            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                            const grid = document.getElementById("calendar-grid-container");
                            if (grid) {
                              grid.classList.add("ring-4", "ring-primary/20", "bg-primary/5");
                              setTimeout(() => {
                                grid.classList.remove("ring-4", "ring-primary/20", "bg-primary/5");
                              }, 1200);
                            }
                          }}
                          className="w-full bg-white border border-outline-variant/20 rounded-xl px-3 py-3 hover:border-primary/60 hover:shadow-md hover:bg-surface-bright cursor-pointer transition-all shadow-sm text-xs font-bold flex justify-between items-center h-[52px] active:scale-[0.98]"
                        >
                          <span className="text-on-surface text-sm truncate">{formatPolishDate(checkIn)}</span>
                          <span className="material-symbols-outlined text-primary text-lg select-none shrink-0">edit_calendar</span>
                        </div>
                        <input type="hidden" name="check-in" value={checkIn} required />
                      </div>

                      {/* Check-out input */}
                      <div className="space-y-2">
                        <label className="font-label-md text-on-surface-variant flex items-center gap-1.5 font-semibold text-xs">
                          <span className="material-symbols-outlined text-[16px] text-primary">event</span>
                          Wyjazd
                        </label>
                        <div
                          onClick={() => {
                            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                            const grid = document.getElementById("calendar-grid-container");
                            if (grid) {
                              grid.classList.add("ring-4", "ring-primary/20", "bg-primary/5");
                              setTimeout(() => {
                                grid.classList.remove("ring-4", "ring-primary/20", "bg-primary/5");
                              }, 1200);
                            }
                          }}
                          className="w-full bg-white border border-outline-variant/20 rounded-xl px-3 py-3 hover:border-primary/60 hover:shadow-md hover:bg-surface-bright cursor-pointer transition-all shadow-sm text-xs font-bold flex justify-between items-center h-[52px] active:scale-[0.98]"
                        >
                          <span className="text-on-surface text-sm truncate">{formatPolishDate(checkOut)}</span>
                          <span className="material-symbols-outlined text-primary text-lg select-none shrink-0">edit_calendar</span>
                        </div>
                        <input type="hidden" name="check-out" value={checkOut} required />
                      </div>
                    </div>

                    {/* Notes field */}
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant flex items-center gap-2 font-semibold">
                        <span className="material-symbols-outlined text-[18px] text-primary">notes</span>
                        Opis pupila i uwagi
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Imię psa, rasa, wielkość, dieta, leki, charakterystyka(opcjonalnie)"
                        className="w-full bg-white border border-outline-variant/20 rounded-xl p-4 h-24 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm resize-none font-medium text-sm leading-relaxed"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-on-primary py-4.5 rounded-xl font-headline-md text-base shadow-xl shadow-primary/10 hover:bg-primary-container hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 mt-4 cursor-pointer font-bold"
                    >
                      Wyślij Zapytanie <span className="material-symbols-outlined font-normal select-none">send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kontakt Section */}
        <section className="py-stack-lg bg-surface-bright scroll-mt-20" id="contact">
          <div className="max-w-[1280px] mx-auto px-margin-desktop">
            <div className="grid md:grid-cols-2 gap-stack-lg items-center">

              {/* Contact details */}
              <div className="space-y-6">
                <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                  Skontaktuj się z nami
                </h2>

                <div className="space-y-5 pt-2">
                  {[
                    { label: "Zadzwoń do nas", val: "+48 504 239 097", icon: "call" },
                    { label: "Napisz maila", val: "kasiasiudy76@gmail.com", icon: "mail" },
                    { label: "Adres", val: "Sosnowa 20, 56-500 Wioska", icon: "location_on" },
                  ].map((info, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-2xl select-none">{info.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-label-md text-primary font-bold">{info.label}</h4>
                        <p className="font-body-md text-on-surface-variant mt-0.5">{info.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-surface-container space-y-4">
                  <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
                    <strong>Bądź na bieżąco!</strong> Wszystkie aktualności, codzienne relacje oraz zdjęcia z życia naszego hotelu i zabaw psów są publikowane na bieżąco na naszym profilu na Facebooku.
                  </p>
                  <a
                    href="https://www.facebook.com/HotelZLasowCorso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-secondary text-white px-5 py-3 rounded-xl font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 shadow-md group cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                    </svg>
                    <span>Odwiedź nas na Facebooku</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              </div>

              {/* Styled Map Widget */}
              <div
                onClick={() => setIsMapInteractive(true)}
                onMouseLeave={() => setIsMapInteractive(false)}
                className="h-[400px] bg-surface-container rounded-2xl overflow-hidden soft-card-shadow border-4 border-white relative group cursor-pointer"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Sosnowo%2020,%2056-500%20Wioska&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Google - Lokalizacja Hotel z Lasów Corso"
                  className={`w-full h-full transition-all duration-300 ${isMapInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
                ></iframe>
                {!isMapInteractive && (
                  <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                    <div className="bg-primary/95 text-on-primary px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-white text-xl">touch_app</span>
                      <span className="font-label-md font-semibold text-xs animate-pulse">Kliknij, aby odblokować mapę</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Legal / Vet Info */}
            <div className="mt-12 pt-8 border-t border-surface-container space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                <div>
                  <h3 className="font-headline-lg text-primary font-bold text-xl md:text-2xl">Zaufanie poparte legalnością i nadzorem</h3>
                  <p className="text-xs text-on-surface-variant">Wiemy, jak ważne jest bezpieczeństwo prawne Twojego psa.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
                <div className="space-y-2 bg-white p-5 rounded-2xl border border-outline-variant/15 soft-card-shadow">
                  <h4 className="font-label-md text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">pets</span>
                    Nadzór Weterynaryjny (PLW)
                  </h4>
                  <p className="text-xs">
                    Nasz hotel jest zgłoszony do rejestru <strong>Powiatowego Lekarza Weterynarii w Oleśnicy</strong> (podstawa prawna: Ustawa z dnia 21 listopada 2025 r. o zdrowiu zwierząt) jako zatwierdzony podmiot utrzymujący zwierzęta / zakład sprawujący opiekę nad zwierzętami domowymi.
                  </p>
                </div>

                <div className="space-y-2 bg-white p-5 rounded-2xl border border-outline-variant/15 soft-card-shadow">
                  <h4 className="font-label-md text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">corporate_fare</span>
                    Legalna Działalność
                  </h4>
                  <p className="text-xs">
                    Działamy w pełni oficjalnie jako zarejestrowana działalność usługowa związana z opieką nad zwierzętami domowymi w zakresie wyżywienia, pilnowania oraz opieki. 
                    <br />
                    <strong className="block mt-2 text-primary">NIP: 8942025783</strong>
                  </p>
                </div>
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
              <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
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

      {/* Custom Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-surface-container text-center space-y-6 animate-scale-up">
            <div className="w-16 h-16 bg-secondary-fixed rounded-full flex items-center justify-center text-secondary mx-auto">
              <span className="material-symbols-outlined text-4xl select-none">help_center</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-headline-md text-primary font-bold text-2xl">Potwierdź rezerwację</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Czy na pewno chcesz wysłać zapytanie rezerwacyjne dla Twojego psa?
              </p>
              <div className="bg-surface-container-low p-4 rounded-2xl text-left text-sm space-y-2 text-on-surface font-body-md">
                <div><strong>Opiekun:</strong> <span>{ownerName}</span></div>
                <div><strong>Telefon:</strong> <span>{phoneNumber}</span></div>
                <div><strong>Przyjazd:</strong> <span>{checkIn}</span></div>
                <div><strong>Wyjazd:</strong> <span>{checkOut}</span></div>
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="w-1/2 border border-outline rounded-xl py-3 font-label-md text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer font-bold active:scale-95"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  setIsSuccessModalOpen(true);
                }}
                className="w-1/2 bg-primary text-on-primary rounded-xl py-3 font-label-md text-on-primary hover:bg-primary-container transition-all cursor-pointer font-bold shadow-md active:scale-95"
              >
                Wyślij
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-surface-container text-center space-y-6 animate-scale-up">
            <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center text-primary mx-auto">
              <span className="material-symbols-outlined text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-headline-md text-primary font-bold text-2xl">Zapytanie Wysłane!</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Dziękujemy, <strong>{ownerName}</strong>! Otrzymaliśmy Twoje zgłoszenie rezerwacji dla pobytu w terminie:
                <br />
                <span className="text-secondary font-bold">
                  {checkIn} — {checkOut}
                </span>
                . Skontaktujemy się z Tobą telefonicznie na numer <strong>{phoneNumber}</strong> w ciągu najbliższych 24 godzin w celu potwierdzenia.
              </p>
            </div>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-primary text-on-primary w-full py-3.5 rounded-xl font-label-md text-label-md active:scale-95 hover:bg-primary-container transition-all cursor-pointer font-bold shadow-md"
            >
              Zamknij okno
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
