"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface RegulationSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export default function RegulationsPage() {
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

  const regulations: RegulationSection[] = [
    {
      id: "postanowienia-ogolne",
      title: "§ 1. Postanowienia Ogólne",
      paragraphs: [
        "Regulamin Hotelu określa warunki korzystania z usług, w tym przyjęcia, pobytu i opuszczenia przez zwierzę Hotelu Dla Psów „z Lasów Corso” mieszczącego się przy ul. Sosnowa 20, 56-500 Wioska, gm. Syców, reprezentowanego przez właściciela, Panią Katarzynę Siudy. Dla wspólnego dobra przebywających tam ludzi i zwierząt właściciel (lub inna osoba przekazująca zwierzę pod opiekę) zobowiązany jest do akceptacji regulaminu, jeśli chce, aby jego zwierzę korzystało z pobytu w hotelu.",
        "1. Hotel Dla Psów „z Lasów Corso” zobowiązuje się otoczyć każde powierzone zwierzę najlepszą możliwą opieką, dbać o jego zdrowie, bezpieczeństwo i dobry nastrój.",
        "2. Przed pozostawieniem zwierzęcia w hotelu właściciel/opiekun udziela prawdziwych informacji, dotyczących pozostawianego zwierzęcia."
      ]
    },
    {
      id: "warunki-przyjecia",
      title: "§ 2. Warunki Przyjęcia Psa do Hotelu",
      paragraphs: [
        "3. Do hotelu przyjmowane są zwierzęta zdrowe, posiadające książeczki zdrowia (aktualne szczepienie i odrobaczenie). W przypadku występowania choroby przewlekłej u zwierzęcia należy powiadomić o tym właściciela hotelu w dniu dokonywania rezerwacji.",
        "4. Hotel Dla Psów „z Lasów Corso” może odmówić przyjęcia zwierzęcia, które zagraża zdrowiu lub bezpieczeństwu innych, a w szczególności odmówić przyjęcia osobników:",
        "a. agresywnych w stosunku do ludzi lub zwierząt,",
        "b. chorych (w tym zapchlonych) w sposób stwarzający groźbę zarażenia innych zwierząt,",
        "c. w kondycji niebezpiecznej dla własnego życia i zdrowia zwierzęcia,",
        "d. bez ważnych szczepień i zabezpieczeń przeciw pasożytom.",
        "5. Hotel Dla Psów „z Lasów Corso” może odmówić przyjęcia zwierzęcia z powodu braku miejsca, a także bez podania przyczyny.",
        "6. Właściciel/opiekun podpisuje umowę, w której zapewnia, że zwierzę jest zdrowe, określa termin przebywania zwierzęcia w hotelu oraz pozostawia kontakt telefoniczny do siebie.",
        "11. Przed przyjęciem zwierząt do Hotelu Dla Psów „z Lasów Corso” zapraszamy na wcześniejszą wizytę, aby zwierzę zapoznało się z nami, oczywiście nie jest to wymóg konieczny.",
        "21. Psy przyjmowane są z własną smyczą, obrożą, powinny posiadać swoje posłanie, kocyk, ulubione zabawki lub nawet miski (dwie ostatnie rzeczy nie są wymagane)."
      ]
    },
    {
      id: "rezerwacje-platnosci",
      title: "§ 3. Rezerwacja i Płatności",
      paragraphs: [
        "7. Płatność za pobyt w Hotelu Dla Psów „z Lasów Corso” przyjmuje się w dniu przybycia zwierzęcia do Hotelu.",
        "13. Pobyt zwierzęcia w Hotelu Dla Psów może zostać przedłużony:",
        "a. po uprzednim zgłoszeniu takiej potrzeby przez właściciela",
        "b. jedynie za zgodą Hotelu Dla Psów",
        "14. Za przedłużenie pobytu zwierzęcia w Hotelu Dla Psów pobierana jest standardowa opłata, określona w cenniku.",
        "15. Doba hotelowa w Hotelu Dla Psów rozpoczyna się w momencie przyjazdu i kończy o tej samej godzinie następnego dnia pobytu.",
        "16. Opłatę za przedłużenie pobytu po potwierdzeniu jej wysokości przez Hotel Dla Psów należy wnieść nie później niż w dniu opuszczenia przez zwierzę Hotelu.",
        "17. Właściciel/opiekun może odebrać swoje zwierzę przed upływem ustalonego terminu pobytu po uprzednim poinformowaniu o tym Hotelu Dla Psów",
        "18. W przypadku skrócenia terminu pobytu wniesiona opłata nie podlega zwrotowi."
      ]
    },
    {
      id: "wyzywienie-pielegnacja",
      title: "§ 4. Wyżywienie i Pielęgnacja",
      paragraphs: [
        "19. Zwierzę pozostawione w naszym Hotelu otrzymuje minimum dwa posiłki, lub w zależności od indywidualnych potrzeb, ustalanych z właścicielem/opiekunem oraz ma zapewniony stały dostęp do wody.",
        "20. Zapewniamy wyjścia na teren, zabawy oraz wybieg na ogrodzonym terenie Hotelu."
      ]
    },
    {
      id: "opieka-weterynaryjna",
      title: "§ 5. Opieka Weterynaryjna i Odpowiedzialność",
      paragraphs: [
        "8. Za wszelkie szkody wyrządzone przez zwierzę innym zwierzętom lub ludziom odpowiada właściciel/opiekun i zobowiązuje się w razie konieczności do pokrycia ewentualnych kosztów.",
        "9. Właściciel/opiekun zgadza się na pokrycie ewentualnych kosztów leczenia weterynaryjnego jego zwierzęcia, jeśli zaistnieje potrzeba jego stosowania.",
        "10. Wszelkie przedmioty, a w szczególności zabawki, przywiezione ze zwierzęciem mogą ulec zniszczeniu lub zagubieniu i właściciel/opiekun nie będzie wnosić pretensji związanych z tego tytułu.",
        "12. Właściciel/opiekun powinien być świadomy faktu, iż po upłynięciu terminu odbioru zwierzęcia i braku informacji o jego przedłużeniu oraz braku możliwości skontaktowania się z właścicielem/ opiekunem przez 7 kolejnych dni, równoznaczne jest to z porzuceniem zwierzęcia przez właściciela/ opiekuna. Prawne konsekwencje tego zdarzenia będą rozpatrywane na mocy Ustawy o Ochronie Praw Zwierząt z 21.08.1997 roku, która definiuje porzucenie zwierzęcia jako znęcanie się nad nim (art. 6 ust. 1 i ust. 2 pkt. 11) i nakłada na właściciela karę w postaci pozbawienia lub ograniczenia wolności albo grzywny (art. 35 ust. 1), przy czym sąd może zasądzić przepadek zwierzęcia (art. 35 ust. 3) i dalsze losy zwierzęcia reguluje art. 38 przywoływanej ustawy."
      ]
    },
    {
      id: "postanowienia-koncowe",
      title: "§ 6. Postanowienia Końcowe",
      paragraphs: [
        "22. Właściciel wyraża zgodę na przetwarzanie jego danych osobowych zgodnie z Ustawą z dnia 10 maja 2018 r. o ochronie danych osobowych wyłącznie dla potrzeb niezbędnych do realizacji czynności, związanych z usługami, które zamówił w Hotelu Dla Psów .",
        "23. W sprawach, których nie opisuje niniejszy regulamin, mają zastosowanie przepisy Kodeksu Cywilnego.",
        "Właściciel/opiekun może wyrazić pisemną zgodę na bezpłatne umieszczenie zdjęć lub filmów z udziałem jego zwierzęcia w materiałach ilustrujących działania Hotelu Dla Psów w bazie klientów Hotelu, na jego stronie www oraz portalach społecznościowych. Zgoda taka podpisywana jest wraz z Umową Powierzenia Psa."
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
              const isExternal = link.href.startsWith("/");
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
                Regulamin i Warunki
              </span>
              <h1 className="font-headline-xl text-[38px] md:text-[56px] lg:text-[68px] mb-stack-sm leading-tight">
                Regulamin Hotelu
              </h1>
              <p className="font-body-lg text-[16px] md:text-[20px] lg:text-[22px] opacity-90 leading-relaxed max-w-xl">
                Zasady pobytu, rezerwacji oraz bezpieczeństwa naszych merdających gości.
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
                  {regulations.map((section) => (
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
                  {regulations.map((section) => (
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
                
                {regulations.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                    <h2 className="font-headline-lg text-primary font-bold border-b border-secondary/15 pb-2">
                      {section.title}
                    </h2>
                    <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed">
                      {section.paragraphs.map((p, idx) => {
                        const isNumbered = /^\d+\./.test(p.trim()) || /^[a-z]\./.test(p.trim());
                        return (
                          <div key={idx} className="flex gap-3 items-start">
                            {!isNumbered && <span className="text-secondary font-bold shrink-0 mt-0.5">•</span>}
                            <p className={isNumbered ? "pl-0" : ""}>{p}</p>
                          </div>
                        );
                      })}
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
