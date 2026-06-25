import { motion } from "framer-motion";

type Project = {
  name: string;
  description: string;
  repo?: string;
  site?: string;
  banner: string;
  logo?: string;
  category: string;
};

const CATEGORIES = [
  { id: "代理與服務", label: "代理與服務" },
  { id: "本地爬蟲", label: "本地爬蟲" },
  { id: "代理基礎設施與SDK", label: "代理基礎設施與 SDK" },
  { id: "TypeScript函式庫", label: "TypeScript 函式庫" },
  { id: "原生工具", label: "原生工具" },
  { id: "其他", label: "其他" },
];

const PROJECTS: Project[] = [
  { name: "photoscrawl", description: "本地優先 Apple Photos 存檔，用於可搜尋的代理上下文。", repo: "https://github.com/openclaw/photoscrawl", banner: "https://openclaw.ai/ecosystem/banners/photoscrawl.svg", category: "本地爬蟲" },
  { name: "notcrawl", description: "本地優先 Notion 爬蟲，輸出至 SQLite 與標準化 Markdown。", repo: "https://github.com/openclaw/notcrawl", banner: "https://openclaw.ai/ecosystem/banners/notcrawl.png", category: "本地爬蟲" },
  { name: "telecrawl", description: "爪子專用 Telegram 存檔，讀取歷史紀錄、搜尋討論串。", repo: "https://github.com/openclaw/telecrawl", banner: "https://openclaw.ai/ecosystem/banners/telecrawl.png", category: "本地爬蟲" },
  { name: "crawlkit", description: "每個爬蟲的基礎共享 Go 基礎設施。", repo: "https://github.com/openclaw/crawlkit", banner: "https://openclaw.ai/ecosystem/banners/crawlkit.png", category: "本地爬蟲" },
  { name: "crawlbar", description: "本地優先爬蟲應用程式的選單列控制平面。", repo: "https://github.com/openclaw/crawlbar", banner: "https://openclaw.ai/ecosystem/banners/crawlbar.png", category: "本地爬蟲" },
  { name: "acpx", description: "用於有狀態 ACP 會話的無頭 CLI 客戶端。", site: "https://acpx.sh/", repo: "https://github.com/openclaw/acpx", banner: "https://openclaw.ai/ecosystem/banners/acpx.png", category: "代理基礎設施與SDK" },
  { name: "mcporter", description: "以 TypeScript 呼叫 MCP，如同使用簡單的 TS API，或打包為 CLI。", site: "https://mcporter.sh/", repo: "https://github.com/openclaw/mcporter", banner: "https://openclaw.ai/ecosystem/banners/mcporter.png", category: "代理基礎設施與SDK" },
  { name: "Tachikoma", description: "統一介面，支援所有 AI 模型。用於對接 AI 提供商的 Swift SDK。", site: "https://tachikoma.build/", repo: "https://github.com/openclaw/Tachikoma", banner: "https://openclaw.ai/ecosystem/banners/tachikoma.png", logo: "https://openclaw.ai/ecosystem/logos/tachikoma.png", category: "代理基礎設施與SDK" },
  { name: "clawpatch", description: "審查程式碼、修復錯誤、合併 PR。", site: "https://clawpatch.ai/", repo: "https://github.com/openclaw/clawpatch", banner: "https://openclaw.ai/ecosystem/banners/clawpatch.png", logo: "https://openclaw.ai/ecosystem/logos/clawpatch.svg", category: "代理基礎設施與SDK" },
  { name: "clawbench", description: "評分整個技術棧的代理基準——工具配置、模型，而不僅僅是 LLM。", repo: "https://github.com/openclaw/clawbench", banner: "https://openclaw.ai/ecosystem/banners/clawbench.png", category: "代理基礎設施與SDK" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border rounded-xl overflow-hidden hover:border-primary/30 transition-colors group"
      style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
      data-testid={`card-project-${project.name}`}
    >
      {/* Banner */}
      <div className="h-32 bg-muted overflow-hidden">
        <img
          src={project.banner}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          {project.logo && (
            <img src={project.logo} alt="" className="w-5 h-5 rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          )}
          <h3 className="font-heading font-semibold text-foreground">{project.name}</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{project.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
            >
              GitHub
            </a>
          )}
          {project.site && (
            <a
              href={project.site}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:opacity-80 transition-opacity"
            >
              網站 →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function EcosystemPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
          生態系統
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          OpenClaw 周邊的開源工具與服務——從爬蟲到代理基礎設施，一應俱全。
        </p>
      </div>

      {CATEGORIES.map((cat) => {
        const projects = PROJECTS.filter((p) => p.category === cat.id);
        if (projects.length === 0) return null;
        return (
          <div key={cat.id} className="mb-16">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6 flex items-center gap-3">
              <span className="text-primary">⟩</span>
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projects.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
