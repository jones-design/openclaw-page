import { useState, useEffect, useRef } from "react";
import { SiDiscord, SiGithub } from "react-icons/si";
import { Sun, Moon, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "產品", href: "#" },
  { label: "生態系統", href: "#" },
  { label: "整合", href: "#" },
  { label: "部落格", href: "#" },
  { label: "文件", href: "#" },
];

const OS_TABS = [
  { id: "macos", label: "macOS 及 Linux" },
  { id: "windows", label: "Windows" },
  { id: "beta", label: "β 測試版" },
];

const INSTALL_COMMANDS: Record<string, string[]> = {
  macos: [
    "# 透過 curl 快速安裝",
    'curl -fsSL --proto \'=https\' --tlsv1.2 \\',
    "  https://openclaw.ai/install.sh | bash -s -- \\",
    "  --install-method git --version main",
    "",
    "# 確認安裝",
    "openclaw --version",
    "openclaw doctor",
  ],
  windows: [
    "# 透過 PowerShell 安裝",
    "irm https://openclaw.ai/install.ps1 | iex",
    "",
    "# 確認安裝",
    "openclaw --version",
    "openclaw doctor",
  ],
  beta: [
    "# 安裝 Beta 測試版",
    'curl -fsSL --proto \'=https\' --tlsv1.2 \\',
    "  https://openclaw.ai/install.sh | bash -s -- \\",
    "  --install-method git --version beta",
    "",
    "# 回報問題或建議",
    "openclaw feedback",
  ],
};

type Particle = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("macos");
  const [isDark, setIsDark] = useState(true);
  const [particles] = useState<Particle[]>(() => generateParticles(120));
  const [activeNav, setActiveNav] = useState("產品");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#03040D", color: "#e8eaf0" }}
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Hero radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hero-glow"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(120,10,10,0.55) 0%, rgba(80,5,5,0.25) 45%, transparent 75%)",
        }}
      />

      {/* Top glow bar */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "600px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(200,30,30,0.4), transparent)",
        }}
      />

      {/* Navigation */}
      <nav
        className="relative z-20 flex items-center justify-between px-8 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2" data-testid="link-logo">
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: "#f0f4ff", fontFamily: "'Inter', sans-serif" }}
          >
            OpenClaw
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-testid={`link-nav-${link.label}`}
              onClick={() => setActiveNav(link.label)}
              className="px-3 py-1.5 text-sm rounded-md transition-all duration-200"
              style={{
                color:
                  activeNav === link.label
                    ? "#f0f4ff"
                    : "rgba(160,165,185,0.8)",
                background:
                  activeNav === link.label
                    ? "rgba(255,255,255,0.07)"
                    : "transparent",
                fontWeight: activeNav === link.label ? 500 : 400,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://discord.gg/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-discord"
            className="transition-opacity hover:opacity-70"
            style={{ color: "rgba(160,165,185,0.7)" }}
          >
            <SiDiscord size={18} />
          </a>
          <a
            href="https://github.com/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-github"
            className="transition-opacity hover:opacity-70"
            style={{ color: "rgba(160,165,185,0.7)" }}
          >
            <SiGithub size={18} />
          </a>
          <button
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="ml-1 p-1.5 rounded-md transition-colors"
            style={{
              color: "rgba(160,165,185,0.7)",
              background: "transparent",
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: "calc(100vh - 60px)", paddingTop: "80px", paddingBottom: "160px" }}
      >
        {/* Claw decoration above title */}
        <div className="mb-6 flex items-center gap-8 opacity-40">
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(200,40,40,0.6))",
            }}
          />
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "linear-gradient(90deg, rgba(200,40,40,0.6), transparent)",
            }}
          />
        </div>

        {/* Main headline */}
        <h1
          className="animate-in"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          <span style={{ color: "#e8341e" }}>OpenClaw</span>
          <span style={{ color: "#f0f4ff" }}>繁體中文社群</span>
        </h1>

        {/* Tagline */}
        <p
          className="animate-in"
          style={{
            color: "#e8341e",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            fontWeight: 500,
            marginBottom: "1rem",
            animationDelay: "0.1s",
          }}
        >
          機巧之智，行用之器
        </p>

        {/* Subtitle */}
        <p
          className="animate-in"
          style={{
            color: "rgba(150,158,185,0.8)",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            animationDelay: "0.2s",
          }}
        >
          THE AI THAT ACTUALLY DOES THINGS.
        </p>

        {/* Description */}
        <p
          className="animate-in max-w-xl"
          style={{
            color: "rgba(180,188,210,0.85)",
            fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
            lineHeight: 1.75,
            animationDelay: "0.3s",
          }}
        >
          清理收件匣、傳送電子郵件、管理行事曆、辦理航班報到，全都透過
          WhatsApp、Telegram 或任何你已在使用的通訊應用程式完成。
        </p>

        {/* Quick Start Section */}
        <div className="w-full max-w-2xl mt-20">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-5">
            <ChevronRight
              size={16}
              style={{ color: "#e8341e" }}
            />
            <span
              style={{
                color: "#f0f4ff",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              快速開始
            </span>
          </div>

          {/* Terminal window */}
          <div className="terminal-window text-left">
            {/* Title bar */}
            <div className="terminal-titlebar">
              <div className="terminal-dot" style={{ background: "#FF5F57" }} />
              <div className="terminal-dot" style={{ background: "#FEBC2E" }} />
              <div className="terminal-dot" style={{ background: "#28C840" }} />
              <div className="flex-1" />
              {/* OS Tabs */}
              <div className="flex items-center gap-1">
                {OS_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    data-testid={`button-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-3 py-1 text-xs rounded transition-all"
                    style={{
                      background:
                        activeTab === tab.id
                          ? "rgba(232,52,30,0.25)"
                          : "rgba(255,255,255,0.05)",
                      color:
                        activeTab === tab.id
                          ? "#e8341e"
                          : "rgba(150,158,185,0.7)",
                      border:
                        activeTab === tab.id
                          ? "1px solid rgba(232,52,30,0.35)"
                          : "1px solid transparent",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal body */}
            <div className="terminal-body" data-testid="terminal-body">
              {INSTALL_COMMANDS[activeTab].map((line, i) => {
                if (line === "") {
                  return <div key={i} style={{ height: "0.8em" }} />;
                }
                if (line.startsWith("#")) {
                  return (
                    <div key={i} className="terminal-comment">
                      {line}
                    </div>
                  );
                }
                if (line.startsWith("openclaw") || line.startsWith("irm")) {
                  return (
                    <div key={i}>
                      <span className="terminal-prompt">$ </span>
                      {line}
                    </div>
                  );
                }
                return (
                  <div key={i}>
                    <span className="terminal-prompt">  </span>
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,30,30,0.3) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
