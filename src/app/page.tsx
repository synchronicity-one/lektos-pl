"use client";
import { useState, useEffect } from "react";
// --- dane ---
const NAV_ITEMS = [
  { label: "Start", id: "start" },
  { label: "System", id: "system" },
  { label: "Funkcje", id: "funkcje" },
  { label: "Wdrożenie", id: "wdrozenie" },
];
const AKRONIM = [
  { letter: "L", title: "LINKS", meaning: "your systems", desc: "łączy Twoje systemy w jedną całość" },
  { letter: "E", title: "EXECUTES", meaning: "tasks automatically", desc: "wykonuje zadania automatycznie, bez ręcznej obsługi" },
  { letter: "K", title: "KNOWS", meaning: "your data", desc: "zna Twoje dane i odpowiada na ich podstawie" },
  { letter: "T", title: "TALKS", meaning: "your language", desc: "rozmawia z pracownikami w języku naturalnym" },
  { letter: "O", title: "OPERATES", meaning: "24/7", desc: "działa bez przerwy, 24 godziny na dobę" },
  { letter: "S", title: "SCALES", meaning: "with your business", desc: "skaluje się razem z rozwojem Twojej firmy" },
];
const SYSTEM_ELEMENTS = [
  {
    title: "Programy współpracujące ze sobą",
    desc: "Programy wykonują pracę: czytają dane, transformują je, generują raporty, wysyłają maile, podejmują decyzje. Nie są odizolowane: wynik jednego programu jest wejściem dla drugiego. Razem tworzą ciąg operacji, które wcześniej wykonywał człowiek.",
    desc2: "Część programów korzysta z AI. Sztuczna inteligencja LLM (statystyczna, językowa) wykorzystywana jest do analizy tekstu i zadawania pytań w języku naturalnym. Sztuczna inteligencja symboliczna (regułowa, logiczna) służy do zapisywania twardych reguł biznesowych. Symboliczna AI operuje regułami logicznymi. Za ich pomocą wyraża się reguły, których LLM nie zagwarantuje. Na przyklad, że klient X ma cennik Y albo, że jeżeli paczka idzie do strefy Z, to dolicza się kwota Q. Razem te dwa podejścia dają system, który rozumie pytania jak człowiek, ale przestrzega reguł jak księgowy.",
    wide: true,
  },
  {
    title: "Konektory do systemów zewnętrznych",
    desc: "Programy nie działają w próżni. Muszą sięgać do systemów, które są używane w firmie np. ERP, CRM, e-commerce, magazyn, kurierzy. Konektory to mosty komunikacyjne, przez które Lektos czerpie dane i wykonuje akcje w tych systemach. Komunikacja z ludźmi to osobny kanał: poczta, czat, formularze, obsługiwany przez dedykowane moduły wejścia i wyjścia.",
  },
  {
    title: "Harmonogram",
    desc: "Programy muszą się cyklicznie uruchamiać - codziennie, co godzinę, na koniec miesiąca. Harmonogram to zegar systemu. Decyduje, kiedy uruchomić który program, w jakiej kolejności, z jakimi parametrami.",
  },
  {
    title: "Baza wiedzy",
    desc: "Baza wiedzy to dane firmy, z których programy korzystają: konfiguracje klientów, cenniki, reguły, dokumentacje procesów, historia operacji. Bez bazy wiedzy programy nie wiedzą, jak postępować, a z nią działają zgodnie z kontekstem firmy.",
  },
  {
    title: "Panel czatowy",
    desc: "To interfejs dla pracownika. Przez panel pracownik zadaje pytania i wydaje polecenia w języku naturalnym. Panel łączy LLM z programami, konektorami i bazą wiedzy. Dzięki temu odpowiedzi opierają się na rzeczywistych danych, a nie ogólnej wiedzy modelu.",
  },
  {
    title: "Dedykowana infrastruktura",
    desc: "Lektos działa na dedykowanej infrastrukturze, którą przygotowujemy i udostępniamy. Programy, konektory, harmonogram, baza wiedzy i panel czatowy nie żyją w chmurze obcych dostawców - są wdrożone na konkretnych serwerach nadzorowanych przez nas.",
    wide: true,
  },
];
const FUNKCJE = [
  {
    title: "Integracje API",
    desc: "Lektos łączy się z Twoimi systemami przez API. Dla każdego systemu tworzymy dedykowany konektor w Pythonie.",
    wide: true,
  },
  {
    title: "Konektory MCP",
    desc: "Lektos posiada konektory MCP (Model Context Protocol) - protokoły pozwalające modelom AI (Claude, ChatGPT, lokalne LLM) operować na Twoich plikach, bazach danych, mailach, repozytoriach git i systemach zewnętrznych. AI nie tylko czyta dane, ale wykonuje akcje przez ustandaryzowany interfejs.",
  },
  {
    title: "Automatyczne raporty",
    desc: "Lektos generuje raporty na podstawie danych z Twoich systemów i wysyła je według harmonogramu lub na żądanie. Modułowy silnik raportów pozwala dodać nowy raport bez pisania skryptu od zera.",
  },
  {
    title: "Automatyzacja skrzynki mailowej",
    desc: "System czyta przychodzące wiadomości, klasyfikuje je i wykonuje akcje automatycznie. Pracownik może też wydać polecenie przez czat - wysłać, skasować, przenieść, oflagować wiadomość bez otwierania skrzynki.",
  },
  {
    title: "Panel w języku naturalnym",
    desc: "Pracownicy zadają pytania (ile zamówień wczoraj, pokaż nieopłacone faktury, wyślij raport miesięczny) i otrzymują odpowiedzi oparte na danych z podłączonych systemów w czasie rzeczywistym.",
  },
  {
    title: "RAG i self-hosted LLM",
    desc: "Moduł RAG pozwala AI odpowiadać na pytania na podstawie Twojej dokumentacji, maili archiwalnych i bazy wiedzy. Dla klientów z wymogami compliance wdrażamy modele open source (Llama, Mistral, Qwen) na infrastrukturze klienta - cały stack AI działa lokalnie.",
  },
  {
    title: "API dla integratorów",
    desc: "Lektos API to multi-tenant warstwa REST/JSON, której mogą używać integratorzy Twoich systemów zewnętrznych. Własny system raportujący może wystawić dane do Lektosa standardowym API zamiast pisać niestandardowy interfejs.",
  },
];
const KROKI = [
  {
    num: "01",
    title: "Analiza procesów",
    desc: "Zbieramy dane o Twoich systemach i procesach - jakie narzędzia używasz, gdzie tracisz czas, co chcesz zautomatyzować. Spotkanie 1-2h, raport z propozycją podziału na bloki.",
  },
  {
    num: "02",
    title: "Projekt automatyzacji",
    desc: "Omawiamy wymagania i dzielimy wdrożenie na bloki. Każdy blok to osobna sekwencja działań - zatwierdzasz zanim ruszymy dalej. Specyfikacja trafia do bazy wiedzy projektu.",
  },
  {
    num: "03",
    title: "Wdrożenie etapami",
    desc: "Uruchamiamy kolejne bloki jeden po drugim. Testujesz każdy etap przed przejściem do następnego. Backup przed każdą zmianą produkcyjną.",
  },
  {
    num: "04",
    title: "Stabilizacja",
    desc: "Przekazujemy dokumentację, dostępy i procedury operacyjne. Klient wie jak system działa i jak go obsługiwać.",
  },
  {
    num: "05",
    title: "Utrzymanie i rozwój",
    desc: "Lektos działa. Monitorujemy, wprowadzamy poprawki, rozszerzamy system w miarę potrzeb. Stała współpraca w modelu retainera albo na zlecenie.",
  },
];
const MODEL = [
  {
    title: "Infrastruktura zarządzana",
    desc: "Dostarczamy serwery i konfigurację. Hosting, monitoring, backup, aktualizacje, bezpieczeństwo - wszystko po naszej stronie. Klient płaci za usługi, nie zajmuje się infrastrukturą.",
    highlight: true,
  },
  {
    title: "Wdrożenie hybrydowe",
    desc: "Lektos jest systemem rozproszonym - komponenty działają na osobnych maszynach ze względu na różne czynniki, m.in. backup i failover. Jeśli klient chce mieć Lektos u siebie, musi dostarczyć prywatną chmurę (kilka serwerów). Możemy taką chmurę skonfigurować - dostarczamy zarówno gotowe wdrożenie u nas, jak i postawienie infrastruktury u klienta.",
    highlight: false,
  },
];
const heroSchema = (
  <svg viewBox="0 0 680 480" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
              <line x1="340" y1="240" x2="160" y2="100" stroke="#3D3B8E" strokeWidth="1.5" strokeOpacity="0.3"/>
              <line x1="340" y1="240" x2="520" y2="100" stroke="#3D3B8E" strokeWidth="1.5" strokeOpacity="0.3"/>
              <line x1="340" y1="240" x2="110" y2="240" stroke="#3D3B8E" strokeWidth="1.5" strokeOpacity="0.3"/>
              <line x1="340" y1="240" x2="570" y2="240" stroke="#3D3B8E" strokeWidth="1.5" strokeOpacity="0.3"/>
              <line x1="340" y1="240" x2="160" y2="380" stroke="#3D3B8E" strokeWidth="1.5" strokeOpacity="0.3"/>
              <line x1="340" y1="240" x2="520" y2="380" stroke="#3D3B8E" strokeWidth="1.5" strokeOpacity="0.3"/>
              <circle r="4.5" fill="#ff4081"><animateMotion dur="3s" repeatCount="indefinite" path="M160 100 L340 240"/></circle>
              <circle r="4.5" fill="#ff4081"><animateMotion dur="3s" begin="0.5s" repeatCount="indefinite" path="M340 240 L520 100"/></circle>
              <circle r="4.5" fill="#ff4081"><animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M110 240 L340 240"/></circle>
              <circle r="4.5" fill="#ff4081"><animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M340 240 L570 240"/></circle>
              <circle r="4.5" fill="#ff4081"><animateMotion dur="3s" begin="2s" repeatCount="indefinite" path="M160 380 L340 240"/></circle>
              <circle r="4.5" fill="#ff4081"><animateMotion dur="3s" begin="2.5s" repeatCount="indefinite" path="M340 240 L520 380"/></circle>
              <circle cx="160" cy="100" r="30" fill="#fafaff" stroke="#3D3B8E" strokeWidth="2"/>
              <circle cx="520" cy="100" r="30" fill="#fafaff" stroke="#3D3B8E" strokeWidth="2"/>
              <circle cx="110" cy="240" r="30" fill="#fafaff" stroke="#3D3B8E" strokeWidth="2"/>
              <circle cx="570" cy="240" r="30" fill="#fafaff" stroke="#3D3B8E" strokeWidth="2"/>
              <circle cx="160" cy="380" r="30" fill="#fafaff" stroke="#3D3B8E" strokeWidth="2"/>
              <circle cx="520" cy="380" r="30" fill="#fafaff" stroke="#3D3B8E" strokeWidth="2"/>
              <circle cx="160" cy="100" r="6" fill="#3D3B8E"/>
              <circle cx="520" cy="100" r="6" fill="#3D3B8E"/>
              <circle cx="110" cy="240" r="6" fill="#3D3B8E"/>
              <circle cx="570" cy="240" r="6" fill="#3D3B8E"/>
              <circle cx="160" cy="380" r="6" fill="#3D3B8E"/>
              <circle cx="520" cy="380" r="6" fill="#3D3B8E"/>
              <circle cx="340" cy="240" r="54" fill="#3D3B8E"/>
              <circle cx="340" cy="240" r="64" fill="none" stroke="#3D3B8E" strokeWidth="1.5" strokeOpacity="0.3"/>
              <text x="340" y="248" textAnchor="middle" fontFamily="var(--font-sora), sans-serif" fontSize="22" fontWeight="900" fill="#ffffff">L</text>
            </svg>
);
// --- komponent ---
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 20);
      setShowTop(y > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };
  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };
  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1a1929", backgroundColor: "#ffffff" }}>
      {/* ===== NAVBAR ===== */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : "#ffffff",
        borderBottom: scrolled ? "1px solid #e0e0f0" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(61,59,142,0.08)" : "none",
        transition: "all 0.3s ease",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <button onClick={scrollToTop} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, backgroundColor: "#3D3B8E", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-sora), sans-serif", fontWeight: 800, fontSize: 18, color: "#ffffff" }}>L</span>
            </div>
            <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 17, fontWeight: 800, color: "#1a1929", letterSpacing: 2 }}>LEKTOS</span>
          </button>
          <div className="lk-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === "start" ? scrollToTop() : scrollToSection(item.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 14, fontWeight: 500, color: "#4a4870", padding: "8px 16px", borderRadius: 6, transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#eeeef9"; e.currentTarget.style.color = "#3D3B8E"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#4a4870"; }}
              >{item.label}</button>
            ))}
            <button
              onClick={() => scrollToSection("kontakt")}
              style={{ marginLeft: 12, background: "#3D3B8E", border: "none", cursor: "pointer", fontFamily: "var(--font-sora), sans-serif", fontSize: 14, fontWeight: 700, color: "#ffffff", padding: "9px 20px", borderRadius: 7, transition: "background 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2e2c6e"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3D3B8E"}
            >Umów demo</button>
          </div>
          <button
            className="lk-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#3D3B8E" }}
            aria-label="Menu"
          >
            {menuOpen
              ? <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            }
          </button>
        </div>
        {menuOpen && (
          <div className="lk-mobile" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e8e8f4", padding: "8px 24px 20px" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === "start" ? scrollToTop() : scrollToSection(item.id)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid #f0f0f8", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 16, fontWeight: 500, color: "#1a1929", padding: "13px 0" }}
              >{item.label}</button>
            ))}
            <button
              onClick={() => scrollToSection("kontakt")}
              style={{ marginTop: 16, display: "block", width: "100%", background: "#3D3B8E", border: "none", cursor: "pointer", fontFamily: "var(--font-sora), sans-serif", fontSize: 15, fontWeight: 700, color: "#ffffff", padding: "13px 0", borderRadius: 8 }}
            >Umów demo</button>
          </div>
        )}
      </nav>
      {/* ===== HERO + AKRONIM ===== */}
      <section id="start" style={{ position: "relative", overflow: "hidden", backgroundColor: "#ffffff" }}>
        <div style={{ position: "relative", minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 70% 50%, #eeeef9 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, transparent 0%, #3D3B8E 30%, #3D3B8E 70%, transparent 100%)" }} />
          <div style={{ position: "relative", maxWidth: 1140, margin: "0 auto", padding: "60px 24px", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 40 }} className="lk-hero-row">
            <div className="lk-hero-text" style={{ width: "100%" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#eeeef9", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#3D3B8E" }} />
                <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 11, fontWeight: 700, color: "#3D3B8E", letterSpacing: 2, textTransform: "uppercase" }}>Connect. Automate. Ask.</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(34px, 5.2vw, 60px)", fontWeight: 800, color: "#1a1929", lineHeight: 1.1, marginBottom: 14, letterSpacing: -1.5 }}>
                Lektos <span style={{ color: "#3D3B8E" }}>automatyzacja operacji biznesowych</span>
              </h1>
              <p style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(14px, 1.7vw, 17px)", fontWeight: 700, color: "#3D3B8E", letterSpacing: 1, marginBottom: 28, textTransform: "uppercase" }}>
                Intelligent Business Automation
              </p>
              <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#4a4870", lineHeight: 1.8, marginBottom: 20, maxWidth: 540 }}>
                Twoje systemy generują dane. Twoi pracownicy tracą czas na ręczne zadania.
                Lektos to zmienia: łączy systemy, automatyzuje operacje i odpowiada
                na pytania w języku naturalnym.
              </p>
              <div className="lk-hero-schema-mobile" style={{ width: "100%", maxWidth: 360, margin: "8px auto 28px", pointerEvents: "none" }}>
                {heroSchema}
              </div>
              <p style={{ fontSize: "clamp(14px, 1.6vw, 15px)", color: "#3D3B8E", fontWeight: 600, lineHeight: 1.7, marginBottom: 44, maxWidth: 540 }}>
                Lektos tworzymy przy użyciu otwartych narzędzi takich jak Linux i Python, bez warstw pośrednich i bez vendor lock-in. Nie składamy systemu z gotowych klocków no-code i low-code (np. n8n, Make.com, Vapi, Retell, ElevenLabs). Piszemy własny kod, który rozumiemy i za który bierzemy odpowiedzialność.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollToSection("kontakt")}
                  style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 15, fontWeight: 700, backgroundColor: "#3D3B8E", color: "#ffffff", border: "2px solid #3D3B8E", borderRadius: 8, padding: "14px 30px", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2e2c6e"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3D3B8E"}
                >Umów demo</button>
                <button
                  onClick={() => scrollToSection("kontakt")}
                  style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 15, fontWeight: 700, backgroundColor: "transparent", color: "#3D3B8E", border: "2px solid #3D3B8E", borderRadius: 8, padding: "14px 30px", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3D3B8E"; e.currentTarget.style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#3D3B8E"; }}
                >Zadaj pytanie</button>
              </div>
            </div>
            <div className="lk-hero-schema-desktop" style={{ flex: "1 1 0", minWidth: 0, maxWidth: 480, pointerEvents: "none" }}>
              {heroSchema}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #e8e8f4", backgroundColor: "#fafaff", padding: "72px 24px" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <div style={{ marginBottom: 48, maxWidth: 720 }}>
              <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 11, fontWeight: 700, color: "#3D3B8E", letterSpacing: 3, textTransform: "uppercase" }}>Akronim</span>
              <p style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(18px, 2.2vw, 22px)", fontWeight: 600, color: "#1a1929", lineHeight: 1.5, marginTop: 12, letterSpacing: -0.5 }}>
                Lektos - z greki: wybrany, zebrany. Platforma zbiera dane z Twoich narzędzi i działa na ich podstawie.
              </p>
            </div>
            <div style={{ marginBottom: 56, overflow: "hidden" }}>
              <svg viewBox="0 0 1080 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
                <defs>
                  <linearGradient id="lineFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3D3B8E" stopOpacity="0.15"/>
                    <stop offset="50%" stopColor="#3D3B8E" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#3D3B8E" stopOpacity="0.15"/>
                  </linearGradient>
                </defs>
                <line x1="90" y1="80" x2="990" y2="80" stroke="url(#lineFlow)" strokeWidth="2" strokeDasharray="4 6"/>
                <g>
                  <circle r="6" fill="#ff4081">
                    <animateMotion dur="6s" repeatCount="indefinite" path="M 90 80 L 990 80"/>
                  </circle>
                </g>
                {AKRONIM.map((item, i) => {
                  const cx = 90 + i * 180;
                  return (
                    <g key={item.letter}>
                      <circle cx={cx} cy="80" r="44" fill="#fafaff" stroke="#3D3B8E" strokeWidth="2"/>
                      <text x={cx} y="95" textAnchor="middle" fontFamily="var(--font-sora), sans-serif" fontWeight="900" fontSize="36" fill="#3D3B8E">{item.letter}</text>
                      <text x={cx} y="160" textAnchor="middle" fontFamily="var(--font-sora), sans-serif" fontWeight="700" fontSize="13" fill="#1a1929">{item.title}</text>
                      <text x={cx} y="182" textAnchor="middle" fontFamily="var(--font-dm-sans), sans-serif" fontSize="11" fill="#4a4870">{item.meaning}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {AKRONIM.map((item) => (
                <div key={item.letter} style={{ position: "relative", backgroundColor: "#ffffff", border: "1px solid #e8e8f4", borderRadius: 8, padding: "24px 20px", display: "flex", alignItems: "center", gap: 16, overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundColor: "#3D3B8E" }} />
                  <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 44, fontWeight: 900, color: "#3D3B8E", lineHeight: 1, width: 48, flexShrink: 0, textAlign: "center" }}>{item.letter}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 15, fontWeight: 700, color: "#1a1929", margin: "0 0 4px 0", letterSpacing: 0.5 }}>{item.title}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 13, color: "#4a4870", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ===== SYSTEM ===== */}
      <section id="system" style={{ padding: "104px 24px", backgroundColor: "#1a1929" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ marginBottom: 64, maxWidth: 820 }}>
            <div style={{ width: 48, height: 4, backgroundColor: "#3D3B8E", borderRadius: 2, marginBottom: 24 }} />
            <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.08, letterSpacing: -1, marginTop: 0, marginBottom: 28 }}>
              System
            </h2>
            <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.85, margin: 0 }}>
              Lektos to system złożony z elementów, które współpracują ze sobą. Każdy element ma swoją rolę, a wartość powstaje z relacji między nimi. Poniżej opis budowy.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="lk-sys-grid">
            {SYSTEM_ELEMENTS.map((el, i) => (
              <div
                key={el.title}
                className="lk-sys-card"
                style={{
                  gridColumn: el.wide ? "1 / -1" : "auto",
                  backgroundColor: "#20203a",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "36px 32px",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 28, fontWeight: 900, color: "rgba(61,59,142,0.55)", lineHeight: 1, letterSpacing: -1, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.25, letterSpacing: -0.3 }}>
                    {el.title}
                  </h3>
                </div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, margin: 0, marginLeft: 46 }}>
                  {el.desc}
                </p>
                {el.desc2 && (
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.8, margin: "16px 0 0 46px" }}>
                    {el.desc2}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== FUNKCJE ===== */}
      <section id="funkcje" style={{ padding: "104px 24px", backgroundColor: "#f7f7fc" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ marginBottom: 64, maxWidth: 820 }}>
            <div style={{ width: 48, height: 4, backgroundColor: "#3D3B8E", borderRadius: 2, marginBottom: 24 }} />
            <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 11, fontWeight: 700, color: "#3D3B8E", letterSpacing: 3, textTransform: "uppercase" }}>Funkcje</span>
            <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1929", lineHeight: 1.08, letterSpacing: -1, marginTop: 12, marginBottom: 28 }}>
              Co potrafi Lektos?
            </h2>
            <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: "#4a4870", lineHeight: 1.85, margin: 0 }}>
              Funkcje systemu: od fundamentu integracji, przez codzienną pracę, po zaawansowane opcje dla integratorów zewnętrznych.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="lk-sys-grid">
            {FUNKCJE.map((f, i) => (
              <div
                key={f.title}
                className="lk-sys-card"
                style={{
                  gridColumn: f.wide ? "1 / -1" : "auto",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e8e8f4",
                  borderRadius: 12,
                  padding: "36px 32px",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 28, fontWeight: 900, color: "rgba(61,59,142,0.35)", lineHeight: 1, letterSpacing: -1, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 700, color: "#1a1929", margin: 0, lineHeight: 1.25, letterSpacing: -0.3 }}>
                    {f.title}
                  </h3>
                </div>
                <p style={{ fontSize: 15, color: "#4a4870", lineHeight: 1.8, margin: 0, marginLeft: 46 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== WDROZENIE + MODEL ===== */}
      <section id="wdrozenie" style={{ padding: "104px 24px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ marginBottom: 96 }}>
            <div style={{ marginBottom: 56, maxWidth: 720 }}>
              <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 11, fontWeight: 700, color: "#3D3B8E", letterSpacing: 3, textTransform: "uppercase" }}>Wdrożenie</span>
              <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#1a1929", lineHeight: 1.08, marginTop: 12, letterSpacing: -1 }}>Proces wdrożenia</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 0 }} className="lk-kroki">
              {KROKI.map((k, i) => (
                <div key={k.num} style={{ paddingRight: i < KROKI.length - 1 ? 28 : 0, paddingLeft: i > 0 ? 28 : 0, borderRight: i < KROKI.length - 1 ? "1px solid #e8e8f4" : "none" }} className="lk-krok">
                  <div style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 72, fontWeight: 900, color: "#f0f0fa", lineHeight: 1, marginBottom: 8, letterSpacing: -4 }}>{k.num}</div>
                  <h3 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 17, fontWeight: 700, color: "#1a1929", marginBottom: 12, lineHeight: 1.2 }}>{k.title}</h3>
                  <p style={{ fontSize: 13, color: "#4a4870", lineHeight: 1.7 }}>{k.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 48, maxWidth: 720 }}>
              <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 11, fontWeight: 700, color: "#3D3B8E", letterSpacing: 3, textTransform: "uppercase" }}>Model współpracy</span>
              <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, color: "#1a1929", lineHeight: 1.1, marginTop: 12, letterSpacing: -1 }}>Warianty wdrożenia</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
              {MODEL.map((m) => (
                <div key={m.title} style={{ backgroundColor: m.highlight ? "#3D3B8E" : "#f7f7fc", borderRadius: 12, padding: "32px 28px", border: m.highlight ? "none" : "1px solid #e8e8f4" }}>
                  <h3 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 17, fontWeight: 700, color: m.highlight ? "#ffffff" : "#1a1929", marginBottom: 12, lineHeight: 1.2 }}>{m.title}</h3>
                  <p style={{ fontSize: 14, color: m.highlight ? "rgba(255,255,255,0.78)" : "#4a4870", lineHeight: 1.75 }}>{m.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#fafaff", border: "1px solid #e8e8f4", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 11, fontWeight: 700, color: "#3D3B8E", letterSpacing: 2, textTransform: "uppercase" }}>Rozliczenie</span>
              <span style={{ fontSize: 14, color: "#4a4870", lineHeight: 1.6 }}>
                Retainer miesięczny (godziny w pakiecie) + hosting albo godziny doraźnie + hosting.
                Klient widzi ewidencję godzin i wie za co płaci.
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* ===== KONTAKT ===== */}
      <section id="kontakt" style={{ padding: "104px 24px", backgroundColor: "#1a1929", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -80, top: "50%", transform: "translateY(-50%)", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(61,59,142,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 3, textTransform: "uppercase" }}>Kontakt</span>
          <h2 style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.08, margin: "16px 0 28px", letterSpacing: -2 }}>
            Porozmawiajmy
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.62)", lineHeight: 1.85, marginBottom: 24 }}>
            Demo to działający prototyp Lektos skonfigurowany pod jeden z Twoich procesów.
            Przygotowujemy je bezpłatnie - żeby zobaczyć, zanim zdecydujesz.
          </p>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.62)", lineHeight: 1.85, marginBottom: 52 }}>
            Lektos to produkt synchronicity.one - firmy specjalizującej się
            w rozwiązaniach programistycznych, integracji systemów i budowie
            prywatnych chmur na żądanie. Napisz do nas i omówimy Twój przypadek.
          </p>
          <a
            href="mailto:hello@synchronicity.one"
            style={{ display: "inline-block", fontFamily: "var(--font-sora), sans-serif", fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 800, color: "#ffffff", textDecoration: "none", borderBottom: "3px solid #3D3B8E", paddingBottom: 4, marginBottom: 24, letterSpacing: -0.5, transition: "color 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#b0aff0"; e.currentTarget.style.borderColor = "#b0aff0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.borderColor = "#3D3B8E"; }}
          >hello@synchronicity.one</a>
          <br />
          <a
            href="https://www.synchronicity.one"
            target="_blank"
            rel="noopener"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 15, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
          >www.synchronicity.one</a>
        </div>
      </section>
      {/* ===== FOOTER ===== */}
      <footer style={{ backgroundColor: "#111120", color: "rgba(255,255,255,0.28)", padding: "24px", textAlign: "center", fontSize: 13, fontFamily: "var(--font-dm-sans), sans-serif" }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Lektos.pl</p>
      </footer>
      {/* ===== BACK TO TOP ===== */}
      {showTop && (
        <button
          onClick={scrollToTop}
          style={{ position: "fixed", bottom: 32, right: 32, width: 48, height: 48, backgroundColor: "#3D3B8E", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(61,59,142,0.4)", zIndex: 200, transition: "background 0.2s, transform 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2e2c6e"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#3D3B8E"; e.currentTarget.style.transform = "translateY(0)"; }}
          aria-label="Powrot na gore"
        >
          <svg width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 15l7-7 7 7"/>
          </svg>
        </button>
      )}
      <style>{`
        @media (max-width: 768px) {
          .lk-desktop { display: none !important; }
          .lk-hero-schema-desktop { display: none !important; }
          .lk-grid-2 { grid-template-columns: 1fr !important; gap: 32px !important; }
          .lk-sys-grid { grid-template-columns: 1fr !important; }
          .lk-sys-card { padding: 28px 22px !important; }
          .lk-krok { padding-left: 0 !important; padding-right: 0 !important; border-right: none !important; padding-top: 28px !important; border-top: 1px solid #e8e8f4; }
          .lk-kroki > div:first-child { border-top: none !important; padding-top: 0 !important; }
        }
        @media (min-width: 769px) {
          .lk-mobile { display: none !important; }
          .lk-hero-row { flex-direction: row !important; align-items: center !important; gap: 48px !important; padding: 80px 24px 80px 48px !important; }
          .lk-hero-text { flex: 1 1 0 !important; min-width: 0 !important; max-width: 600px !important; }
          .lk-hero-schema-mobile { display: none !important; }
          .lk-hero-schema-desktop { flex: 1 1 0 !important; min-width: 0 !important; max-width: 480px !important; }
        }
        * { box-sizing: border-box; }
        body { margin: 0; overflow-x: hidden; }
      `}</style>
    </div>
  );
}
