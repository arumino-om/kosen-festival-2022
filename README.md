# Nyan^chat
伝言板のように使う自己完結型チャットシステム

## 環境構築
Node.js をインストール後、 `npm install` を実行してください。

## ビルド
1. `npx webpack`
2. `dist/sysfont.otf` に好きなフォントを置く

## 管理者コマンド
管理者コマンドはdevtoolsのコンソールにて実行できます。以下の関数が存在します。

- `window.postmgr.addPost(string, string, boolean)` - 投稿を追加します
- `window.postmgr.removePost(number)` - 投稿を削除します
- `window.postmgr.reRenderToUI()` - UIを再描画します

その他、`postContents` 配列を直接弄って投稿されたコンテンツの高度な管理を行うことができます。配列を直接弄った場合は `reRenderToUI()` 関数を実行して手動でUIに反映させてください。

詳しいリファレンスは `src/post-manager.ts` を参照してください。