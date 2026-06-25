import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { SiDiscord, SiGithub } from "react-icons/si";
import mascotImg from "@assets/openclaw-hero-mascot.png";
import logoImg from "@assets/openclaw-logo.png";
import { StarField } from "@/components/StarField";
import Footer from "@/components/Footer";

/* ─── Hero Section (QN) ─── */
function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden flex flex-col items-center justify-center text-center px-4">
      {/* Glow centered on text area (lower), matching original layout */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Floating mascot */}
      <motion.div
        className="relative z-10 mb-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={mascotImg}
          alt="吉祥物"
          className="w-96 h-96 mx-auto object-contain drop-shadow-[0_0_15px_rgba(255,77,77,0.5)]"
          data-testid="img-mascot"
        />
      </motion.div>

      {/* Text */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <h1 className="font-heading font-bold tracking-tight bg-gradient-to-br from-[#ff4d4d] to-[#cc1616] text-transparent bg-clip-text pb-2">
          <span className="text-5xl md:text-7xl">OpenClaw</span>
          <span className="text-3xl md:text-4xl">繁體中文社群</span>
        </h1>
        <p className="text-primary font-bold tracking-widest text-sm md:text-base">
          機巧之智，行用之器
        </p>
        <p className="text-muted-foreground/60 text-xs md:text-sm tracking-widest uppercase">
          The AI that actually does things.
        </p>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          清理收件匣、傳送電子郵件、管理行事曆、辦理航班報到。全都透過 WhatsApp、Telegram 或任何你已在使用的通訊應用程式完成。
        </p>
      </div>
    </section>
  );
}

/* ─── Quick Start Section (FN) ─── */
type InstallTab = "一鍵安裝" | "npm" | "進階" | "應用程式";
const INSTALL_TABS: InstallTab[] = ["一鍵安裝", "npm", "進階", "應用程式"];

function getCommand(tab: InstallTab): string {
  switch (tab) {
    case "一鍵安裝":
      return "# 適用所有平台。自動安裝一切。不客氣。 🦞\n$ curl -fsSL https://openclaw.ai/install.sh | bash";
    case "npm":
      return "# 安裝 OpenClaw\n$ npm i -g openclaw\n\n# 與你的龍蝦相遇\n$ openclaw onboard";
    case "進階":
      return "# 複製並在本機執行\n$ git clone https://github.com/openclaw/openclaw.git\n$ cd openclaw\n$ npm install\n$ npm start";
    case "應用程式":
      return "# 下載桌面配套應用程式以獲得更好的整合體驗\n\n下載 macOS 版本：https://openclaw.ai/download/mac\n下載 Windows 版本：https://openclaw.ai/download/win";
  }
}

function renderLine(line: string, idx: number) {
  if (line === "") return <div key={idx} className="h-3" />;
  if (line.startsWith("#"))
    return <div key={idx} className="text-muted-foreground">{line}</div>;
  if (line.startsWith("$"))
    return (
      <div key={idx}>
        <span className="text-primary mr-2">$</span>
        {line.substring(2)}
      </div>
    );
  if (line.includes("http"))
    return <div key={idx} className="text-blue-400">{line}</div>;
  return <div key={idx}>{line}</div>;
}

