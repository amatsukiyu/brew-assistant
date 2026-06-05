# CLAUDE.md — 沖煮助手 Brew Studio

給 Claude Code 的專案說明。動手前請先讀這份，並遵守以下規則。

## 專案是什麼
手機優先的咖啡手沖助手。使用者依「豆子烘焙度＋想要的風味」挑一種沖煮法，
預覽完整步驟後，跟著計時器一步步沖。資料來自 James Hoffmann 與粕谷哲（Tetsu Kasuya）的公開沖煮法。

## 技術與部署
- **單一自包含 HTML 檔**：`index.html`，CSS 在 `<style>`、JS 在 `<script>`，沒有建置步驟（no build step）。
- 部署到 **Vercel 靜態網站**（zero-config，輸出目錄為根目錄）。
- 版本控制用 **GitLab**，push 到 `main` 後 Vercel 自動部署。
- 本機預覽：直接用瀏覽器開 `index.html`，或在資料夾跑 `npx serve`。
- **禁止使用 localStorage / sessionStorage**（部分環境會失效）；狀態用 JS 變數即可。

## 設計系統（重要，改動務必沿用）
**三套字體，各司其職：**
- `--serif-en`（Fraunces）：只用於數字／英文——計時、克數、秒數、STEP、時間、品牌名。
- `--serif-cn`（Shippori Mincho B1）：中文標題——頁面大標、方法名、步驟名、按鈕。
- `--sans`（Noto Sans TC）：所有中文內文與標籤。
- **鐵則**：中文句子裡的強調**不換字體**，用「加粗＋琥珀色（--amber-deep）」表達。數值格用 `--num`（Fraunces→Shippori 後備）處理中英混排。

**六級字尺（只能用這六個值，全綁在 CSS 變數）：**
`--t-display:40 / --t-title:28 / --t-head:20 / --t-body:16 / --t-sm:14 / --t-label:12`
不要再引入其他字級；要調整大小就改變數值。

**色票**：暖色系，主要變數 `--paper / --card / --ink / --ink-soft / --amber / --amber-deep / --green`。

## 沖煮資料（請小心對待）
- 沖煮法定義在 `<script>` 裡的 `METHODS` 陣列。
- 每個 step 欄位：`t`（秒）、`valve`（'open'/'close'/null）、`temp`、`water`（**累計**水量 g）、`act`、`note`。
- 「本次注水量」由累計差值算出（`pourOf`）。
- **沒有經過我明確確認，不要更動任何沖煮參數**（粉量、水量、水溫、秒數、研磨度）。這些是有來源的食譜。

## UI 慣例
- 手機優先；維持 ≤520px 置中容器。
- **閥門狀態（開／關）是最容易沖錯的資訊，必須維持最強的視覺對比**（開＝綠、關＝棕）。
- 計時頁只有兩塊：「現在卡（含倒數）」＋「可展開的步驟清單（自動展開下一步）」。
- 預設維持單檔；要拆檔請先說計畫並等我確認。

## 與我協作的方式
- 較大的改動：**先給計畫，等我確認再動手**。
- 改完請說明改了什麼；可以幫我 `git commit`（訊息用繁體中文）與 `push`。
