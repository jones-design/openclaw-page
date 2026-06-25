import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { SiDiscord, SiGithub } from "react-icons/si";
import { Sun, Moon } from "lucide-react";
import logoImg from "@/assets/openclaw-logo.png";

const NAV_LINKS = [
  { label: "產品", href: "/" },
  { label: "生態系統", href: "/ecosystem" },
  { label: "整合", href: "/integrations" },
  { label: "部落格", href: "/blog" },
  { label: "文件", href: "/docs" },
];

export function Navbar() {
  const [location] = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark");
      return next;
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <img src={logoImg} alt="OpenClaw 標誌" className="w-7 h-7" />
          <span className="font-heading font-semibold text-lg text-foreground">OpenClaw</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? location === "/" : location.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                data-testid={`link-nav-${link.label}`}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="h-4 w-px bg-border mx-2" />
          <a
            href="https://discord.gg/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-discord"
            className="p-2 text-muted-foreground hover:text-white transition-colors"
          >
            <SiDiscord className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-github"
            className="p-2 text-muted-foreground hover:text-white transition-colors"
          >
            <SiGithub className="w-5 h-5" />
          </a>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
          className="p-2 text-muted-foreground hover:text-white transition-colors"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
