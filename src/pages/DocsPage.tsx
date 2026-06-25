import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { SiDiscord, SiGithub } from "react-icons/si";
import { StarField } from "@/components/StarField";

const TOP_TABS = [
  "開始使用", "安裝", "頻道", "代理", "功能",
  "ClawHub", "模型", "平台", "Gateway & Ops", "參考", "說明",
];

const SIDEBAR_SECTIONS = [
  {
    title: "總覽",
    items: [
      { label: "OpenClaw", id: "overview" },
      { label: "展示", id: "showcase" },
      { label: "功能", id: "features" },
    ],
  },
  {
    title: "入門步驟",
    items: [
      { label: "開始使用", id: "getting-started" },
      { label: "引導設定總覽", id: "onboarding" },
      { label: "引導設定（CLI）", id: "onboarding-cli" },
      { label: "引導設定（macOS 應用）", id: "onboarding-macos" },
    ],
  },
  {
    title: "指南",
    items: [
      { label: "個人助理設定", id: "personal-assistant" },
      { label: "CLI 設定參考", id: "cli-reference" },
      { label: "CLI 自動化", id: "cli-automation" },
    ],
  },
];

const QUICK_START_CARDS = [
  { icon: "🚀", title: "開始使用", desc: "在幾分鐘內安裝 OpenClaw 並啟動 Gateway。" },
  { icon: "⚡", title: "執行引導設定", desc: "使用 openclaw onboard 和配對流程進行引導設定。" },
  { icon: "🖥️", title: "開啟控制 UI", desc: "啟動瀏覽器控制面板進行聊天、設定和會話管理。" },
];

const FEATURES = [
  { icon: "🔀", title: "多頻道閘道", desc: "Discord、iMessage、Signal、Slack、Telegram、WhatsApp、WebChat 等，只需單一 Gateway 程序。" },
  { icon: "🔌", title: "插件頻道", desc: "內建插件在正式版本中新增 Matrix、Nostr、Twitch、Zalo 等頻道。" },
  { icon: "🤖", title: "多代理路由", desc: "依代理、工作區或發件人隔離的會話。" },
  { icon: "🖼️", title: "媒體支援", desc: "傳送和接收圖片、音訊與文件。" },
  { icon: "💻", title: "網頁控制 UI", desc: "用於聊天、設定、會話和節點的瀏覽器控制面板。" },
  { icon: "📱", title: "行動節點", desc: "配對 iOS 和 Android 節點，支援 Canvas、相機和語音工作流程。" },
];

const RIGHT_SIDEBAR = [
  { label: "什麼是 OpenClaw？", href: "#what-is" },
  { label: "運作原理", href: "#how-it-works" },
  { label: "主要功能", href: "#capabilities" },
  { label: "快速開始", href: "#quick-start" },
  { label: "控制面板", href: "#control-ui" },
  { label: "設定（選用）", href: "#config" },
  { label: "從這裡開始", href: "#start" },
  { label: "深入了解", href: "#deeper" },
];

