# OpenClaw 繁體中文社群

OpenClaw 繁體中文社群網站的複刻版本，使用 React + Vite + Tailwind CSS 建構。

## 功能頁面

- **首頁**（`/`）— 吉祥物動畫、快速開始終端機、用戶評價
- **生態系統**（`/ecosystem`）— 合作夥伴與整合生態
- **整合**（`/integrations`）— 20+ 聊天頻道 + 15+ 模型提供者
- **部落格**（`/blog`）— 文章列表、分類篩選
- **文件**（`/docs`）— 三欄式文件版面、導覽側欄

## 技術堆疊

- **框架**：React 18 + TypeScript
- **建構工具**：Vite 7
- **樣式**：Tailwind CSS v4
- **動畫**：Framer Motion
- **路由**：Wouter
- **圖示**：Lucide React + React Icons

## 本地開發

### 安裝依賴

```bash
npm install
# 或
pnpm install
```

### 啟動開發伺服器

```bash
npm run dev
# 或
pnpm dev
```

瀏覽器開啟 [http://localhost:5173](http://localhost:5173)

### 建構生產版本

```bash
npm run build
```

建構輸出會放在 `dist/` 目錄。

### 預覽生產版本

```bash
npm run preview
```

## 環境變數

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `PORT` | `5173` | 開發伺服器埠號 |
| `BASE_PATH` | `/` | 應用程式基礎路徑（部署在子路徑時使用） |

## 部署

本專案為純靜態前端，可部署至任何靜態託管服務：

- **GitHub Pages**：設定 `BASE_PATH` 為你的 repo 名稱（例如 `/openclaw-tw/`）
- **Vercel / Netlify**：直接部署，無需額外設定
- **自架伺服器**：將 `dist/` 目錄內容放到任意 HTTP 伺服器

### 部署至 GitHub Pages

1. 修改 `vite.config.ts`，設定 `base: '/你的repo名稱/'`
2. 執行 `npm run build`
3. 將 `dist/` 目錄推送到 `gh-pages` 分支

## 授權

MIT License
