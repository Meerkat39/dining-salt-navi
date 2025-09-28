# フィードバック・エラー表示の最適化 TODO

---

## 次回やることメモ（2025/09/28）

- エラー表示の洗い出し
- Storybook で各エラー表示の確認

## src 配下のエラー表示・エラー UI 実装箇所まとめ（2025/09/29 洗い出し）

- 検索結果 0 件
  - SearchResultList.tsx: stores.length === 0 で NoSearchResult を表示
  - NoSearchResult.tsx: 「条件に一致する店舗・メニューは見つかりませんでした」
- 地図ロードエラー
  - MapView.tsx: Google Maps API ロード失敗時 MapLoadError を表示
  - MapViewUtils.tsx: <MapLoadError /> コンポーネント（「地図の読み込みに失敗しました」）
- StoreInfoWindow 系
  - StoreMarkerWithInfoWindow.tsx: メニュー取得失敗時 menuError を赤字で表示
  - StoreInfoWindowDebug.tsx: （デバッグ用、今回の Storybook エラー一覧作成の本筋には含めない）
- 検索フォーム・現在地取得
  - useGeolocationEffect.ts: 取得失敗時 alert("現在地の取得に失敗しました: ...")
  - Geolocation 未対応時 alert("この端末・ブラウザは現在地取得に対応していません。")
  - useSearchWithLoading.ts: エリア座標取得失敗時 window.alert("エリアの座標取得に失敗しました")
  - useAreaGeocodeSearch.ts: エラー時 alert 表示
- バリデーション・入力エラー
  - Storybook 用 UI（PageLikeErrorFeedback.stories.tsx など）は除外（本番 UI のエラー表示一覧 Storybook 作成が目的）
- API 通信エラー
  - Storybook 用 UI（PageLikeErrorFeedback.stories.tsx など）は除外
  - 多重リクエスト警告・予期せぬエラー

  - Storybook 用 UI で例示（実際のロジック実装は未、今回の目的には含めない）

---

※ 今やろうとしていること：
「本番 UI で実際に表示されるエラー一覧を Storybook で確認できるようにする」ための洗い出し・整理

- 入力バリデーションエラー（必須項目未入力、形式不正など）
- API 通信エラー（サーバー通信失敗、ネットワークエラー）
- 検索結果 0 件（条件に一致するデータなし）
- 現在地取得失敗（位置情報取得エラー）
- Google Map ロード失敗（地図表示エラー）
- 多重リクエスト警告（リクエスト過多）
- 予期せぬエラー（アクセシビリティ考慮の汎用エラー）
- StoreInfoWindow のメニュー取得エラー
- StoreInfoWindow のローディング状態