function QuickStartSection() {
  const [tab, setTab] = useState<InstallTab>("一鍵安裝");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(getCommand(tab));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto relative z-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary font-bold text-xl">⟩</span>
        <h2 className="text-2xl font-heading font-bold text-foreground">快速開始</h2>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded border"
              style={{
                background: "rgba(255,77,77,0.15)",
                color: "#ff4d4d",
                borderColor: "rgba(255,77,77,0.25)",
              }}
            >
              macOS 與 Linux
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-border text-muted-foreground">
              Windows
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-border text-muted-foreground">
              β 測試版
            </span>
          </div>
        </div>

        {/* Install method tabs */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-border/50 bg-background/30 overflow-x-auto hide-scrollbar">
          {INSTALL_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              data-testid={`button-tab-${t}`}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                tab === t
                  ? "bg-[#27c93f]/20 text-[#27c93f]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Command area */}
        <div className="relative p-6 min-h-[160px] bg-[#050810]/50 font-mono text-sm leading-relaxed overflow-x-auto">
          <button
            onClick={handleCopy}
            data-testid="button-copy"
            className="absolute top-4 right-4 p-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
            title="複製程式碼"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {getCommand(tab).split("\n").map((line, idx) => renderLine(line, idx))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground text-center">
        支援 macOS、Linux 與 Windows。一鍵安裝指令將自動為你安裝 Node.js 及所有必要套件。之後可切換頻道：{" "}
        <code className="bg-card px-1.5 py-0.5 rounded border border-border text-foreground">openclaw update --channel dev</code>{" "}
        或{" "}
        <code className="bg-card px-1.5 py-0.5 rounded border border-border text-foreground">openclaw update --channel stable</code>。
      </p>
    </section>
  );
}

/* ─── Testimonials Section (ZN) ─── */
const TESTIMONIALS = [
  { handle: "@nickvasiles", text: "OpenClaw 是一個全天候助理，能使用自己的電腦。如果有十個、一百個、甚至一千個同時運行呢？全都在雲端 24/7 運作，存取你的檔案、Gmail、行事曆、所有關於你的一切⋯⋯那就是未來，而我們今天就在活它。", color: "bg-blue-500" },
  { handle: "@davemorin", text: "說真的，我已經不知道該怎麼稱呼 @openclaw 了。它是某種全新的東西。用了幾週後，這是自 ChatGPT 發布以來，我第一次感覺自己活在未來。", color: "bg-purple-500" },
  { handle: "@markjaquith", text: "我說了六個月，就算大型語言模型停止進步，我們也能花*幾年*時間挖掘新的革命性用途。@openclaw 就是那種「只差把所有零件黏在一起」的飛躍。令人難以置信的體驗。", color: "bg-green-500" },
  { handle: "@jonahships_", text: "昨天設定好 @openclaw，只能說——哇。我先用了 Claude Max，很快就把額度用完，所以今天讓 claw 自己建了一個代理，把 CoPilot 訂閱當 API 端點使用。它能持續在對話中自我進化，這很瘋狂。未來已經到來。", color: "bg-yellow-500" },
  { handle: "@cnakazawa", text: "OpenClaw 是我多年來第一個會不斷去 GitHub 查新版本的「軟體」。很難用言語形容，它就是個特別的專案。", color: "bg-pink-500" },
  { handle: "@therno", text: "它在幫我經營公司。", color: "bg-orange-500" },
  { handle: "@LuciusHQ", text: "歷經多年的 AI 炒作，我以為沒什麼能讓我動容。然後我裝了 @openclaw。從緊張地問「你能做什麼？」到全速衝刺——設計、程式審查、報稅、產品管理、內容流水線⋯⋯AI 作為隊友，而非工具。數位員工的終局已經到來。", color: "bg-indigo-500" },
  { handle: "@AryehDubois", text: "試用了 @steipete 的 Claw。我之前也嘗試自己建立 AI 助理，對於 Claw 做對的那麼多困難的事，印象非常深刻。持久記憶、人格導入、通訊整合、心跳機制。還有一些小瑕疵，但整體成果非常驚艷。", color: "bg-teal-500" },
];

function TestimonialsSection() {
  const top4 = TESTIMONIALS.slice(0, 4);
  const marquee = TESTIMONIALS.slice(4);
  const doubled = [...marquee, ...marquee];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-xl">⟩</span>
          <h2 className="text-2xl font-heading font-bold text-foreground">用戶怎麼說</h2>
        </div>
        <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">
          查看全部 →
        </a>
      </div>

      {/* Grid of top 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {top4.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-4 shadow-lg hover:border-border/80 transition-colors"
            data-testid={`card-testimonial-${i}`}
          >
            <div className="flex gap-3 items-center">
              <div className={`w-10 h-10 rounded-full ${t.color} shrink-0`} />
              <div className="font-semibold text-primary">{t.handle}</div>
            </div>
            <p className="text-foreground leading-relaxed text-sm md:text-base">{t.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Scrolling marquee */}
      <div className="relative overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <motion.div
          className="flex gap-6 min-w-full shrink-0 items-center justify-around"
          animate={{ x: [0, -1035] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border p-5 rounded-2xl w-[350px] shrink-0 flex flex-col gap-3 shadow-md"
            >
              <div className="flex gap-3 items-center">
                <div className={`w-8 h-8 rounded-full ${t.color} shrink-0`} />
                <div className="font-medium text-primary text-sm">{t.handle}</div>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-3">{t.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ─── Home Page ─── */
export default function HomePage() {
  return (
    <div className="min-h-screen w-full relative bg-background text-foreground selection:bg-primary/30">
      <StarField />
      <main className="relative">
        <HeroSection />
        <QuickStartSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
