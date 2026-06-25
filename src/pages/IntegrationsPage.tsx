import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiDiscord, SiTelegram, SiWhatsapp, SiSlack, SiGithub } from "react-icons/si";
import { StarField } from "@/components/StarField";
import Footer from "@/components/Footer";

const STATS = [
  { value: "20+", label: "聊天頻道" },
  { value: "15+", label: "模型提供者" },
  { value: "50+", label: "社群技能" },
  { value: "100%", label: "自架控制" },
];

type Badge = "內建" | "官方插件" | "外部插件";

const BADGE_STYLES: Record<Badge, string> = {
  "內建": "bg-primary/10 text-primary border border-primary/20",
  "官方插件": "bg-blue-900/60 text-blue-300 border border-blue-800",
  "外部插件": "bg-gray-800 text-gray-300 border border-gray-700",
};

const CHANNELS: { name: string; desc: string; badge: Badge; icon: string }[] = [
  { name: "iMessage", desc: "透過 imsg 橋接器使用原生 macOS 訊息。", badge: "內建", icon: "📱" },
  { name: "IRC", desc: "經典 IRC 頻道與私訊，含存取控制。", badge: "內建", icon: "#" },
  { name: "Mattermost", desc: "透過 Bot API 與 WebSocket 使用頻道、群組與私訊。", badge: "內建", icon: "🟦" },
  { name: "Signal", desc: "透過 signal-cli 使用注重隱私的訊息功能。", badge: "內建", icon: "🔵" },
  { name: "SMS", desc: "透過 Twilio Gateway 使用文字訊息。", badge: "內建", icon: "💬" },
  { name: "Telegram", desc: "Bot API 對話、群組與豐富媒體。", badge: "內建", icon: "✈️" },
  { name: "WebChat", desc: "透過 WebSocket 使用 Gateway 托管的瀏覽器聊天。", badge: "內建", icon: "🌐" },
  { name: "Discord", desc: "伺服器、頻道、私訊、指令與應用事件。", badge: "官方插件", icon: "🎮" },
  { name: "Feishu / Lark", desc: "透過 WebSocket 使用職場聊天與工具。", badge: "官方插件", icon: "🐦" },
  { name: "Google Chat", desc: "透過 Chat 應用程式使用空間與私訊。", badge: "官方插件", icon: "💬" },
  { name: "LINE", desc: "LINE Messaging API 機器人對話。", badge: "官方插件", icon: "🟩" },
  { name: "Matrix", desc: "透過 Matrix 使用房間與私訊。", badge: "官方插件", icon: "🔲" },
  { name: "Microsoft Teams", desc: "透過 Bot Framework 使用企業對話。", badge: "官方插件", icon: "🟪" },
  { name: "Nostr", desc: "去中心化加密私訊。", badge: "官方插件", icon: "⚡" },
  { name: "QQ Bot", desc: "私訊、群組聊天與豐富媒體。", badge: "官方插件", icon: "🐧" },
  { name: "Slack", desc: "頻道、私訊、指令與應用事件。", badge: "官方插件", icon: "💼" },
  { name: "Twitch", desc: "直播聊天與管理工作流程。", badge: "官方插件", icon: "🎮" },
  { name: "WhatsApp", desc: "透過 QR 配對使用 WhatsApp Web 聊天。", badge: "官方插件", icon: "📲" },
  { name: "WeChat / 微信", desc: "透過 QR 登入使用騰訊 iLink 訊息。", badge: "外部插件", icon: "💚" },
  { name: "Zalo", desc: "Zalo Bot API 聊天與 Webhook。", badge: "外部插件", icon: "🔵" },
];

