import { SiDiscord, SiGithub } from "react-icons/si";
import logoImg from "@assets/openclaw-logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background relative z-10 py-12 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="OpenClaw 標誌" className="w-6 h-6 grayscale opacity-50" />
          <span className="font-heading font-semibold text-muted-foreground">OpenClaw</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
            文件
          </a>
          <a
            href="https://discord.gg/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5"
          >
            <SiDiscord /> Discord
          </a>
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5"
          >
            <SiGithub /> GitHub
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">
            部落格
          </a>
        </div>
        <div className="text-sm text-muted-foreground/50">© 2025 OpenClaw</div>
      </div>
    </footer>
  );
}
