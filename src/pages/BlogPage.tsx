import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { StarField } from "@/components/StarField";
import Footer from "@/components/Footer";

const CATEGORIES = ["最新", "公告", "安全", "代理", "技能", "工作流程", "ClawHub", "效能"];

const TAG_STYLES: Record<string, string> = {
  技能: "bg-teal-900/60 text-teal-300 border border-teal-800",
  代理: "bg-cyan-900/60 text-cyan-300 border border-cyan-800",
  工作流程: "bg-purple-900/60 text-purple-300 border border-purple-800",
  安全: "bg-emerald-900/60 text-emerald-300 border border-emerald-800",
  公告: "bg-amber-900/60 text-amber-300 border border-amber-800",
  ClawHub: "bg-teal-900/60 text-teal-300 border border-teal-800",
  Codex: "bg-slate-800/80 text-slate-300 border border-slate-700",
  效能: "bg-blue-900/60 text-blue-300 border border-blue-800",
  核准: "bg-violet-900/60 text-violet-300 border border-violet-800",
};

type Post = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  readTime?: string;
  featured?: boolean;
};

const POSTS: Post[] = [
  {
    title: "OpenClaw v2.0：多代理路由與全新 Gateway 架構",
    date: "2025年6月10日",
    excerpt: "今天我們正式發布 v2.0，帶來完整的多代理路由支援、全新 Gateway 架構以及 iOS 節點正式版。這是迄今為止最大的版本更新。",
    tags: ["公告"],
    author: "OpenClaw 團隊",
    readTime: "8分鐘",
    featured: true,
  },
  {
    title: "安全更新：針對 v1.x 的重要補丁",
    date: "2025年5月22日",
    excerpt: "我們針對 v1.x 系列發布了緊急安全補丁，修正了一個可能允許未授權存取的漏洞。強烈建議所有用戶立即更新。",
    tags: ["安全"],
    author: "安全團隊",
    readTime: "3分鐘",
    featured: true,
  },
  {
    title: "如何用技能擴展 OpenClaw",
    date: "2025年5月15日",
    excerpt: "深入了解 OpenClaw 的技能系統——如何撰寫、測試和發布你的第一個技能到 ClawHub。",
    tags: ["技能", "ClawHub"],
    author: "社群維護者",
    readTime: "12分鐘",
  },
  {
    title: "多代理工作流程：實戰指南",
    date: "2025年5月8日",
    excerpt: "探索如何設定多個協作代理，讓複雜任務自動化——從程式碼審查到研究彙整。",
    tags: ["代理", "工作流程"],
    author: "OpenClaw 團隊",
    readTime: "15分鐘",
  },
  {
    title: "Gateway 效能優化：減少延遲的實用技巧",
    date: "2025年4月30日",
    excerpt: "分享在高負載環境下優化 OpenClaw Gateway 效能的實用技巧，包括緩存策略與連接池設定。",
    tags: ["效能"],
    author: "基礎架構團隊",
    readTime: "10分鐘",
  },
  {
    title: "ClawHub 上線：社群插件生態系統",
    date: "2025年4月18日",
    excerpt: "ClawHub 是 OpenClaw 的插件市場，今日正式上線。探索數十個由社群建立的頻道插件、技能和工具。",
    tags: ["ClawHub", "公告"],
    author: "OpenClaw 團隊",
    readTime: "5分鐘",
  },
];

const READING_PATHS = [
  { label: "安裝指南", href: "https://docs.openclaw.ai/install" },
  { label: "頻道設定", href: "https://docs.openclaw.ai/channels" },
  { label: "代理配置", href: "https://docs.openclaw.ai/agents" },
  { label: "技能開發", href: "https://docs.openclaw.ai/skills" },
  { label: "ClawHub", href: "https://clawhub.ai" },
];

const TAG_CATEGORY_MAP: Record<string, string> = {
  公告: "公告",
  安全: "安全",
  代理: "代理",
  技能: "技能",
  工作流程: "工作流程",
  ClawHub: "ClawHub",
  效能: "效能",
};

function PostCard({ post, index }: { post: Post; index: number }) {
  if (post.featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-card border border-border rounded-2xl p-6 mb-6 cursor-pointer hover:border-primary/30 transition-colors"
      >
        <div className="text-xs text-muted-foreground mb-3">
          {post.date} · {post.readTime}閱讀
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground leading-snug mb-3">
          {post.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_STYLES[tag] ?? "bg-muted text-muted-foreground"}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
              {post.author[0]}
            </div>
            {post.author}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="py-5 border-b border-border cursor-pointer group hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors"
    >
      <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
      <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-muted-foreground">{post.author}</span>
        {post.readTime && (
          <span className="text-xs text-muted-foreground">{post.readTime}閱讀</span>
        )}
        {post.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_STYLES[tag] ?? "bg-muted text-muted-foreground"}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("最新");

  const filtered =
    activeCategory === "最新"
      ? POSTS
      : POSTS.filter((p) =>
          p.tags.some((t) => TAG_CATEGORY_MAP[t] === activeCategory || t === activeCategory)
        );

  return (
    <div className="min-h-screen w-full relative bg-background text-foreground">
      <StarField />
      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-8">
          {/* Left sidebar */}
          <aside className="hidden lg:block">
            <p className="text-xs font-bold tracking-widest text-primary mb-4">日誌</p>
            <nav className="space-y-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    activeCategory === cat
                      ? "text-foreground font-medium bg-white/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
            <div className="mt-8 bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold text-foreground mb-2">詢問</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                需要實作細節？從文章跳轉到文件，無需切換思維模式。
              </p>
              <a
                href="https://docs.openclaw.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-primary/80 font-medium"
              >
                開啟文件
              </a>
            </div>
          </aside>

          {/* Main content */}
          <div>
            <p className="text-xs font-bold tracking-widest text-primary mb-3">OPENCLAW 部落格</p>
            <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground leading-tight mb-4">
              我們正在構建、
              <br />
              修復和學習的事。
            </h1>
            <p className="text-muted-foreground text-sm mb-10 max-w-md">
              安全報告、版本說明、模型/運行時筆記，以及偶爾的螃蟹形狀旁白。
            </p>

            {/* Mobile category filter */}
            <div className="flex gap-2 flex-wrap mb-6 lg:hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    activeCategory === cat
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8">此分類暫無文章。</p>
            ) : (
              filtered.map((post, i) => <PostCard key={post.title} post={post} index={i} />)
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <p className="text-xs font-bold tracking-widest text-primary mb-4">閱讀路徑</p>
            <nav className="space-y-2">
              {READING_PATHS.map((path) => (
                <a
                  key={path.label}
                  href={path.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {path.label}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
