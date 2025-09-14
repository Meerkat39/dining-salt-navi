# copilot-instructions

## プロジェクト概要

- 本プロジェクトの全体像・目的・要件は以下のファイルを参照してください。
  - 要件定義書：`docs/要件定義書.md`
  - 機能要件：`docs/機能要件.md`
  - ユーザーフロー：`docs/ユーザーフロー.md`

## 開発・運用ルールまとめ

- ディレクトリ構成は Bulletproof-React を参考に、機能・サブ機能ごとに整理（詳細は `docs/ディレクトリ構成.md` 参照）
- コーディング規約：JSDoc コメント必須、日本語で分かりやすいコメントを徹底（詳細は `docs/コーディング規約.md` 参照）
- git 運用：機能ごとにブランチ、コミット種別明記、main へはテスト・レビュー後マージ（詳細は `docs/git運用ルール.md` 参照）
- テスト：Jest/React Testing Library、同階層の `test` ディレクトリに配置（詳細は `docs/テスト運用ルール.md` 参照）
- CI：GitHub Actions で自動テスト・ビルド（詳細は `docs/CI_CD運用ルール.md` 参照）
- 技術スタック：Next.js, React, TypeScript, Tailwind CSS（詳細は `docs/技術スタック.md` 参照）
- ロードマップ（詳細は `docs/ロードマップ.md` 参照）：
  1. 仮データでフロント開発
  2. 店舗・メニュー・塩分量などのデータ収集
  3. データ連携・バックエンド実装（Supabase はまだ使わない）
  4. Supabase 連携
  5. Vercel でデプロイ
  6. （任意）AWS への移植・運用チャレンジ