function Code({ children }: { children: string }) {
  return (
    <code className="bg-card border border-border px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
      {children}
    </code>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen w-full relative bg-background text-foreground">
      <StarField />

      {/* Top tabs bar */}
      <div className="sticky top-14 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          {TOP_TABS.map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                i === 0
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3 pl-4 shrink-0">
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://discord.gg/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              Discord <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-0">
          {/* Left sidebar */}
          <aside className="hidden lg:block sticky top-28 self-start h-[calc(100vh-7rem)] overflow-y-auto py-6 pr-6 border-r border-border">
            {SIDEBAR_SECTIONS.map((section) => (
              <div key={section.title} className="mb-6">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase px-2 mb-2">
                  {section.title}
                </p>
                <nav className="space-y-0.5">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 ${
                        activeSection === item.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {activeSection === item.id && <ChevronRight className="w-3 h-3 shrink-0" />}
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </aside>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 px-0 lg:px-10 min-w-0"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
              <span>開始使用</span>
              <ChevronRight className="w-3 h-3" />
              <span>總覽</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">OpenClaw</span>
            </div>

            <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">總覽</p>
            <h1 className="text-4xl font-heading font-black text-foreground mb-6">OpenClaw</h1>

            {/* Hero card */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-6 text-center">
              <div className="text-6xl mb-3">🦞</div>
              <div className="font-heading font-black text-3xl">
                <span className="text-white">Open</span>
                <span className="text-primary">Claw</span>
              </div>
              <blockquote className="mt-4 text-sm text-muted-foreground italic">
                "EXFOLIATE! EXFOLIATE!" — 一隻太空龍蝦，大概是
              </blockquote>
              <p className="mt-3 text-sm font-medium text-foreground max-w-xl mx-auto leading-relaxed">
                跨 Discord、Google Chat、iMessage、Matrix、Microsoft Teams、Signal、Slack、Telegram、WhatsApp、Zalo 等平台的任何作業系統 AI 代理閘道。
              </p>
              <p className="mt-2 text-xs text-muted-foreground max-w-lg mx-auto">
                傳送訊息，從口袋獲得代理回應。在內建頻道、內建頻道插件、WebChat 和行動節點上執行單一 Gateway。
              </p>
            </div>

            {/* Quick start cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {QUICK_START_CARDS.map((card) => (
                <div key={card.title} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <div className="font-semibold text-sm text-foreground mb-1">{card.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{card.desc}</div>
                </div>
              ))}
            </div>

            {/* What is OpenClaw */}
            <section id="what-is" className="mt-10">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">什麼是 OpenClaw？</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                OpenClaw 是一個<strong className="text-foreground">自架閘道</strong>，連接你最愛的聊天應用程式和頻道介面——內建頻道加上如 Discord、Google Chat、iMessage、Matrix、Microsoft Teams、Signal、Slack、Telegram、WhatsApp、Zalo 等內建或外部頻道插件——到 AI 編程代理。你在自己的機器（或伺服器）上執行單一 Gateway 程序，它成為你的訊息應用程式和永遠在線的 AI 助理之間的橋梁。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                <strong className="text-foreground">適合誰？</strong> 想要可以從任何地方傳訊息的個人 AI 助理，且不放棄資料控制權或依賴托管服務的開發者和進階用戶。
              </p>
              <div className="bg-card/50 border border-border rounded-xl p-5 mb-4 space-y-2">
                <p className="text-sm font-semibold text-foreground mb-3">有什麼不同？</p>
                {[
                  ["🏠", "自架", "在你的硬體上執行，你的規則"],
                  ["📡", "多頻道", "單一 Gateway 同時服務內建頻道加上內建或外部頻道插件"],
                  ["🤖", "代理原生", "為具有工具使用、會話、記憶和多代理路由的編程代理而建構"],
                  ["🔓", "開源", "MIT 授權，社群驅動"],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="text-base">{icon}</span>
                    <div>
                      <span className="text-sm font-semibold text-foreground">{title}：</span>
                      <span className="text-sm text-muted-foreground">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">需要什麼？</strong> Node 24（推薦），或 Node 22 LTS（<Code>22.19+</Code>）以確保相容性，從你選擇的提供者取得 API 金鑰，以及 5 分鐘。
              </p>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="mt-10">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">運作原理</h2>
              <div className="bg-card border border-border rounded-xl p-6 flex flex-wrap items-center justify-center gap-2 text-sm font-mono">
                {["聊天應用程式 + 插件", "→", "Gateway", "→2", "OpenClaw 代理", "→3", "CLI / 網頁 UI / macOS 應用 / iOS & Android 節點"].map(
                  (item) => (
                    <span
                      key={item}
                      className={
                        item.startsWith("→")
                          ? "text-primary"
                          : "bg-background/50 border border-border rounded-lg px-3 py-1.5 text-xs"
                      }
                    >
                      {item.startsWith("→") ? "→" : item}
                    </span>
                  )
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Gateway 是會話、路由和頻道連接的唯一真實來源。
              </p>
            </section>

            {/* Capabilities */}
            <section id="capabilities" className="mt-10">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">主要功能</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map((f) => (
                  <div key={f.title} className="bg-card/50 border border-border rounded-xl p-5 hover:border-primary/20 transition-colors">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <div className="font-semibold text-sm text-foreground mb-1">{f.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ask Molty panel */}
            <div className="mt-8 p-3 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🦞</span>
                <span className="text-xs font-semibold text-foreground">詢問 Molty</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                回應由 AI 生成，可能包含錯誤。
              </p>
            </div>
          </motion.div>

          {/* Right sidebar */}
          <aside className="hidden lg:block sticky top-28 self-start py-6 pl-6 border-l border-border">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-3">
              本頁內容
            </p>
            <nav className="space-y-1.5">
              {RIGHT_SIDEBAR.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
