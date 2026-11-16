# 溫室研究筆記｜Greenhouse Lab Notes

一個以溫室塗白漆節能實驗為核心的靜態研究筆記網站。網站整理實驗背景、每分地耗電量、計算方式、結果討論與研究限制，並透過 `AGENTS.md` 定義可重複使用的 AI 開發規則。

## 網站頁面

- `index.html`：首頁與內容導覽
- `pages/white-paint.html`：溫室塗白漆實驗數據與初步分析
- `pages/measurement-guide.html`：資料解讀、計算方式與研究限制

## 技術

- HTML、CSS、JavaScript
- 無需建置工具或後端
- 實驗資料集中維護於 `data/experiment-data.json`
- AI 開發規則：`AGENTS.md`

## 本機預覽

建議使用 VS Code 的 Live Server，或在專案根目錄執行：

```bash
python -m http.server 8000
```

再開啟 `http://localhost:8000`。

## GitHub Pages 部署

1. 將整個資料夾內容上傳到 GitHub Repository 根目錄。
2. Repository 設為 Public（GitHub Free 公開 Pages 的常見設定）。
3. 進入 Settings → Pages。
4. 在 Build and deployment 選擇 Deploy from a branch。
5. Branch 選 `main`，資料夾選 `/(root)`，儲存設定。
6. 部署完成後，從 Pages 設定頁開啟網站網址。

## 如何擴充

新增一般內容頁時，先閱讀 `AGENTS.md`，複製 `templates/page-template.html`，依規定命名並放入 `pages/`。若更新實驗數字，應先修改 `data/experiment-data.json`，再更新頁面引用與導覽。不可自行補造資料或把觀察差異寫成已證實的因果關係。