const PROVIDERS: { name: string; desc: string; badge: Badge; icon: string }[] = [
  { name: "Anthropic", desc: "Claude API 與 Claude CLI，支援 API 金鑰與訂閱路由。", badge: "內建", icon: "🟤" },
  { name: "OpenAI", desc: "OpenAI API 加上 ChatGPT/Codex 登入與原生 Codex 執行。", badge: "內建", icon: "⬛" },
  { name: "Google", desc: "Gemini API 與 CLI OAuth，跨聊天、搜尋、媒體與語音。", badge: "內建", icon: "🔵" },
  { name: "xAI", desc: "Grok OAuth 與 API 路由，支援搜尋、程式碼、圖像、影片與語音。", badge: "內建", icon: "𝕏" },
  { name: "MiniMax", desc: "透過 Coding Plan OAuth 和 API 金鑰路由使用聊天與媒體生成。", badge: "內建", icon: "🤖" },
  { name: "Moonshot / Kimi", desc: "Kimi 通用模型與獨立的程式碼導向提供者。", badge: "內建", icon: "🌙" },
  { name: "Qwen", desc: "阿里雲 Qwen 系列模型，支援 API 金鑰路由。", badge: "內建", icon: "🟠" },
  { name: "Deepseek", desc: "DeepSeek API，支援推理和程式碼模型。", badge: "官方插件", icon: "🔍" },
  { name: "Mistral", desc: "Mistral AI API，支援 API 金鑰路由。", badge: "官方插件", icon: "🌪️" },
  { name: "Ollama", desc: "本地 LLM 推理，支援數百個模型。", badge: "官方插件", icon: "🦙" },
  { name: "Groq", desc: "超高速推理，支援多種開源模型。", badge: "官方插件", icon: "⚡" },
  { name: "Together AI", desc: "雲端推理，支援開源模型。", badge: "官方插件", icon: "🤝" },
];

function IntCard({ item, delay }: { item: (typeof CHANNELS)[0]; delay: number }) {
  const badgeStyle = BADGE_STYLES[item.badge];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-background/60 border border-border flex items-center justify-center text-lg">
          {item.icon}
        </div>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${badgeStyle}`}>
          {item.badge}
        </span>
      </div>
      <div>
        <div className="font-semibold text-sm text-foreground">{item.name}</div>
        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</div>
      </div>
    </motion.div>
  );
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen w-full relative bg-background text-foreground selection:bg-primary/30">
      <StarField />
      <main className="relative">
        {/* Hero */}
        <section className="pt-20 pb-12 text-center px-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
          <h1 className="font-heading font-bold text-5xl md:text-7xl bg-gradient-to-br from-[#ff6b6b] to-[#ff4d4d] text-transparent bg-clip-text pb-2 relative z-10">
            整合
          </h1>
          <p className="mt-4 text-foreground/90 text-lg max-w-xl mx-auto relative z-10">
            將 OpenClaw 連接到你已在使用的聊天、模型、工具與裝置。
          </p>
          <p className="mt-2 text-muted-foreground text-sm max-w-2xl mx-auto relative z-10">
            帶入 API 金鑰、登入支援的訂閱方案、透過 Gateway 路由，或在本地執行模型。以官方插件和社群技能擴展運行時。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 relative z-10">
            <a
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm shadow-[0_4px_20px_rgba(255,77,77,0.3)]"
            >
              閱讀文件 <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://clawhub.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-semibold rounded-lg hover:border-primary/40 transition-colors text-sm"
            >
              瀏覽 ClawHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Stats */}
        <div className="max-w-5xl mx-auto px-4 mb-16 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border border border-border rounded-2xl overflow-hidden relative z-10">
          {STATS.map((s) => (
            <div key={s.label} className="px-8 py-6 bg-card/40">
              <div className="text-3xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chat Channels */}
        <section className="max-w-6xl mx-auto px-4 mb-20 relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-bold tracking-widest text-primary mb-2">訊息 · OPENCLAW · 隨處可用</p>
              <h2 className="text-3xl font-heading font-bold">聊天頻道</h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-xl">
                同時運行多個頻道，透過 Gateway 路由每段對話。內建頻道隨 OpenClaw 附帶；官方與外部插件另行安裝。
              </p>
            </div>
            <a
              href="https://docs.openclaw.ai/channels"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 text-sm font-medium whitespace-nowrap flex items-center gap-1 mt-2"
            >
              頻道目錄 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHANNELS.map((c, i) => (
              <IntCard key={c.name} item={c} delay={i * 0.04} />
            ))}
          </div>
        </section>

        {/* Providers */}
        <section className="max-w-6xl mx-auto px-4 mb-20 relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-bold tracking-widest text-primary mb-2">雲端、訂閱、Gateway 或本地</p>
              <h2 className="text-3xl font-heading font-bold">模型與媒體提供者</h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-xl">
                OpenClaw 將模型選擇、身份驗證與執行運行時分開管理。提供者也可新增搜尋、語音、圖像、影片、音樂與媒體理解功能。
              </p>
            </div>
            <a
              href="https://docs.openclaw.ai/providers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 text-sm font-medium whitespace-nowrap flex items-center gap-1 mt-2"
            >
              提供者目錄 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {PROVIDERS.map((p, i) => (
              <IntCard key={p.name} item={p} delay={i * 0.05} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
