# 沖煮助手 · Brew Studio

手機優先的咖啡手沖助手：依豆子烘焙度與想要的風味挑選沖煮法，預覽步驟後跟著計時器逐步沖煮。
沖煮法整理自 James Hoffmann 與粕谷哲（Tetsu Kasuya）的公開配方。

## 本機預覽
直接用瀏覽器開 `index.html` 即可，沒有建置步驟。
或在資料夾執行：

```bash
npx serve
```

## 部署
靜態網站，部署到 Vercel：

1. 推送到 GitLab。
2. 在 Vercel 匯入此 GitLab repo（Framework Preset 選「Other」，無 build command）。
3. 之後每次 push 到 `main`，Vercel 會自動部署。

## 檔案
- `index.html` — 整個 App（HTML + CSS + JS 單檔自包含）
- `CLAUDE.md` — 給 Claude Code 的專案規則與設計系統

## 技術備註
- 單一自包含 HTML，無相依套件、無 build。
- 不使用瀏覽器儲存（localStorage 等）。
- 字體由 Google Fonts 線上載入，首次開啟需網路。
